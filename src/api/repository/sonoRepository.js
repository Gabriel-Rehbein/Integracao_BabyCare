const pool = require('../../config/database');

const create = async (sono) => {
    const { crianca_id, data, hora_inicio, hora_fim, qualidade, observacoes } = sono;
    const result = await pool.query(
        'INSERT INTO sono (crianca_id, data, hora_inicio, hora_fim, qualidade, observacoes) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [crianca_id, data, hora_inicio, hora_fim, qualidade, observacoes]
    );
    return result.rows[0];
};

const findAllByCriancaId = async (crianca_id) => {
    const result = await pool.query('SELECT * FROM sono WHERE crianca_id = $1', [crianca_id]);
    return result.rows;
};

const findById = async (id) => {
    const result = await pool.query('SELECT * FROM sono WHERE id = $1', [id]);
    return result.rows[0];
};

const update = async (id, sono) => {
    const { data, hora_inicio, hora_fim, qualidade, observacoes } = sono;
    const result = await pool.query(
        'UPDATE sono SET data = $1, hora_inicio = $2, hora_fim = $3, qualidade = $4, observacoes = $5 WHERE id = $6 RETURNING *',
        [data, hora_inicio, hora_fim, qualidade, observacoes, id]
    );
    return result.rows[0];
};

const deleteById = async (id) => {
    const result = await pool.query('DELETE FROM sono WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
};

module.exports = {
    create,
    findAllByCriancaId,
    findById,
    update,
    deleteById,
};
