import { Pool } from "pg";

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Ensure this is correctly defined in .env
});

export const query = (text: string, params?: any[]) => pool.query(text, params);
