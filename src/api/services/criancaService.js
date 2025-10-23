const criancaRepository = require('../repository/criancaRepository');

const createCrianca = async (crianca) => {
    // TODO: Adicionar validação de dados
    return await criancaRepository.create(crianca);
};

const getCriancasByUsuario = async (usuario_id) => {
    return await criancaRepository.findAllByUsuarioId(usuario_id);
};

const getCriancaById = async (id, usuario_id) => {
    const crianca = await criancaRepository.findById(id);
    if (!crianca || crianca.usuario_id !== usuario_id) {
        return null; // Ou lançar um erro
    }
    return crianca;
};

const updateCrianca = async (id, criancaData, usuario_id) => {
    const crianca = await criancaRepository.findById(id);
    if (!crianca || crianca.usuario_id !== usuario_id) {
        return null; // Ou lançar um erro
    }
    return await criancaRepository.update(id, criancaData);
};

const deleteCrianca = async (id, usuario_id) => {
    const crianca = await criancaRepository.findById(id);
    if (!crianca || crianca.usuario_id !== usuario_id) {
        return null; // Ou lançar um erro
    }
    return await criancaRepository.deleteById(id);
};

module.exports = {
    createCrianca,
    getCriancasByUsuario,
    getCriancaById,
    updateCrianca,
    deleteCrianca,
};
