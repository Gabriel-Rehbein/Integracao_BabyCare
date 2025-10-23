const express = require('express');
const router = express.Router();
const refeicaoController = require('../controllers/refeicaoController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

// POST /api/refeicoes - Criar uma nova refeição
router.post('/', refeicaoController.createRefeicao);

// GET /api/refeicoes/crianca/:crianca_id - Obter todas as refeições de uma criança
router.get('/crianca/:crianca_id', refeicaoController.getRefeicoesByCrianca);

// GET /api/refeicoes/:id - Obter uma refeição específica
router.get('/:id', refeicaoController.getRefeicaoById);

// PUT /api/refeicoes/:id - Atualizar uma refeição
router.put('/:id', refeicaoController.updateRefeicao);

// DELETE /api/refeicoes/:id - Deletar uma refeição
router.delete('/:id', refeicaoController.deleteRefeicao);

module.exports = router;
