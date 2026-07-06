export function downloadFile(blob, filename) {
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = filename;

    document.body.appendChild(a);

    a.click();

    document.body.removeChild(a);

    URL.revokeObjectURL(url);
}

export function formatDate() {
    return new Date().toLocaleDateString("pt-BR");
}

export function formatDateTime() {
    return new Date().toLocaleString("pt-BR");
}

export function getPercentage(current, total) {
    if (!total) return 0;

    return Math.round((current / total) * 100);
}

export function sortStickerIds(ids) {
    return ids.sort((a, b) => {
        const [teamA, numA] = a.split("-");
        const [teamB, numB] = b.split("-");

        if (teamA !== teamB) {
            return teamA.localeCompare(teamB);
        }

        return Number(numA) - Number(numB);
    });
}