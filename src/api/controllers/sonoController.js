const sonoService = require('../services/sonoService');

const createSono = async (req, res) => {
    try {
        const sono = await sonoService.createSono(req.body, req.user.id);
        res.status(201).json(sono);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getSonoByCrianca = async (req, res) => {
    try {
        const { crianca_id } = req.params;
        const sonos = await sonoService.getSonoByCrianca(crianca_id, req.user.id);
        res.status(200).json(sonos);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getSonoById = async (req, res) => {
    try {
        const { id } = req.params;
        const sono = await sonoService.getSonoById(id, req.user.id);
        if (!sono) {
            return res.status(404).json({ message: 'Registro de sono não encontrado ou não pertence ao usuário' });
        }
        res.status(200).json(sono);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar registro de sono', error: error.message });
    }
};

const updateSono = async (req, res) => {
    try {
        const { id } = req.params;
        const sono = await sonoService.updateSono(id, req.body, req.user.id);
        if (!sono) {
            return res.status(404).json({ message: 'Registro de sono não encontrado ou não pertence ao usuário' });
        }
        res.status(200).json(sono);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar registro de sono', error: error.message });
    }
};

const deleteSono = async (req, res) => {
    try {
        const { id } = req.params;
        const sono = await sonoService.deleteSono(id, req.user.id);
        if (!sono) {
            return res.status(404).json({ message: 'Registro de sono não encontrado ou não pertence ao usuário' });
        }
        res.status(200).json({ message: 'Registro de sono deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar registro de sono', error: error.message });
    }
};

module.exports = {
    createSono,
    getSonoByCrianca,
    getSonoById,
    updateSono,
    deleteSono,
};
