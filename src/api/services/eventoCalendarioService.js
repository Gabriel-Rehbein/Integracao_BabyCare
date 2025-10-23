const eventoCalendarioRepository = require('../repository/eventoCalendarioRepository');
const criancaRepository = require('../repository/criancaRepository');

const createEvento = async (eventoData, usuario_id) => {
    const crianca = await criancaRepository.findById(eventoData.crianca_id);
    if (!crianca || crianca.usuario_id !== usuario_id) {
        throw new Error('Criança não encontrada ou não pertence ao usuário');
    }
    return await eventoCalendarioRepository.create(eventoData);
};

const getEventosByCrianca = async (crianca_id, usuario_id) => {
    const crianca = await criancaRepository.findById(crianca_id);
    if (!crianca || crianca.usuario_id !== usuario_id) {
        throw new Error('Criança não encontrada ou não pertence ao usuário');
    }
    return await eventoCalendarioRepository.findAllByCriancaId(crianca_id);
};

const getEventoById = async (id, usuario_id) => {
    const evento = await eventoCalendarioRepository.findById(id);
    if (!evento) return null;

    const crianca = await criancaRepository.findById(evento.crianca_id);
    if (!crianca || crianca.usuario_id !== usuario_id) {
        return null;
    }
    return evento;
};

const updateEvento = async (id, eventoData, usuario_id) => {
    const evento = await getEventoById(id, usuario_id);
    if (!evento) {
        return null;
    }
    return await eventoCalendarioRepository.update(id, eventoData);
};

const deleteEvento = async (id, usuario_id) => {
    const evento = await getEventoById(id, usuario_id);
    if (!evento) {
        return null;
    }
    return await eventoCalendarioRepository.deleteById(id);
};

module.exports = {
    createEvento,
    getEventosByCrianca,
    getEventoById,
    updateEvento,
    deleteEvento,
};
