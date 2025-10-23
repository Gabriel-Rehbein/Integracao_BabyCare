const refeicaoRepository = require('../repository/refeicaoRepository');
const criancaRepository = require('../repository/criancaRepository');

const createRefeicao = async (refeicaoData, usuario_id) => {
    const crianca = await criancaRepository.findById(refeicaoData.crianca_id);
    if (!crianca || crianca.usuario_id !== usuario_id) {
        throw new Error('Criança não encontrada ou não pertence ao usuário');
    }
    return await refeicaoRepository.create(refeicaoData);
};

const getRefeicoesByCrianca = async (crianca_id, usuario_id) => {
    const crianca = await criancaRepository.findById(crianca_id);
    if (!crianca || crianca.usuario_id !== usuario_id) {
        throw new Error('Criança não encontrada ou não pertence ao usuário');
    }
    return await refeicaoRepository.findAllByCriancaId(crianca_id);
};

const getRefeicaoById = async (id, usuario_id) => {
    const refeicao = await refeicaoRepository.findById(id);
    if (!refeicao) return null;

    const crianca = await criancaRepository.findById(refeicao.crianca_id);
    if (!crianca || crianca.usuario_id !== usuario_id) {
        return null;
    }
    return refeicao;
};

const updateRefeicao = async (id, refeicaoData, usuario_id) => {
    const refeicao = await getRefeicaoById(id, usuario_id);
    if (!refeicao) {
        return null;
    }
    return await refeicaoRepository.update(id, refeicaoData);
};

const deleteRefeicao = async (id, usuario_id) => {
    const refeicao = await getRefeicaoById(id, usuario_id);
    if (!refeicao) {
        return null;
    }
    return await refeicaoRepository.deleteById(id);
};

module.exports = {
    createRefeicao,
    getRefeicoesByCrianca,
    getRefeicaoById,
    updateRefeicao,
    deleteRefeicao,
};
