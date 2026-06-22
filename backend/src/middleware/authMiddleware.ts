import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { pool } from "../db/pool";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as {
      userId: number;
    };

    const result = await pool.query(
      `
      SELECT id, email
      FROM users
      WHERE id = $1
      `,
      [decoded.userId]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    req.user = result.rows[0];

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
};