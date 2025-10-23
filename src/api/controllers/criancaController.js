const criancaService = require('../services/criancaService');

const createCrianca = async (req, res) => {
    try {
        const { nome, data_nascimento, avatar_url } = req.body;
        const crianca = await criancaService.createCrianca({
            usuario_id: req.user.id, // ID do usuário autenticado
            nome,
            data_nascimento,
            avatar_url,
        });
        res.status(201).json(crianca);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar criança', error: error.message });
    }
};

const getCriancas = async (req, res) => {
    try {
        const criancas = await criancaService.getCriancasByUsuario(req.user.id);
        res.status(200).json(criancas);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar crianças', error: error.message });
    }
};

const getCriancaById = async (req, res) => {
    try {
        const { id } = req.params;
        const crianca = await criancaService.getCriancaById(id, req.user.id);
        if (!crianca) {
            return res.status(404).json({ message: 'Criança não encontrada ou não pertence ao usuário' });
        }
        res.status(200).json(crianca);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar criança', error: error.message });
    }
};

const updateCrianca = async (req, res) => {
    try {
        const { id } = req.params;
        const crianca = await criancaService.updateCrianca(id, req.body, req.user.id);
        if (!crianca) {
            return res.status(404).json({ message: 'Criança não encontrada ou não pertence ao usuário' });
        }
        res.status(200).json(crianca);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar criança', error: error.message });
    }
};

const deleteCrianca = async (req, res) => {
    try {
        const { id } = req.params;
        const crianca = await criancaService.deleteCrianca(id, req.user.id);
        if (!crianca) {
            return res.status(404).json({ message: 'Criança não encontrada ou não pertence ao usuário' });
        }
        res.status(200).json({ message: 'Criança deletada com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar criança', error: error.message });
    }
};

module.exports = {
    createCrianca,
    getCriancas,
    getCriancaById,
    updateCrianca,
    deleteCrianca,
};
