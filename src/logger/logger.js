const fs = require('fs');
const path = require('path');

function criarArquivo(texto, userId, maxSizeBytes = 100 * 1024 * 1024, folderPath = 'src/logs') {
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'America/Sao_Paulo'
    };

    const timestamp = new Date().toLocaleString('en-US', options).replace(/,/g, '');
    const conteudo = `[${timestamp}] ${texto} UserID: ${userId}\n`;

    let nomeArquivo = path.join(folderPath, 'logs.log');

    let currentSize = 0;
    try {
        const stats = fs.statSync(nomeArquivo);
        currentSize = stats.size;
    } catch (error) {
    }

    if (currentSize + conteudo.length > maxSizeBytes) {
        const archiveFileName = `logs_${timestamp}.log`;
        nomeArquivo = archiveFileName;
    }

    fs.appendFile(nomeArquivo, conteudo, (err) => {
        if (err) {
            console.error('Error appending to the file:', err);
            return;
        }
    });
}

module.exports = criarArquivo;
