const express = require('express');
const app = express();

// Permite ler dados em JSON (as pontuações enviadas pelo jogo)
app.use(express.json());
// Transforma a pasta 'public' na página principal do site
app.use(express.static('public'));

let ranking = []; // Lista que guarda os recordes

// Rota para receber a pontuação de quem morre
app.post('/salvar-pontuacao', (req, res) => {
    const { nome, tempo } = req.body;
    
    if (nome && tempo > 0) {
        ranking.push({ nome, tempo: Math.floor(tempo) });
        // Organiza do maior tempo para o menor
        ranking.sort((a, b) => b.tempo - a.tempo);
    }
    
    // Devolve apenas os 5 melhores
    res.json(ranking.slice(0, 5));
});

// Rota para carregar o ranking ao abrir a página
app.get('/ranking', (req, res) => {
    res.json(ranking.slice(0, 5));
});

app.listen(3000, () => {
    console.log('Servidor da Bruxinha rodando em http://localhost:3000');
});