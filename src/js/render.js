function renderGrid() {
    grid.innerHTML = '';

    Object.keys(stickers)
        .sort((a, b) => {
            const [teamA, numA] = a.split('-');
            const [teamB, numB] = b.split('-');

            if (teamA !== teamB) return teamA.localeCompare(teamB);
            return parseInt(numA) - parseInt(numB);
        })
        .forEach(id => {
            const s = stickers[id];

            if (currentTeam !== 'all' && s.team !== currentTeam) return;
            if (currentFilter === 'missing' && s.have) return;
            if (currentFilter === 'have' && !s.have) return;
            if (currentFilter === 'repeated' && s.repeated === 0) return;

            const playerName = getStickerName(s.team, s.num);
            const teamName = TEAMS.find(t => t.code === s.team)?.name || '';
            const searchTerms = searchQuery.toLowerCase();

            if (
                searchQuery &&
                !playerName.toLowerCase().includes(searchTerms) &&
                !s.num.toString().includes(searchTerms) &&
                !teamName.toLowerCase().includes(searchTerms) &&
                !s.team.toLowerCase().includes(searchTerms)
            ) return;

            const isSpecial = (s.team !== 'CC' && s.team !== 'FWC' && (s.num === 1 || s.num === 13));

            const card = document.createElement('div');
            card.className = `sticker-card ${s.have ? 'have' : ''} ${s.repeated > 0 ? 'repeated' : ''} ${isSpecial ? 'special' : ''}`;
            card.innerHTML = `
                <div class="status-repeated">+${s.repeated}</div>
                <div class="sticker-info">
                    <span class="sticker-team-badge">${s.team}</span>
                    <div class="sticker-name">${playerName}</div>
                    <div class="sticker-number">#${s.num}</div>
                </div>
                <div class="sticker-actions">
                    <button class="btn-action btn-have ${s.have ? 'active' : ''}" onclick="toggleHave('${id}')">
                        ${s.have ? 'Tenho' : 'Marcar'}
                    </button>
                    <button class="btn-action btn-repeated ${s.repeated > 0 ? 'active' : ''}" onclick="addRepeated('${id}')">
                        Repetida
                    </button>
                </div>
            `;

            grid.appendChild(card);
        });
}

function updateStats() {
    const totalPossible = Object.keys(stickers).length;
    const owned = Object.values(stickers).filter(s => s.have).length;
    const repeated = Object.values(stickers).reduce((acc, s) => acc + s.repeated, 0);
    const percent = Math.round((owned / totalPossible) * 100) || 0;

    progressBar.style.width = `${percent}%`;
    progressPercent.innerText = `${percent}%`;
    statsTotal.innerText = `Tenho: ${owned} / ${totalPossible}`;
    statsRepeated.innerText = `Repetidas: ${repeated}`;
}

window.toggleHave = (id) => {
    stickers[id].have = !stickers[id].have;

    if (!stickers[id].have) {
        stickers[id].repeated = 0;
    }

    saveData();
    updateStats();
    renderGrid();
};

window.addRepeated = (id) => {
    if (!stickers[id].have) {
        stickers[id].have = true;
    }

    stickers[id].repeated++;

    if (stickers[id].repeated > 10) {
        stickers[id].repeated = 0;
    }

    saveData();
    updateStats();
    renderGrid();
};

function renderTeamFilter() {
    const controls = document.querySelector('.controls');
    let teamSelector = document.querySelector('.team-selector');

    if (!teamSelector) {
        teamSelector = document.createElement('div');
        teamSelector.className = 'team-selector';
        controls.prepend(teamSelector);
    }

    teamSelector.innerHTML = `
        <select id="team-filter" class="btn-filter">
            <option value="all">Todas as Seleções</option>
            ${TEAMS.map(t => `<option value="${t.code}">${t.name}</option>`).join('')}
        </select>
    `;

    document.getElementById('team-filter').addEventListener('change', (e) => {
        currentTeam = e.target.value;
        renderGrid();
    });

    document.getElementById('generate-report-btn').addEventListener('click', openReportModal);
}