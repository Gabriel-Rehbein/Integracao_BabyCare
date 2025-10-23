const express = require('express');
const router = express.Router();
const localizacaoController = require('../controllers/localizacaoController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

// POST /api/localizacao - Criar um novo registro de localização
router.post('/', localizacaoController.createLocalizacao);

// GET /api/localizacao/crianca/:crianca_id/latest - Obter a última localização de uma criança
router.get('/crianca/:crianca_id/latest', localizacaoController.getLatestLocalizacaoByCrianca);

// GET /api/localizacao/crianca/:crianca_id/history - Obter o histórico de localização de uma criança
router.get('/crianca/:crianca_id/history', localizacaoController.getLocalizacaoHistoryByCrianca);

// DELETE /api/localizacao/:id - Deletar um registro de localização
router.delete('/:id', localizacaoController.deleteLocalizacao);

module.exports = router;
