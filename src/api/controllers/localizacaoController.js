const localizacaoService = require('../services/localizacaoService');

const createLocalizacao = async (req, res) => {
    try {
        const localizacao = await localizacaoService.createLocalizacao(req.body, req.user.id);
        res.status(201).json(localizacao);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getLatestLocalizacaoByCrianca = async (req, res) => {
    try {
        const { crianca_id } = req.params;
        const localizacao = await localizacaoService.getLatestLocalizacaoByCrianca(crianca_id, req.user.id);
        if (!localizacao) {
            return res.status(404).json({ message: 'Nenhuma localização encontrada para esta criança.' });
        }
        res.status(200).json(localizacao);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getLocalizacaoHistoryByCrianca = async (req, res) => {
    try {
        const { crianca_id } = req.params;
        const historico = await localizacaoService.getLocalizacaoHistoryByCrianca(crianca_id, req.user.id);
        res.status(200).json(historico);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteLocalizacao = async (req, res) => {
    try {
        const { id } = req.params;
        const localizacao = await localizacaoService.deleteLocalizacao(id, req.user.id);
        if (!localizacao) {
            return res.status(404).json({ message: 'Registro de localização não encontrado ou não pertence ao usuário' });
        }
        res.status(200).json({ message: 'Registro de localização deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar registro de localização', error: error.message });
    }
};

module.exports = {
    createLocalizacao,
    getLatestLocalizacaoByCrianca,
    getLocalizacaoHistoryByCrianca,
    deleteLocalizacao,
};
