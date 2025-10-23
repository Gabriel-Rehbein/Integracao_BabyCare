const express = require('express');
const router = express.Router();
const eventoCalendarioController = require('../controllers/eventoCalendarioController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

// POST /api/eventos - Criar um novo evento
router.post('/', eventoCalendarioController.createEvento);

// GET /api/eventos/crianca/:crianca_id - Obter todos os eventos de uma criança
router.get('/crianca/:crianca_id', eventoCalendarioController.getEventosByCrianca);

// GET /api/eventos/:id - Obter um evento específico
router.get('/:id', eventoCalendarioController.getEventoById);

// PUT /api/eventos/:id - Atualizar um evento
router.put('/:id', eventoCalendarioController.updateEvento);

// DELETE /api/eventos/:id - Deletar um evento
router.delete('/:id', eventoCalendarioController.deleteEvento);

module.exports = router;
