const pool = require('../../config/database');

const create = async (crianca) => {
    const { usuario_id, nome, data_nascimento, avatar_url } = crianca;
    const result = await pool.query(
        'INSERT INTO criancas (usuario_id, nome, data_nascimento, avatar_url) VALUES ($1, $2, $3, $4) RETURNING *',
        [usuario_id, nome, data_nascimento, avatar_url]
    );
    return result.rows[0];
};

const findAllByUsuarioId = async (usuario_id) => {
    const result = await pool.query('SELECT * FROM criancas WHERE usuario_id = $1', [usuario_id]);
    return result.rows;
};

const findById = async (id) => {
    const result = await pool.query('SELECT * FROM criancas WHERE id = $1', [id]);
    return result.rows[0];
};

const update = async (id, crianca) => {
    const { nome, data_nascimento, avatar_url } = crianca;
    const result = await pool.query(
        'UPDATE criancas SET nome = $1, data_nascimento = $2, avatar_url = $3 WHERE id = $4 RETURNING *',
        [nome, data_nascimento, avatar_url, id]
    );
    return result.rows[0];
};

const deleteById = async (id) => {
    const result = await pool.query('DELETE FROM criancas WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
};

module.exports = {
    create,
    findAllByUsuarioId,
    findById,
    update,
    deleteById,
};
