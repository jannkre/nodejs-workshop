import { pool } from "./db.mjs";


export const createUser = async (name, email, password) => {
    const [result] = await pool.execute(
        'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
        [name, email, password]
    );
    return result;
}

export const getUser = async (id) => {
    const [result] = await pool.execute(
        'SELECT * FROM users WHERE id = ?',
        [id]
    );
    return result;
}