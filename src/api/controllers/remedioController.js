const remedioService = require('../services/remedioService');

const createRemedio = async (req, res) => {
    try {
        const remedio = await remedioService.createRemedio(req.body, req.user.id);
        res.status(201).json(remedio);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getRemediosByCrianca = async (req, res) => {
    try {
        const { crianca_id } = req.params;
        const remedios = await remedioService.getRemediosByCrianca(crianca_id, req.user.id);
        res.status(200).json(remedios);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getRemedioById = async (req, res) => {
    try {
        const { id } = req.params;
        const remedio = await remedioService.getRemedioById(id, req.user.id);
        if (!remedio) {
            return res.status(404).json({ message: 'Remédio não encontrado ou não pertence ao usuário' });
        }
        res.status(200).json(remedio);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar remédio', error: error.message });
    }
};

const updateRemedio = async (req, res) => {
    try {
        const { id } = req.params;
        const remedio = await remedioService.updateRemedio(id, req.body, req.user.id);
        if (!remedio) {
            return res.status(404).json({ message: 'Remédio não encontrado ou não pertence ao usuário' });
        }
        res.status(200).json(remedio);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar remédio', error: error.message });
    }
};

const deleteRemedio = async (req, res) => {
    try {
        const { id } = req.params;
        const remedio = await remedioService.deleteRemedio(id, req.user.id);
        if (!remedio) {
            return res.status(404).json({ message: 'Remédio não encontrado ou não pertence ao usuário' });
        }
        res.status(200).json({ message: 'Remédio deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar remédio', error: error.message });
    }
};

module.exports = {
    createRemedio,
    getRemediosByCrianca,
    getRemedioById,
    updateRemedio,
    deleteRemedio,
};
