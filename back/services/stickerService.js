import { TEAMS } from "../data/teams.js";

export function generateInitialData() {
    const stickers = {};

    TEAMS.forEach(team => {
        const start = team.start ?? 1;

        for (let i = start; i < start + team.stickers; i++) {
            stickers[`${team.code}-${i}`] = {
                have: false,
                repeated: 0,
                team: team.code,
                num: i,
                image: ""
            };
        }
    });

    return stickers;
}

export function mergeStickers(saved = {}) {
    const stickers = {};

    TEAMS.forEach(team => {
        const start = team.start ?? 1;

        for (let i = start; i < start + team.stickers; i++) {
            const id = `${team.code}-${i}`;

            stickers[id] = saved[id] || {
                have: false,
                repeated: 0,
                team: team.code,
                num: i,
                image: ""
            };
        }
    });

    return stickers;
}

export function toggleHave(stickers, id) {
    stickers[id].have = !stickers[id].have;

    if (!stickers[id].have) {
        stickers[id].repeated = 0;
    }

    return stickers;
}

export function addRepeated(stickers, id) {
    if (!stickers[id].have) {
        stickers[id].have = true;
    }

    stickers[id].repeated++;

    if (stickers[id].repeated > 10) {
        stickers[id].repeated = 0;
    }

    return stickers;
}

export function getStats(stickers) {
    const total = Object.keys(stickers).length;

    const owned = Object.values(stickers).filter(s => s.have).length;

    const repeated = Object.values(stickers).reduce(
        (total, sticker) => total + sticker.repeated,
        0
    );

    const percent = Math.round((owned / total) * 100) || 0;

    return {
        total,
        owned,
        repeated,
        percent
    };
}

export function saveLocal(stickers) {
    localStorage.setItem(
        "album-copa-v12",
        JSON.stringify(stickers)
    );
}

export function loadLocal() {
    const data = localStorage.getItem("album-copa-v12");

    if (!data) {
        return generateInitialData();
    }

    return mergeStickers(JSON.parse(data));
}

export function getStickerName(playerNames, team, number) {
    let name = playerNames[team]?.[number - 1] || `${team} - Jogador ${number}`;

    if (number === 1 && team !== "CC" && team !== "FWC") {
        name = "Escudo";
    }

    if (number === 13 && team !== "CC" && team !== "FWC") {
        name = "Time Completo";
    }

    if (team === "CC") {
        name = `Coca-Cola #${number}`;
    }

    if (team === "FWC") {
        name = `FIFA FWC #${number}`;
    }

    return name;
}

export function getTeamName(code) {
    return TEAMS.find(team => team.code === code)?.name || "";
}