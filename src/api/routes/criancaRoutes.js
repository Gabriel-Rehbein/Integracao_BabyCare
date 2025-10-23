const express = require('express');
const router = express.Router();
const criancaController = require('../controllers/criancaController');
const authMiddleware = require('../middleware/authMiddleware');

// Todas as rotas de crianças são protegidas
router.use(authMiddleware);

// POST /api/criancas - Criar uma nova criança
router.post('/', criancaController.createCrianca);

// GET /api/criancas - Obter todas as crianças do usuário logado
router.get('/', criancaController.getCriancas);

// GET /api/criancas/:id - Obter uma criança específica
router.get('/:id', criancaController.getCriancaById);

// PUT /api/criancas/:id - Atualizar uma criança
router.put('/:id', criancaController.updateCrianca);

// DELETE /api/criancas/:id - Deletar uma criança
router.delete('/:id', criancaController.deleteCrianca);

module.exports = router;
