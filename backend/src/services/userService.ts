import { pool } from "../db/pool";

export async function findUserById(id: number) {
  const result = await pool.query(
    `
    SELECT id, email
    FROM users
    WHERE id = $1
    `,
    [id]
  );

  return result.rows[0];
}