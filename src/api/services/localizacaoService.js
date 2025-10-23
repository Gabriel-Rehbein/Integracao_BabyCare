const localizacaoRepository = require('../repository/localizacaoRepository');
const criancaRepository = require('../repository/criancaRepository');

const createLocalizacao = async (localizacaoData, usuario_id) => {
    const crianca = await criancaRepository.findById(localizacaoData.crianca_id);
    if (!crianca || crianca.usuario_id !== usuario_id) {
        throw new Error('Criança não encontrada ou não pertence ao usuário');
    }
    return await localizacaoRepository.create(localizacaoData);
};

const getLatestLocalizacaoByCrianca = async (crianca_id, usuario_id) => {
    const crianca = await criancaRepository.findById(crianca_id);
    if (!crianca || crianca.usuario_id !== usuario_id) {
        throw new Error('Criança não encontrada ou não pertence ao usuário');
    }
    return await localizacaoRepository.findLatestByCriancaId(crianca_id);
};

const getLocalizacaoHistoryByCrianca = async (crianca_id, usuario_id) => {
    const crianca = await criancaRepository.findById(crianca_id);
    if (!crianca || crianca.usuario_id !== usuario_id) {
        throw new Error('Criança não encontrada ou não pertence ao usuário');
    }
    return await localizacaoRepository.findAllByCriancaId(crianca_id);
};


const deleteLocalizacao = async (id, usuario_id) => {
    const localizacao = await localizacaoRepository.findById(id);
    if (!localizacao) return null;

    const crianca = await criancaRepository.findById(localizacao.crianca_id);
    if (!crianca || crianca.usuario_id !== usuario_id) {
        return null;
    }
    return await localizacaoRepository.deleteById(id);
};


module.exports = {
    createLocalizacao,
    getLatestLocalizacaoByCrianca,
    getLocalizacaoHistoryByCrianca,
    deleteLocalizacao,
};
