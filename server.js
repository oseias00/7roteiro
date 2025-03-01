const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.json());

const DB_FILE = 'db.json';

const readData = () => {
    if (!fs.existsSync(DB_FILE)) return { partidas: [] };
    return JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
};

const saveData = (data) => {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
};

app.post('/partidas', (req, res) => {
    const { titulo, local, data, horario } = req.body;
    const db = readData();
    const novaPartida = { id: Date.now(), titulo, local, data, horario, jogadores: [] };
    db.partidas.push(novaPartida);
    saveData(db);
    res.status(201).json(novaPartida);
});

app.get('/partidas', (req, res) => {
    const db = readData();
    res.json(db.partidas);
});

app.delete('/partidas/:id', (req, res) => {
    const db = readData();
    db.partidas = db.partidas.filter(p => p.id != req.params.id);
    saveData(db);
    res.json({ message: "Partida excluída" });
});

app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
