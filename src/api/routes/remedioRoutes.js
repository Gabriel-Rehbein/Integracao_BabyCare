const express = require('express');
const router = express.Router();
const remedioController = require('../controllers/remedioController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

// POST /api/remedios - Criar um novo remédio
router.post('/', remedioController.createRemedio);

// GET /api/remedios/crianca/:crianca_id - Obter todos os remédios de uma criança
router.get('/crianca/:crianca_id', remedioController.getRemediosByCrianca);

// GET /api/remedios/:id - Obter um remédio específico
router.get('/:id', remedioController.getRemedioById);

// PUT /api/remedios/:id - Atualizar um remédio
router.put('/:id', remedioController.updateRemedio);

// DELETE /api/remedios/:id - Deletar um remédio
router.delete('/:id', remedioController.deleteRemedio);

module.exports = router;
