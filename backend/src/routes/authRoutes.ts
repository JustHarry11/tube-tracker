import { Router } from "express";
import { pool } from "../db/pool";
import bcrypt from "bcrypt";

const router = Router();

router.get("/test", (req, res) => {
  res.json({
    message: "Auth route working",
  });
});

// Register a new user
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

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

// Login a user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const result = await pool.query(
      `
      SELECT * FROM users WHERE email = $1
  `,
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = result.rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        email: user.email,
      },
    });
    
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Something went wrong",
    });
  }
});

export default router;