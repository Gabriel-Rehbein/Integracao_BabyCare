const pool = require('../../config/database');

const create = async (remedio) => {
    const { crianca_id, nome, horario, dosagem, observacoes, ativo } = remedio;
    const result = await pool.query(
        'INSERT INTO remedios (crianca_id, nome, horario, dosagem, observacoes, ativo) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [crianca_id, nome, horario, dosagem, observacoes, ativo]
    );
    return result.rows[0];
};

const findAllByCriancaId = async (crianca_id) => {
    const result = await pool.query('SELECT * FROM remedios WHERE crianca_id = $1', [crianca_id]);
    return result.rows;
};

const findById = async (id) => {
    const result = await pool.query('SELECT * FROM remedios WHERE id = $1', [id]);
    return result.rows[0];
};

const update = async (id, remedio) => {
    const { nome, horario, dosagem, observacoes, ativo } = remedio;
    const result = await pool.query(
        'UPDATE remedios SET nome = $1, horario = $2, dosagem = $3, observacoes = $4, ativo = $5 WHERE id = $6 RETURNING *',
        [nome, horario, dosagem, observacoes, ativo, id]
    );
    return result.rows[0];
};

const deleteById = async (id) => {
    const result = await pool.query('DELETE FROM remedios WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
};

module.exports = {
    create,
    findAllByCriancaId,
    findById,
    update,
    deleteById,
};
