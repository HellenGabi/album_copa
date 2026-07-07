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
                let name = getStickerName(s.team, s.num);
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
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    try {
        await html2pdf().set(opt).from(reportTemplate).save();
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
                let name = getStickerName(s.team, s.num);

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
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    try {
        await html2pdf().set(opt).from(reportTemplate).save();
    } catch (err) {
        console.error("Erro ao gerar PDF:", err);
        alert("Ocorreu um erro ao gerar o PDF. Verifique o console.");
    } finally {
        reportTemplate.style.display = 'none';
        reportTemplate.innerHTML = '';
    }
}

function generateTXTReport() {
    closeReportModalFunc();

    if (currentReportType === 'complete') {
        generateCompleteTXTReport();
    } else {
        generateMissingTXTReport();
    }
}

function generateCompleteTXTReport() {
    let report = "==========================================\n";
    report += "        ÁLBUM COPA DO MUNDO 2026        \n";
    report += "==========================================\n\n";
    report += `Data: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}\n`;

    const owned = Object.values(stickers).filter(s => s.have).length;
    const total = Object.keys(stickers).length;
    const repeated = Object.values(stickers).reduce((acc, s) => acc + s.repeated, 0);
    const percent = Math.round((owned / total) * 100);

    report += `Progresso: ${owned} / ${total} [${percent}%]\n`;
    report += `Total de Repetidas: ${repeated}\n\n`;
    report += "------------------------------------------\n";
    report += "        MINHAS FIGURINHAS POR PAÍS        \n";
    report += "------------------------------------------\n";

    TEAMS.forEach(team => {
        const teamStickers = Object.keys(stickers)
            .filter(id => id.startsWith(team.code))
            .map(id => ({ id, ...stickers[id] }));

        const myStickers = teamStickers.filter(s => s.have || s.repeated > 0);

        if (myStickers.length > 0) {
            const teamOwned = myStickers.filter(s => s.have).length;
            report += `\n> ${team.name.toUpperCase()} (${teamOwned}/${team.stickers})\n`;

            myStickers.forEach(s => {
                let name = getStickerName(s.team, s.num);
                let line = ` [#${s.num.toString().padStart(2, '0')}] ${name.padEnd(20)}`;

                line += s.have ? " [X]" : " [ ]";

                if (s.repeated > 0) {
                    line += ` (+${s.repeated} rep)`;
                }

                report += line + "\n";
            });
        }
    });

    report += "\n\n==========================================\n";
    report += "   Gerado automaticamente pelo Álbum      \n";
    report += "==========================================\n";

    downloadTXTReport(report, 'completo');
}

function generateMissingTXTReport() {
    let report = "==========================================\n";
    report += "  FIGURINHAS FALTANTES - COPA 2026       \n";
    report += "==========================================\n\n";
    report += `Data: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}\n`;

    const owned = Object.values(stickers).filter(s => s.have).length;
    const total = Object.keys(stickers).length;
    const missing = total - owned;
    const percent = Math.round((owned / total) * 100);

    report += `Progresso: ${owned} / ${total} [${percent}%]\n`;
    report += `Faltando: ${missing} figurinhas\n\n`;
    report += "------------------------------------------\n";
    report += "      FIGURINHAS QUE ESTÃO FALTANDO      \n";
    report += "------------------------------------------\n";

    TEAMS.forEach(team => {
        const teamStickers = Object.keys(stickers)
            .filter(id => id.startsWith(team.code))
            .map(id => ({ id, ...stickers[id] }));

        const missingStickers = teamStickers.filter(s => !s.have);

        if (missingStickers.length > 0) {
            report += `\n> ${team.name.toUpperCase()} (Faltando ${missingStickers.length}/${team.stickers})\n`;

            missingStickers.forEach(s => {
                let name = getStickerName(s.team, s.num);
                let line = ` [#${s.num.toString().padStart(2, '0')}] ${name.padEnd(20)}`;
                line += " ❌";
                report += line + "\n";
            });
        }
    });

    report += "\n\n==========================================\n";
    report += "   Gerado automaticamente pelo Álbum      \n";
    report += "==========================================\n";

    downloadTXTReport(report, 'faltantes');
}

function downloadTXTReport(report, type) {
    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `relatorio_copa2026_${type}_${new Date().getTime()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}