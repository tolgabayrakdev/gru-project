import pool from "../config/database";

export class FeedbackPageService {
    
    async create(payload: { url_token: string, title: string, description?: string, expires_at?: Date, user_id: number }) {
        const { url_token, title, description, expires_at, user_id } = payload;
        const query = `
            INSERT INTO feedback_pages (url_token, title, description, expires_at, user_id)
            VALUES ($1, $2, $3, $4, $5) RETURNING *;
        `;
        const values = [url_token, title, description, expires_at, user_id];

        const { rows } = await pool.query(query, values);
        return rows[0];
    }

    async getById(id: number) {
        const query = `SELECT * FROM feedback_pages WHERE id = $1;`;
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    }

    async getByToken(token: string) {
        const query = `SELECT * FROM feedback_pages WHERE url_token = $1;`;
        const { rows } = await pool.query(query, [token]);
        return rows[0];
    }

    async update(id: number, payload: { title?: string, description?: string, expires_at?: Date }) {
        const { title, description, expires_at } = payload;
        const query = `
            UPDATE feedback_pages 
            SET title = COALESCE($1, title), 
                description = COALESCE($2, description), 
                expires_at = COALESCE($3, expires_at)
            WHERE id = $4 
            RETURNING *;
        `;
        const values = [title, description, expires_at, id];

        const { rows } = await pool.query(query, values);
        return rows[0];
    }

    async delete(id: number) {
        const query = `DELETE FROM feedback_pages WHERE id = $1 RETURNING *;`;
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    }

    async isTokenExpire(token: string) {
        const query = `SELECT expires_at FROM feedback_pages WHERE url_token = $1;`;
        const { rows } = await pool.query(query, [token]);
        
        if (!rows.length) return false;

        const expiresAt = rows[0].expires_at;
        return expiresAt ? new Date(expiresAt) < new Date() : false;
    }
}
