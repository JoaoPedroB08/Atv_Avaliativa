const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { validarTarefa } = require('./utils');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

let tarefas = [];
let idCounter = 1;

app.get('/api/tarefas', (req, res) => {
    res.json(tarefas);
});

app.post('/api/tarefas', (req, res) => {
    const { titulo } = req.body;
    if (!validarTarefa(titulo)) {
        return res.status(400).json({ error: 'Titulo inválido' });
    }
    const novaTarefa = { id: idCounter++, titulo };
    tarefas.push(novaTarefa);
    res.status(201).json(novaTarefa);
});

app.put('/api/tarefas/:id', (req, res) => {
    const { id } = req.params;
    const { titulo } = req.body;
    const tarefa = tarefas.find(t => t.id == id);
    if (!tarefa) return res.status(404).json({ error: 'Não encontrado' });
    if (!validarTarefa(titulo)) return res.status(400).json({ error: 'Titulo inválido' });
    
    tarefa.titulo = titulo;
    res.json(tarefa);
});

app.delete('/api/tarefas/:id', (req, res) => {
    const { id } = req.params;
    const index = tarefas.findIndex(t => t.id == id);
    if (index === -1) return res.status(404).json({ error: 'Não encontrado' });
    
    tarefas.splice(index, 1);
    res.status(204).send();
});

if (require.main === module) {
    app.listen(port, () => console.log(`Rodando na porta ${port}`));
}

module.exports = app;