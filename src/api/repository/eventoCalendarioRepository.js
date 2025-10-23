const pool = require('../../config/database');

const create = async (evento) => {
    const { crianca_id, titulo, descricao, data_evento, hora_evento, cor_hex } = evento;
    const result = await pool.query(
        'INSERT INTO eventos_calendario (crianca_id, titulo, descricao, data_evento, hora_evento, cor_hex) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [crianca_id, titulo, descricao, data_evento, hora_evento, cor_hex]
    );
    return result.rows[0];
};

const findAllByCriancaId = async (crianca_id) => {
    const result = await pool.query('SELECT * FROM eventos_calendario WHERE crianca_id = $1', [crianca_id]);
    return result.rows;
};

const findById = async (id) => {
    const result = await pool.query('SELECT * FROM eventos_calendario WHERE id = $1', [id]);
    return result.rows[0];
};

const update = async (id, evento) => {
    const { titulo, descricao, data_evento, hora_evento, cor_hex } = evento;
    const result = await pool.query(
        'UPDATE eventos_calendario SET titulo = $1, descricao = $2, data_evento = $3, hora_evento = $4, cor_hex = $5 WHERE id = $6 RETURNING *',
        [titulo, descricao, data_evento, hora_evento, cor_hex, id]
    );
    return result.rows[0];
};

const deleteById = async (id) => {
    const result = await pool.query('DELETE FROM eventos_calendario WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
};

module.exports = {
    create,
    findAllByCriancaId,
    findById,
    update,
    deleteById,
};
