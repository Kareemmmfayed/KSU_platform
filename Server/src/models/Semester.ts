import client from "../db/postgresDB";
import HttpError from "./httpError";

export type Semester = {
  id: string;
  name: string;
  level_id: string;
  created_at: string;
  updated_at: string;
};

export default class SemesterModel {
  async createSemester(name: string, levelId: string): Promise<Semester> {
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
      const query = `INSERT INTO semester (name, level_id) VALUES ($1, $2) RETURNING *`;

      res = await connection.query(query, [name, levelId]);
    } catch (err) {
      const msg = `New semester could not be created: ${
        (err as HttpError).message
      }`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    } finally {
      connection.release();
    }

    if (res.rows.length === 0) {
      const msg = `New semester could not be created`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    }

    return res.rows[0];
  }

  async showSemester(id: string): Promise<Semester> {
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
      const query = `SELECT * FROM semester WHERE id = $1`;
      res = await connection.query(query, [id]);
    } catch (err) {
      const msg = `Semester could not be retrieved: ${
        (err as HttpError).message
      }`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    } finally {
      connection.release();
    }

    if (res.rows.length === 0) {
      const msg = `Semester could not be retrieved`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    }

    return res.rows[0];
  }

  async indexSemester(
    page: number,
    limit: number
  ): Promise<{ semesters: Semester[]; count: number }> {
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
        const query = `SELECT * FROM semester LIMIT $1 OFFSET $2`;
        res = await connection.query(query, [limit, offset]);
      } catch (err) {
        const msg = `Could not index semesters: ${(err as HttpError).message}`;
        const statusCode = 500;
        throw new HttpError(msg, statusCode);
      } finally {
        connection.release();
      }
    } else {
      try {
        const query = `SELECT * FROM semester`;
        res = await connection.query(query);
      } catch (err) {
        const msg = `Could not get all semesters: ${
          (err as HttpError).message
        }`;
        const statusCode = 500;
        throw new HttpError(msg, statusCode);
      } finally {
        connection.release();
      }
    }

    if (res.rows.length === 0) {
      const msg = "No semesters found";
      const statusCode = 404;
      throw new HttpError(msg, statusCode);
    }

    let count;
    try {
      const query = `SELECT COUNT(*) FROM semester`;
      count = await connection.query(query);
    } catch (err) {
      const msg = `Could not count semester. ${(err as HttpError).message}`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    }

    return {
      semesters: res.rows,
      count: count.rows[0].count,
    };
  }

  async deleteSemester(id: string): Promise<Semester> {
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
      const query = `DELETE FROM semester WHERE id = $1 RETURNING *`;
      res = await connection.query(query, [id]);
    } catch (err) {
      const msg = `Semester could not be deleted: ${
        (err as HttpError).message
      }`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    } finally {
      connection.release();
    }

    if (res.rows.length === 0) {
      const msg = `Semester could not be deleted`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    }

    return res.rows[0];
  }
}
