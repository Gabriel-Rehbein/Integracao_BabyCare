const express = require('express');
const router = express.Router();
const sonoController = require('../controllers/sonoController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

// POST /api/sono - Criar um novo registro de sono
router.post('/', sonoController.createSono);

// GET /api/sono/crianca/:crianca_id - Obter todos os registros de sono de uma criança
router.get('/crianca/:crianca_id', sonoController.getSonoByCrianca);

// GET /api/sono/:id - Obter um registro de sono específico
router.get('/:id', sonoController.getSonoById);

// PUT /api/sono/:id - Atualizar um registro de sono
router.put('/:id', sonoController.updateSono);

// DELETE /api/sono/:id - Deletar um registro de sono
router.delete('/:id', sonoController.deleteSono);

module.exports = router;
