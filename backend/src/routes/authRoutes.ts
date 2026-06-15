import { Router } from "express";
import { pool } from "../db/pool";
import bcrypt from "bcrypt";

const router = Router();

router.get("/test", (_req, res) => {
  res.json({
    message: "Auth route working",
  });
});

router.post("/register", async (_req, res) => {
  const { email, password } = _req.body;

  const passwordHash = await bcrypt.hash(password, 10);

  const result = await pool.query(
    `
      INSERT INTO users (email, password_hash)
      VALUES ($1, $2)
      RETURNING id, email, created_at
  `,
    [email, passwordHash]
  );
  res.status(201).json(result.rows[0]);
});

export default router;