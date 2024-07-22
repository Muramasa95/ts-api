import { Pool } from 'pg';
import { config } from "dotenv"; 
config();

const db_user: string | undefined = process.env.DB_USER;
const db_host: string | undefined = process.env.DB_HOST;
const db_name: string | undefined = process.env.DB_NAME;
const db_pass: string | undefined = process.env.DB_PASS;
const db_port: number | undefined = Number(process.env.DB_PORT);

const pool = new Pool({
  user: db_user,
  host: db_host,
  database: db_name,
  password: db_pass,
  port: db_port,
});

export default pool;