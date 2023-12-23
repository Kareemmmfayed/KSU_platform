import * as dotenv from "dotenv";
import { Pool, PoolConfig } from "pg";

dotenv.config();

const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  NODE_ENV,
  POSTGRES_DB_TEST,
  DATABASE_URL,
} = process.env;

const localDBCred: PoolConfig = {
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  host: POSTGRES_HOST,
  database: NODE_ENV === "test" ? POSTGRES_DB_TEST : POSTGRES_DB,
  max: 10,
};

const deployedDBCred: PoolConfig = {
  connectionString: DATABASE_URL,
};

const client = new Pool(DATABASE_URL ? deployedDBCred : localDBCred);

export default client;
