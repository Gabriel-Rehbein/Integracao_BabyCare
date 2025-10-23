const pool = require('../../config/database');

const create = async (refeicao) => {
    const { crianca_id, tipo_refeicao, descricao, horario } = refeicao;
    const result = await pool.query(
        'INSERT INTO refeicoes (crianca_id, tipo_refeicao, descricao, horario) VALUES ($1, $2, $3, $4) RETURNING *',
        [crianca_id, tipo_refeicao, descricao, horario]
    );
    return result.rows[0];
};

const findAllByCriancaId = async (crianca_id) => {
    const result = await pool.query('SELECT * FROM refeicoes WHERE crianca_id = $1', [crianca_id]);
    return result.rows;
};

const findById = async (id) => {
    const result = await pool.query('SELECT * FROM refeicoes WHERE id = $1', [id]);
    return result.rows[0];
};

const update = async (id, refeicao) => {
    const { tipo_refeicao, descricao, horario } = refeicao;
    const result = await pool.query(
        'UPDATE refeicoes SET tipo_refeicao = $1, descricao = $2, horario = $3 WHERE id = $4 RETURNING *',
        [tipo_refeicao, descricao, horario, id]
    );
    return result.rows[0];
};

const deleteById = async (id) => {
    const result = await pool.query('DELETE FROM refeicoes WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
};

module.exports = {
    create,
    findAllByCriancaId,
    findById,
    update,
    deleteById,
};
