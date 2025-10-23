const refeicaoService = require('../services/refeicaoService');

const createRefeicao = async (req, res) => {
    try {
        const refeicao = await refeicaoService.createRefeicao(req.body, req.user.id);
        res.status(201).json(refeicao);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getRefeicoesByCrianca = async (req, res) => {
    try {
        const { crianca_id } = req.params;
        const refeicoes = await refeicaoService.getRefeicoesByCrianca(crianca_id, req.user.id);
        res.status(200).json(refeicoes);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getRefeicaoById = async (req, res) => {
    try {
        const { id } = req.params;
        const refeicao = await refeicaoService.getRefeicaoById(id, req.user.id);
        if (!refeicao) {
            return res.status(404).json({ message: 'Refeição não encontrada ou não pertence ao usuário' });
        }
        res.status(200).json(refeicao);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar refeição', error: error.message });
    }
};

const updateRefeicao = async (req, res) => {
    try {
        const { id } = req.params;
        const refeicao = await refeicaoService.updateRefeicao(id, req.body, req.user.id);
        if (!refeicao) {
            return res.status(404).json({ message: 'Refeição não encontrada ou não pertence ao usuário' });
        }
        res.status(200).json(refeicao);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar refeição', error: error.message });
    }
};

const deleteRefeicao = async (req, res) => {
    try {
        const { id } = req.params;
        const refeicao = await refeicaoService.deleteRefeicao(id, req.user.id);
        if (!refeicao) {
            return res.status(404).json({ message: 'Refeição não encontrada ou não pertence ao usuário' });
        }
        res.status(200).json({ message: 'Refeição deletada com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar refeição', error: error.message });
    }
};

module.exports = {
    createRefeicao,
    getRefeicoesByCrianca,
    getRefeicaoById,
    updateRefeicao,
    deleteRefeicao,
};
