function loadDataFromCloud() {
    if (!db) return;

    db.collection('users')
        .doc(currentUser.uid)
        .get()
        .then(doc => {
            if (doc.exists) {
                stickers = mergeStickers(doc.data().stickers);
            } else {
                generateInitialData();
                saveToCloud();
            }

            renderGrid();
            updateStats();
        });
}

function loadDataLocal() {
    const saved = localStorage.getItem('album-copa-v12');

    if (saved) {
        stickers = mergeStickers(JSON.parse(saved));
    } else {
        generateInitialData();
    }

    renderGrid();
    updateStats();
}

function generateInitialData() {
    stickers = {};

    TEAMS.forEach(team => {
        const start = team.start !== undefined ? team.start : 1;

        for (let i = start; i < start + team.stickers; i++) {
            const id = `${team.code}-${i}`;

            stickers[id] = {
                have: false,
                repeated: 0,
                team: team.code,
                num: i,
                image: ''
            };
        }
    });
}

function mergeStickers(savedStickers) {
    const newStickers = {};

    TEAMS.forEach(team => {
        const start = team.start !== undefined ? team.start : 1;

        for (let i = start; i < start + team.stickers; i++) {
            const id = `${team.code}-${i}`;

            if (savedStickers[id]) {
                newStickers[id] = savedStickers[id];
            } else {
                newStickers[id] = {
                    have: false,
                    repeated: 0,
                    team: team.code,
                    num: i,
                    image: ''
                };
            }
        }
    });

    return newStickers;
}

function saveData() {
    if (currentUser && db) {
        saveToCloud();
    } else {
        localStorage.setItem('album-copa-v12', JSON.stringify(stickers));
    }
}

async function saveToCloud() {
    if (!currentUser || !db) return;

    try {
        await db
            .collection('users')
            .doc(currentUser.uid)
            .set({ stickers });
    } catch (e) {
        console.error("Erro ao salvar na nuvem:", e);
    }
}