const eventoCalendarioService = require('../services/eventoCalendarioService');

const createEvento = async (req, res) => {
    try {
        const evento = await eventoCalendarioService.createEvento(req.body, req.user.id);
        res.status(201).json(evento);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getEventosByCrianca = async (req, res) => {
    try {
        const { crianca_id } = req.params;
        const eventos = await eventoCalendarioService.getEventosByCrianca(crianca_id, req.user.id);
        res.status(200).json(eventos);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getEventoById = async (req, res) => {
    try {
        const { id } = req.params;
        const evento = await eventoCalendarioService.getEventoById(id, req.user.id);
        if (!evento) {
            return res.status(404).json({ message: 'Evento não encontrado ou não pertence ao usuário' });
        }
        res.status(200).json(evento);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar evento', error: error.message });
    }
};

const updateEvento = async (req, res) => {
    try {
        const { id } = req.params;
        const evento = await eventoCalendarioService.updateEvento(id, req.body, req.user.id);
        if (!evento) {
            return res.status(404).json({ message: 'Evento não encontrado ou não pertence ao usuário' });
        }
        res.status(200).json(evento);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar evento', error: error.message });
    }
};

const deleteEvento = async (req, res) => {
    try {
        const { id } = req.params;
        const evento = await eventoCalendarioService.deleteEvento(id, req.user.id);
        if (!evento) {
            return res.status(404).json({ message: 'Evento não encontrado ou não pertence ao usuário' });
        }
        res.status(200).json({ message: 'Evento deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar evento', error: error.message });
    }
};

module.exports = {
    createEvento,
    getEventosByCrianca,
    getEventoById,
    updateEvento,
    deleteEvento,
};
