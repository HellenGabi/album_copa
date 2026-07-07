function openMultiSelectModal() {
    selectedStickers.clear();
    multiSelectTeam.value = '';
    multiSelectGrid.innerHTML = '';
    multiSelectModal.classList.remove('hidden');
    updateTeamOptions();
    updateSelectionCount();
}

function closeMultiSelectModalFunc() {
    multiSelectModal.classList.add('hidden');
    selectedStickers.clear();
}

function updateTeamOptions() {
    multiSelectTeam.innerHTML = '<option value="">Selecione uma seleção...</option>';

    TEAMS.forEach(team => {
        const option = document.createElement('option');
        option.value = team.code;
        option.textContent = team.name;
        multiSelectTeam.appendChild(option);
    });
}

function renderMultiSelectGrid() {
    const teamCode = multiSelectTeam.value;

    if (!teamCode) {
        multiSelectGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #999; padding: 2rem;">Selecione uma seleção acima</p>';
        updateSelectionCount();
        return;
    }

    multiSelectGrid.innerHTML = '';
    const team = TEAMS.find(t => t.code === teamCode);
    if (!team) return;

    const start = getTeamStart(team);

    for (let num = start; num < start + team.stickers; num++) {
        const id = `${teamCode}-${num}`;
        const playerName = getStickerName(teamCode, num);
        const isSelected = selectedStickers.has(id);

        const stickerDiv = document.createElement('div');
        stickerDiv.className = `multi-select-sticker ${isSelected ? 'selected' : ''}`;
        stickerDiv.innerHTML = `
            <div class="multi-select-sticker-card">
                <div class="multi-select-sticker-team">${teamCode}</div>
                <div class="multi-select-sticker-number">#${num}</div>
                <div class="multi-select-sticker-name">${playerName}</div>
            </div>
            <div class="multi-select-sticker-checkbox">✓</div>
        `;

        stickerDiv.onclick = function () {
            toggleStickerSelection(id);
        };

        multiSelectGrid.appendChild(stickerDiv);
    }

    updateSelectionCount();
}

function toggleStickerSelection(id) {
    if (selectedStickers.has(id)) {
        selectedStickers.delete(id);
    } else {
        selectedStickers.add(id);
    }

    renderMultiSelectGrid();
}

function selectAllStickers() {
    const teamCode = multiSelectTeam.value;
    if (!teamCode) return;

    const team = TEAMS.find(t => t.code === teamCode);
    if (!team) return;

    const start = getTeamStart(team);

    for (let num = start; num < start + team.stickers; num++) {
        selectedStickers.add(`${teamCode}-${num}`);
    }

    renderMultiSelectGrid();
}

function deselectAllStickers() {
    selectedStickers.clear();
    renderMultiSelectGrid();
}

function updateSelectionCount() {
    const count = selectedStickers.size;
    multiSelectCount.textContent = `${count} figurinha${count !== 1 ? 's' : ''} selecionada${count !== 1 ? 's' : ''}`;
}

function applyHaveToSelected() {
    selectedStickers.forEach(id => {
        stickers[id].have = true;
        stickers[id].repeated = 0;
    });

    saveData();
    updateStats();
    renderGrid();
    selectedStickers.clear();
    renderMultiSelectGrid();
}

function applyRepeatedToSelected() {
    selectedStickers.forEach(id => {
        stickers[id].have = true;
        stickers[id].repeated++;

        if (stickers[id].repeated > 10) {
            stickers[id].repeated = 0;
        }
    });

    saveData();
    updateStats();
    renderGrid();
    selectedStickers.clear();
    renderMultiSelectGrid();
}