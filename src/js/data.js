var TEAMS = [
    { name: 'África do Sul', code: 'RSA', stickers: 20 },
    { name: 'Alemanha', code: 'GER', stickers: 20 },
    { name: 'Argélia', code: 'ALG', stickers: 20 },
    { name: 'Argentina', code: 'ARG', stickers: 20 },
    { name: 'Austrália', code: 'AUS', stickers: 20 },
    { name: 'Áustria', code: 'AUT', stickers: 20 },
    { name: 'Bélgica', code: 'BEL', stickers: 20 },
    { name: 'Bósnia e Herz.', code: 'BIH', stickers: 20 },
    { name: 'Brasil', code: 'BRA', stickers: 20 },
    { name: 'Cabo Verde', code: 'CPV', stickers: 20 },
    { name: 'Canadá (Sede)', code: 'CAN', stickers: 20 },
    { name: 'Catar', code: 'QAT', stickers: 20 },
    { name: 'Colômbia', code: 'COL', stickers: 20 },
    { name: 'Coreia do Sul', code: 'KOR', stickers: 20 },
    { name: 'Costa do Marfim', code: 'CIV', stickers: 20 },
    { name: 'Croácia', code: 'CRO', stickers: 20 },
    { name: 'Curaçau', code: 'CUW', stickers: 20 },
    { name: 'Egito', code: 'EGY', stickers: 20 },
    { name: 'Equador', code: 'ECU', stickers: 20 },
    { name: 'Escócia', code: 'SCO', stickers: 20 },
    { name: 'Espanha', code: 'ESP', stickers: 20 },
    { name: 'EUA (Sede)', code: 'USA', stickers: 20 },
    { name: 'França', code: 'FRA', stickers: 20 },
    { name: 'Gana', code: 'GHA', stickers: 20 },
    { name: 'Haiti', code: 'HAI', stickers: 20 },
    { name: 'Holanda', code: 'NED', stickers: 20 },
    { name: 'Inglaterra', code: 'ENG', stickers: 20 },
    { name: 'Irã', code: 'IRN', stickers: 20 },
    { name: 'Iraque', code: 'IRQ', stickers: 20 },
    { name: 'Japão', code: 'JPN', stickers: 20 },
    { name: 'Jordânia', code: 'JOR', stickers: 20 },
    { name: 'Marrocos', code: 'MAR', stickers: 20 },
    { name: 'México (Sede)', code: 'MEX', stickers: 20 },
    { name: 'Noruega', code: 'NOR', stickers: 20 },
    { name: 'Nova Zelândia', code: 'NZL', stickers: 20 },
    { name: 'Panamá', code: 'PAN', stickers: 20 },
    { name: 'Paraguai', code: 'PAR', stickers: 20 },
    { name: 'Portugal', code: 'POR', stickers: 20 },
    { name: 'RD Congo', code: 'COD', stickers: 20 },
    { name: 'Rep. Tcheca', code: 'CZE', stickers: 20 },
    { name: 'Arábia Saudita', code: 'KSA', stickers: 20 },
    { name: 'Senegal', code: 'SEN', stickers: 20 },
    { name: 'Suécia', code: 'SWE', stickers: 20 },
    { name: 'Suíça', code: 'SUI', stickers: 20 },
    { name: 'Tunísia', code: 'TUN', stickers: 20 },
    { name: 'Turquia', code: 'TUR', stickers: 20 },
    { name: 'Uruguai', code: 'URU', stickers: 20 },
    { name: 'Uzbequistão', code: 'UZB', stickers: 20 },
    { name: 'Coca-Cola', code: 'CC', stickers: 14 },
    { name: 'FIFA (FWC)', code: 'FWC', stickers: 20, start: 0 }
].sort((a, b) => a.name.localeCompare(b.name));

var TEAM_NAME_TO_CODE = {
    'cape verde islands': 'CPV',
    'turkiye': 'TUR',
    'south africa': 'RSA',
    'germany': 'GER',
    'algeria': 'ALG',
    'argentina': 'ARG',
    'australia': 'AUS',
    'austria': 'AUT',
    'belgium': 'BEL',
    'bosnia and herzegovina': 'BIH',
    'bosnia herzegovina': 'BIH',
    'bosnia & herzegovina': 'BIH',
    'brazil': 'BRA',
    'cape verde': 'CPV',
    'cabo verde': 'CPV',
    'canada': 'CAN',
    'qatar': 'QAT',
    'colombia': 'COL',
    'south korea': 'KOR',
    'korea republic': 'KOR',
    'republic of korea': 'KOR',
    'ivory coast': 'CIV',
    'cote d ivoire': 'CIV',
    "cote d'ivoire": 'CIV',
    'croatia': 'CRO',
    'curacao': 'CUW',
    'egypt': 'EGY',
    'ecuador': 'ECU',
    'scotland': 'SCO',
    'spain': 'ESP',
    'usa': 'USA',
    'united states': 'USA',
    'united states of america': 'USA',
    'france': 'FRA',
    'ghana': 'GHA',
    'haiti': 'HAI',
    'netherlands': 'NED',
    'holland': 'NED',
    'england': 'ENG',
    'iran': 'IRN',
    'iraq': 'IRQ',
    'japan': 'JPN',
    'jordan': 'JOR',
    'morocco': 'MAR',
    'mexico': 'MEX',
    'norway': 'NOR',
    'new zealand': 'NZL',
    'panama': 'PAN',
    'paraguay': 'PAR',
    'portugal': 'POR',
    'dr congo': 'COD',
    'congo dr': 'COD',
    'democratic republic of congo': 'COD',
    'czech republic': 'CZE',
    'saudi arabia': 'KSA',
    'senegal': 'SEN',
    'sweden': 'SWE',
    'switzerland': 'SUI',
    'tunisia': 'TUN',
    'turkey': 'TUR',
    'uruguay': 'URU',
    'uzbekistan': 'UZB'
};

function normalizeText(text = '') {
    return text
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, ' ')
        .trim();
}

function getTeamCodeFromApiName(name) {
    const normalized = normalizeText(name);
    return TEAM_NAME_TO_CODE[normalized] || null;
}

function getTeamStart(team) {
    return team.start !== undefined ? team.start : 1;
}

function buildAlbumPlayers(players = []) {
    const validPlayers = [...players]
        .filter(player => player && player.number !== null && player.number !== undefined)
        .sort((a, b) => a.number - b.number)
        .slice(0, 18);

    const album = {};
    let playerIndex = 0;

    for (let stickerNumber = 1; stickerNumber <= 20; stickerNumber++) {
        if (stickerNumber === 1) {
            album[stickerNumber] = {
                stickerNumber,
                name: 'Escudo da Seleção',
                type: 'special',
                jersey: null,
                position: 'Special',
                photo: ''
            };
            continue;
        }

        if (stickerNumber === 13) {
            album[stickerNumber] = {
                stickerNumber,
                name: 'Time Completo',
                type: 'special',
                jersey: null,
                position: 'Special',
                photo: ''
            };
            continue;
        }

        const player = validPlayers[playerIndex];

        if (player) {
            album[stickerNumber] = {
                stickerNumber,
                name: player.name,
                type: 'player',
                jersey: player.number,
                position: player.position,
                photo: player.photo || ''
            };
            playerIndex++;
        } else {
            album[stickerNumber] = {
                stickerNumber,
                name: `Jogador ${stickerNumber}`,
                type: 'player',
                jersey: null,
                position: '',
                photo: ''
            };
        }
    }

    return album;
}

function buildAllAlbumPlayers() {
    const squads = window.SQUADS || [];
    const result = {};

    squads.forEach(squad => {
        const apiTeamName = squad?.team?.name;
        const players = squad?.players || [];
        const teamCode = getTeamCodeFromApiName(apiTeamName);

        if (!teamCode) {
            console.warn('Time da API sem mapeamento:', apiTeamName);
            return;
        }

        result[teamCode] = buildAlbumPlayers(players);
    });

    return result;
}

var ALBUM_PLAYERS = buildAllAlbumPlayers();

function getStickerInfo(teamCode, stickerNumber) {
    if (teamCode === 'CC') {
        return {
            name: `Coca-Cola #${stickerNumber}`,
            photo: '',
            position: 'Special'
        };
    }

    if (teamCode === 'FWC') {
        return {
            name: `FIFA FWC #${stickerNumber}`,
            photo: '',
            position: 'Special'
        };
    }

    const teamAlbum = ALBUM_PLAYERS[teamCode];

    if (teamAlbum && teamAlbum[stickerNumber]) {
        return teamAlbum[stickerNumber];
    }

    if (stickerNumber === 1) {
        return {
            name: 'Escudo da Seleção',
            photo: '',
            position: 'Special'
        };
    }

    if (stickerNumber === 13) {
        return {
            name: 'Time Completo',
            photo: '',
            position: 'Special'
        };
    }

    return {
        name: `${teamCode} - Jogador ${stickerNumber}`,
        photo: '',
        position: ''
    };
}

function getStickerName(teamCode, stickerNumber) {
    return getStickerInfo(teamCode, stickerNumber).name;
}