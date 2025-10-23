const remedioRepository = require('../repository/remedioRepository');
const criancaRepository = require('../repository/criancaRepository');

const createRemedio = async (remedioData, usuario_id) => {
    const crianca = await criancaRepository.findById(remedioData.crianca_id);
    if (!crianca || crianca.usuario_id !== usuario_id) {
        throw new Error('Criança não encontrada ou não pertence ao usuário');
    }
    return await remedioRepository.create(remedioData);
};

const getRemediosByCrianca = async (crianca_id, usuario_id) => {
    const crianca = await criancaRepository.findById(crianca_id);
    if (!crianca || crianca.usuario_id !== usuario_id) {
        throw new Error('Criança não encontrada ou não pertence ao usuário');
    }
    return await remedioRepository.findAllByCriancaId(crianca_id);
};

const getRemedioById = async (id, usuario_id) => {
    const remedio = await remedioRepository.findById(id);
    if (!remedio) return null;

    const crianca = await criancaRepository.findById(remedio.crianca_id);
    if (!crianca || crianca.usuario_id !== usuario_id) {
        return null;
    }
    return remedio;
};

const updateRemedio = async (id, remedioData, usuario_id) => {
    const remedio = await getRemedioById(id, usuario_id);
    if (!remedio) {
        return null;
    }
    return await remedioRepository.update(id, remedioData);
};

const deleteRemedio = async (id, usuario_id) => {
    const remedio = await getRemedioById(id, usuario_id);
    if (!remedio) {
        return null;
    }
    return await remedioRepository.deleteById(id);
};

module.exports = {
    createRemedio,
    getRemediosByCrianca,
    getRemedioById,
    updateRemedio,
    deleteRemedio,
};
