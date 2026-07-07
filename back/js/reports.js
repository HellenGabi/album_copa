function openReportModal() {
    reportModal.classList.remove('hidden');
}

function closeReportModalFunc() {
    reportModal.classList.add('hidden');
}

async function generatePDFReport() {
    closeReportModalFunc();

    if (currentReportType === 'complete') {
        await generateCompletePDFReport();
    } else {
        await generateMissingPDFReport();
    }
}

async function generateCompletePDFReport() {
    const owned = Object.values(stickers).filter(s => s.have).length;
    const total = Object.keys(stickers).length;
    const repeated = Object.values(stickers).reduce((acc, s) => acc + s.repeated, 0);
    const percent = Math.round((owned / total) * 100) || 0;

    let html = `
        <div class="pdf-container">
            <div class="pdf-header">
                <div class="pdf-title">
                    <h1>Álbum Copa 2026</h1>
                    <p>Relatório de Coleção</p>
                </div>
                <div class="pdf-date">${new Date().toLocaleDateString()}</div>
            </div>

            <div class="pdf-stats">
                <div class="pdf-stat-card">
                    <span class="label">Progresso</span>
                    <span class="value">${percent}%</span>
                </div>
                <div class="pdf-stat-card">
                    <span class="label">Figurinhas</span>
                    <span class="value">${owned} / ${total}</span>
                </div>
                <div class="pdf-stat-card">
                    <span class="label">Repetidas</span>
                    <span class="value">${repeated}</span>
                </div>
            </div>
    `;

    TEAMS.forEach(team => {
        const teamStickers = Object.keys(stickers)
            .filter(id => id.startsWith(team.code))
            .map(id => ({ id, ...stickers[id] }));

        const myStickers = teamStickers.filter(s => s.have || s.repeated > 0);

        if (myStickers.length > 0) {
            html += `
                <div class="pdf-team-section">
                    <div class="pdf-team-header">
                        <span>${team.name}</span>
                        <span>${myStickers.filter(s => s.have).length} / ${team.stickers}</span>
                    </div>
                    <div class="pdf-sticker-list">
            `;

            myStickers.forEach(s => {
                let name = PLAYER_NAMES[s.team]?.[s.num - 1] || `Jogador ${s.num}`;

                if (s.num === 1 && s.team !== 'CC' && s.team !== 'FWC') {
                    name = 'Escudo';
                }

                if (s.num === 13 && s.team !== 'CC' && s.team !== 'FWC') {
                    name = 'Time Completo';
                }

                let statusText = s.have ? 'OK' : 'SÓ REP.';

                if (s.repeated > 0) {
                    statusText += ` (+${s.repeated})`;
                }

                html += `
                    <div class="pdf-sticker-item ${s.have ? 'have' : ''} ${s.repeated > 0 ? 'repeated' : ''}">
                        <span><span class="num">#${s.num}</span> ${name}</span>
                        <span>${statusText}</span>
                    </div>
                `;
            });

            html += `
                    </div>
                </div>
            `;
        }
    });

    html += `
            <div class="pdf-footer">
                Gerado por Álbum Copa 2026 - Desenvolvido por Kevin
            </div>
        </div>
    `;

    reportTemplate.innerHTML = html;
    reportTemplate.style.display = 'block';

    const opt = {
        margin: 10,
        filename: `relatorio_copa2026_completo_${new Date().getTime()}.pdf`,
        image: {
            type: 'jpeg',
            quality: 0.98
        },
        html2canvas: {
            scale: 2,
            useCORS: true
        },
        jsPDF: {
            unit: 'mm',
            format: 'a4',
            orientation: 'portrait'
        }
    };

    try {
        await html2pdf()
            .set(opt)
            .from(reportTemplate)
            .save();
    } catch (err) {
        console.error("Erro ao gerar PDF:", err);
        alert("Ocorreu um erro ao gerar o PDF. Verifique o console.");
    } finally {
        reportTemplate.style.display = 'none';
        reportTemplate.innerHTML = '';
    }
}
async function generateMissingPDFReport() {
    const missing = Object.values(stickers).filter(s => !s.have).length;
    const total = Object.keys(stickers).length;
    const owned = total - missing;
    const percent = Math.round((owned / total) * 100) || 0;

    let html = `
        <div class="pdf-container">
            <div class="pdf-header">
                <div class="pdf-title">
                    <h1>Álbum Copa 2026</h1>
                    <p>Figurinhas Faltantes</p>
                </div>
                <div class="pdf-date">${new Date().toLocaleDateString()}</div>
            </div>

            <div class="pdf-stats">
                <div class="pdf-stat-card">
                    <span class="label">Progresso</span>
                    <span class="value">${percent}%</span>
                </div>
                <div class="pdf-stat-card">
                    <span class="label">Faltando</span>
                    <span class="value">${missing}</span>
                </div>
                <div class="pdf-stat-card">
                    <span class="label">Tenho</span>
                    <span class="value">${owned}</span>
                </div>
            </div>
    `;

    TEAMS.forEach(team => {
        const teamStickers = Object.keys(stickers)
            .filter(id => id.startsWith(team.code))
            .map(id => ({ id, ...stickers[id] }));

        const missingStickers = teamStickers.filter(s => !s.have);

        if (missingStickers.length > 0) {
            html += `
                <div class="pdf-team-section">
                    <div class="pdf-team-header">
                        <span>${team.name}</span>
                        <span>Faltando ${missingStickers.length} / ${team.stickers}</span>
                    </div>
                    <div class="pdf-sticker-list">
            `;

            missingStickers.forEach(s => {
                let name = PLAYER_NAMES[s.team]?.[s.num - 1] || `Jogador ${s.num}`;

                if (s.num === 1 && s.team !== 'CC' && s.team !== 'FWC')
                    name = 'Escudo';

                if (s.num === 13 && s.team !== 'CC' && s.team !== 'FWC')
                    name = 'Time Completo';

                html += `
                    <div class="pdf-sticker-item">
                        <span><span class="num">#${s.num}</span> ${name}</span>
                        <span>❌</span>
                    </div>
                `;
            });

            html += `
                    </div>
                </div>
            `;
        }
    });

    html += `
            <div class="pdf-footer">
                Gerado por Álbum Copa 2026 - Desenvolvido por Kevin
            </div>
        </div>
    `;

    reportTemplate.innerHTML = html;
    reportTemplate.style.display = 'block';

    const opt = {
        margin: 10,
        filename: `relatorio_copa2026_faltantes_${new Date().getTime()}.pdf`,
        image: {
            type: 'jpeg',
            quality: 0.98
        },
        html2canvas: {
            scale: 2,
            useCORS: true
        },
        jsPDF: {
            unit: 'mm',
            format: 'a4',
            orientation: 'portrait'
        }
    };

    try {
        await html2pdf()
            .set(opt)
            .from(reportTemplate)
            .save();
    } catch (err) {
        console.error("Erro ao gerar PDF:", err);
        alert("Ocorreu um erro ao gerar o PDF. Verifique o console.");
    } finally {
        reportTemplate.style.display = 'none';
        reportTemplate.innerHTML = '';
    }
}