const fs = require('fs');

function criarArquivo(texto, userId, maxSizeBytes = 1024 * 1024) {
    const timestamp = new Date().toLocaleString();
    const conteudo = `Texto: ${texto}\nData: ${timestamp}\nUserID: ${userId}\n`;

    let nomeArquivo = 'logs.txt';

    let currentSize = 0;
    try {
        const stats = fs.statSync(nomeArquivo);
        currentSize = stats.size;
    } catch (error) {
    }

    if (currentSize + conteudo.length > maxSizeBytes) {
        const archiveFileName = `logs_${timestamp}.txt`;
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
