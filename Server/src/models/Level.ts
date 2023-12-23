import client from "../db/postgresDB";
import HttpError from "./httpError";

export type Level = {
  id: string;
  name: string;
  program_id: string;
  created_at: string;
  updated_at: string;
};

export default class LevelModel {
  async createLevel(name: string, programId: string): Promise<Level> {
    // Connect to database
    let connection;

    try {
      connection = await client.connect();
    } catch (err) {
      const msg = `Could not connect to database: ${
        (err as HttpError).message
      }`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    }

    let res;
    try {
      const query = `INSERT INTO level (name, program_id) VALUES ($1, $2) RETURNING *`;

      res = await connection.query(query, [name, programId]);
    } catch (err) {
      const msg = `New level could not be created: ${
        (err as HttpError).message
      }`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    } finally {
      connection.release();
    }

    if (res.rows.length === 0) {
      const msg = `New level could not be created`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    }

    return res.rows[0];
  }

  async showLevel(id: string): Promise<Level> {
    let connection;
    try {
      connection = await client.connect();
    } catch (err) {
      const msg = `Could not connect to database: ${
        (err as HttpError).message
      }`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    }

    let res;
    try {
      const query = `SELECT * FROM level  WHERE id = $1`;
      res = await connection.query(query, [id]);
    } catch (err) {
      const msg = `Level could not be retrieved: ${(err as HttpError).message}`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    } finally {
      connection.release();
    }

    if (res.rows.length === 0) {
      const msg = `Level could not be retrieved`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    }

    return res.rows[0];
  }

  async indexLevel(
    page: number,
    limit: number
  ): Promise<{ levels: Level[]; count: number }> {
    let connection;
    try {
      connection = await client.connect();
    } catch (error) {
      const msg = `Could not connect to the database. ${
        (error as HttpError).message
      }`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    }

    let res;

    if (page && limit) {
      const offset = (page - 1) * limit;

      try {
        // Query with pagination
        const query = `SELECT * FROM level LIMIT $1 OFFSET $2`;
        res = await connection.query(query, [limit, offset]);
      } catch (err) {
        const msg = `Could not index levels: ${(err as HttpError).message}`;
        const statusCode = 500;
        throw new HttpError(msg, statusCode);
      } finally {
        connection.release();
      }
    } else {
      try {
        // Query with pagination
        const query = `SELECT * FROM level`;
        res = await connection.query(query);
      } catch (err) {
        const msg = `Could not get all levels: ${(err as HttpError).message}`;
        const statusCode = 500;
        throw new HttpError(msg, statusCode);
      } finally {
        connection.release();
      }
    }

    if (res.rows.length === 0) {
      const msg = "No levels found";
      const statusCode = 404;
      throw new HttpError(msg, statusCode);
    }

    let count;
    try {
      const query = `SELECT COUNT(*) FROM level`;
      count = await connection.query(query);
    } catch (err) {
      const msg = `Could not count levels. ${(err as HttpError).message}`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    }

    return {
      levels: res.rows,
      count: count.rows[0].count,
    };
  }

  async deleteLevel(id: string): Promise<Level> {
    let connection;
    try {
      connection = await client.connect();
    } catch (err) {
      const msg = `Could not connect to database: ${
        (err as HttpError).message
      }`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    }

    let res;
    try {
      const query = `DELETE FROM level WHERE id = $1 RETURNING *`;
      res = await connection.query(query, [id]);
    } catch (err) {
      const msg = `Level could not be deleted: ${(err as HttpError).message}`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    } finally {
      connection.release();
    }

    if (res.rows.length === 0) {
      const msg = `Level could not be deleted`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    }

    return res.rows[0];
  }
}
