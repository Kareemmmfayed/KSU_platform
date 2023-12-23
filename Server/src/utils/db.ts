import client from "../db/postgresDB";
import HttpError from "../models/httpError";

export const connectToDB = async () => {
  let connection;

  try {
    connection = await client.connect();
  } catch (err) {
    const msg = `Could not connect to database: ${(err as HttpError).message}`;
    const statusCode = 500;
    throw new HttpError(msg, statusCode);
  }

  return connection;
};
