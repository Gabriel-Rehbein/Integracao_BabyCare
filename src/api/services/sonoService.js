const sonoRepository = require('../repository/sonoRepository');
const criancaRepository = require('../repository/criancaRepository');

const createSono = async (sonoData, usuario_id) => {
    const crianca = await criancaRepository.findById(sonoData.crianca_id);
    if (!crianca || crianca.usuario_id !== usuario_id) {
        throw new Error('Criança não encontrada ou não pertence ao usuário');
    }
    return await sonoRepository.create(sonoData);
};

const getSonoByCrianca = async (crianca_id, usuario_id) => {
    const crianca = await criancaRepository.findById(crianca_id);
    if (!crianca || crianca.usuario_id !== usuario_id) {
        throw new Error('Criança não encontrada ou não pertence ao usuário');
    }
    return await sonoRepository.findAllByCriancaId(crianca_id);
};

const getSonoById = async (id, usuario_id) => {
    const sono = await sonoRepository.findById(id);
    if (!sono) return null;

    const crianca = await criancaRepository.findById(sono.crianca_id);
    if (!crianca || crianca.usuario_id !== usuario_id) {
        return null;
    }
    return sono;
};

const updateSono = async (id, sonoData, usuario_id) => {
    const sono = await getSonoById(id, usuario_id);
    if (!sono) {
        return null;
    }
    return await sonoRepository.update(id, sonoData);
};

const deleteSono = async (id, usuario_id) => {
    const sono = await getSonoById(id, usuario_id);
    if (!sono) {
        return null;
    }
    return await sonoRepository.deleteById(id);
};

module.exports = {
    createSono,
    getSonoByCrianca,
    getSonoById,
    updateSono,
    deleteSono,
};
