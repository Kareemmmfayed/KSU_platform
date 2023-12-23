import client from "../db/postgresDB";
import HttpError from "./httpError";

export type Year = {
  id: string;
  name: string;
  date: string;
  notes: string;
};

export default class YearModel {
  async createYear(name: string, notes: string): Promise<Year> {
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

    let result;
    try {
      const query =
        "INSERT INTO year (name, notes) VALUES ($1, $2) RETURNING *";
      result = await connection.query(query, [name, notes]);
    } catch (err) {
      const msg = "Could not create year";
      throw new HttpError(msg, 500);
    } finally {
      connection.release();
    }

    return result.rows[0];
  }

  async indexYear(
    page: number = NaN,
    limit: number = NaN
  ): Promise<{
    years: Year[];
    count: number;
  }> {
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

    let result;

    // Check if page and limit are provided
    if (page && limit) {
      // Calculate the offset based on the page number and limit
      const offset = (page - 1) * limit;

      // query database with pagination
      try {
        const sql = "SELECT * FROM year LIMIT $1 OFFSET $2";
        result = await connection.query(sql, [limit, offset]);
      } catch (error) {
        const msg = `Could not index years. ${(error as HttpError).message}`;
        const statusCode = 500;
        throw new HttpError(msg, statusCode);
      } finally {
        // Release connection
        connection.release();
      }
    } else {
      try {
        const sql = "SELECT * FROM year";
        result = await connection.query(sql);
      } catch (error) {
        const msg = `Could not retrieve all years. ${
          (error as HttpError).message
        }`;
        const statusCode = 500;
        throw new HttpError(msg, statusCode);
      }
    }

    if (result.rows.length === 0) {
      const msg = `Could not retrieve years`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    }

    let count;
    try {
      const sql = "SELECT COUNT(*) FROM year";
      count = await connection.query(sql);
    } catch (error) {
      const msg = `Could not count years. ${(error as HttpError).message}`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    } finally {
      // Release connection
      connection.release();
    }

    return {
      years: result.rows,
      count: count.rows[0].count,
    };
  }

  async showYear(yearId: string): Promise<Year> {
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

    let result;
    try {
      const query = "SELECT FROM year WHERE id = $1 RETURNING *";
      result = await connection.query(query, [yearId]);
    } catch (err) {
      const msg = "Could not retrieve year";
      throw new HttpError(msg, 500);
    } finally {
      connection.release();
    }

    if (result.rows.length === 0) {
      const msg = `Could not retrieve year`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    }

    return result.rows[0];
  }

  async deleteYear(yearId: string): Promise<Year> {
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

    let result;
    try {
      const query = "DELETE FROM year WHERE id = $1 RETURNING *";
      result = await connection.query(query, [yearId]);
    } catch (err) {
      const msg = "Could not delete year";
      throw new HttpError(msg, 500);
    } finally {
      connection.release();
    }

    return result.rows[0];
  }
}
