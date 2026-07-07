function setupEventListeners() {
    closeReportModal.onclick = closeReportModalFunc;
    genPdfBtn.onclick = generatePDFReport;
    genTxtBtn.onclick = generateTXTReport;

    document.querySelectorAll('.report-tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.report-tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentReportType = btn.dataset.reportType;
        });
    });

    multiSelectBtn.onclick = openMultiSelectModal;
    closeMultiSelect.onclick = closeMultiSelectModalFunc;
    closeMultiSelectBtn.onclick = closeMultiSelectModalFunc;
    selectAllBtn.onclick = selectAllStickers;
    deselectAllBtn.onclick = deselectAllStickers;
    markAsHaveBtn.onclick = applyHaveToSelected;
    markAsRepeatedBtn.onclick = applyRepeatedToSelected;
    multiSelectTeam.addEventListener('change', renderMultiSelectGrid);

    window.onclick = function (event) {
        if (event.target === reportModal) closeReportModalFunc();
        if (event.target === authModal) authModal.classList.add('hidden');
        if (event.target === multiSelectModal) closeMultiSelectModalFunc();
    };

    filterBtns.forEach(btn => {
        if (!btn.dataset.filter) return;

        btn.addEventListener('click', () => {
            filterBtns.forEach(b => {
                if (b.dataset.filter) {
                    b.classList.remove('active');
                }
            });

            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            renderGrid();
        });
    });

    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.trim();
        renderGrid();
    });
}

init();