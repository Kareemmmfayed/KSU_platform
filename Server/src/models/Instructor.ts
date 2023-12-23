import client from "../db/postgresDB";
import HttpError from "./httpError";
import hashingPassword from "../utils/passwordHashing";
import compareHashedPassword from "../utils/compareHashedPassword";
import { Course } from "./Course";
import { Student } from "./Student";

export type Instructor = {
  id: string;
  name: string;
  email: string;
  password: string;
  collage_id: string;
  created_at: string;
  updated_at: string;
};

export class InstructorModel {
  async createInstructor(
    name: string,
    email: string,
    password: string,
    collageId: string
  ): Promise<Instructor> {
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

    let hashedPassword: string;
    try {
      hashedPassword = await hashingPassword(password);
    } catch (err) {
      const msg = `Could not hash password: ${(err as HttpError).message}`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    }

    let result;
    try {
      const query = `INSERT INTO instructor (name, email, password, collage_id) VALUES ($1, $2, $3, $4) RETURNING *`;

      result = await connection.query(query, [
        name,
        email,
        hashedPassword,
        collageId,
      ]);
    } catch (err) {
      const msg = `Could not create instructor: ${(err as HttpError).message}`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    } finally {
      connection.release();
    }

    // Check if the result is empty
    if (result.rows.length === 0) {
      const msg = `Could not create instructor`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    }

    // Return the created instructor
    const instructor = result.rows[0];
    const { password: _, ...instructorRest } = instructor;
    return instructorRest;
  }

  async showInstructor(
    id: string,
    collageId?: string
  ): Promise<Omit<Instructor, "password">> {
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
      if (collageId) {
        const query = `SELECT * FROM instructor WHERE id = $1 AND collage_id=$2`;
        res = await connection.query(query, [id, collageId]);
      } else {
        const query = `SELECT * FROM instructor WHERE id = $1`;
        res = await connection.query(query, [id]);
      }
    } catch (err) {
      const msg = `Instructor could not be retrieved: ${
        (err as HttpError).message
      }`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    } finally {
      connection.release();
    }

    if (res.rows.length === 0) {
      const msg = `Instructor could not be retrieved`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    }

    const { password, ...rest } = res.rows[0] as Instructor;

    return rest;
  }

  async indexInstructor(
    page: number,
    limit: number,
    collageId: string
  ): Promise<{ instructors: Omit<Instructor, "password">[]; count: number }> {
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
        const query = `SELECT * FROM instructor WHERE collage_id=$1 LIMIT $2 OFFSET $3`;
        res = await connection.query(query, [collageId, limit, offset]);
      } catch (err) {
        const msg = `Could not index instructors: ${
          (err as HttpError).message
        }`;
        const statusCode = 500;
        throw new HttpError(msg, statusCode);
      } finally {
        connection.release();
      }
    } else {
      try {
        // Query with pagination
        const query = `SELECT * FROM instructor WHERE collage_id=$1`;
        res = await connection.query(query, [collageId]);
      } catch (err) {
        const msg = `Could not get all instructor: ${
          (err as HttpError).message
        }`;
        const statusCode = 500;
        throw new HttpError(msg, statusCode);
      } finally {
        connection.release();
      }
    }

    if (res.rows.length === 0) {
      const msg = "No instructors found";
      const statusCode = 404;
      throw new HttpError(msg, statusCode);
    }

    let count;
    try {
      const query = `SELECT COUNT(*) FROM instructor`;
      count = await connection.query(query);
    } catch (err) {
      const msg = `Could not count instructors. ${(err as HttpError).message}`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    }

    const resp = [];
    for (let instructor of res.rows) {
      const { password, ...rest } = instructor as Instructor;
      resp.push(rest);
    }

    return {
      instructors: resp,
      count: count.rows[0].count,
    };
  }

  async deleteInstructor(
    id: string,
    collageId: string
  ): Promise<Omit<Instructor, "password">> {
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
      const query = `DELETE FROM instructor WHERE id = $1 AND collage_id=$2 RETURNING *`;
      res = await connection.query(query, [id, collageId]);
    } catch (err) {
      const msg = `Instructor could not be deleted: ${
        (err as HttpError).message
      }`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    } finally {
      connection.release();
    }

    if (res.rows.length === 0) {
      const msg = `Instructor could not be deleted`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    }

    const { password, ...rest } = res.rows[0] as Instructor;

    return rest;
  }

  async authenticateInstructor(
    email: string,
    password: string
  ): Promise<Instructor> {
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
      const query = `SELECT * FROM instructor WHERE email = $1`;

      result = await connection.query(query, [email]);
    } catch (err) {
      const msg = `Could not authenticate instructor: ${
        (err as HttpError).message
      }`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    } finally {
      connection.release();
    }

    // Check if the result is empty
    if (result.rows.length === 0) {
      const msg = `Could not authenticate instructor`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    }

    // Check if the password is correct
    const instructor = result.rows[0];
    const isPasswordCorrect = await compareHashedPassword(
      password,
      instructor.password
    );

    if (!isPasswordCorrect) {
      const msg = `Could not authenticate instructor`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    }

    // Return the created instructor
    const instructorCopy = result.rows[0];
    const { password: _, ...rest } = instructorCopy;
    return rest;
  }

  async showInstructorCourses(instructorId: string): Promise<Course[]> {
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
      const query = `select
	c.*
from
	instructor_courses ic
join course c on
	ic.course_id = c.id
where
	ic.instructor_id = $1`;

      result = await connection.query(query, [instructorId]);
    } catch (err) {
      const msg = `Could not show courses for this instructor: ${
        (err as HttpError).message
      }`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    } finally {
      connection.release();
    }

    return result.rows;
  }

  async showInstructorStudents(
    instructorId: string,
    courseId: string
  ): Promise<Omit<Student, "password">[]> {
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
      const query = `select
	s.*
from
	instructor_courses ic
join student_courses sc on
	ic.id = sc.instructor_courses_id
join student s 
on
	sc.student_id = s.id
where
	ic.instructor_id = $1
	and ic.course_id = $2`;

      result = await connection.query(query, [instructorId, courseId]);
    } catch (err) {
      const msg = `Could not show students in this course: ${
        (err as HttpError).message
      }`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    } finally {
      connection.release();
    }

    const res: Omit<Student, "password">[] = [];
    const students = result.rows as Student[];
    for (const student of students) {
      const { password: _, ...rest } = student;
      res.push(rest);
    }

    return res;
  }

  async updateInstructor(
    id: string,
    name: string,
    password: string,
    email: string,
    collageId: string
  ): Promise<Omit<Instructor, "password">> {
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
      let query;
      const queryParameters = [name, email, id, collageId];

      if (password) {
        const hashedPassword = await hashingPassword(password);
        query = `UPDATE instructor SET name = COALESCE($1, name), password = $2, email = COALESCE($3, email) WHERE id=$4 AND collage_id=$5 RETURNING *`;
        queryParameters.splice(1, 0, hashedPassword);
      } else {
        query = `UPDATE instructor SET name = COALESCE($1, name), email = COALESCE($2, email) WHERE id=$3 AND collage_id=$4 RETURNING *`;
      }

      res = await connection.query(query, queryParameters);
    } catch (err) {
      const msg = `Could not update instructor: ${(err as HttpError).message}`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    } finally {
      connection.release();
    }

    if (res.rows.length === 0) {
      const msg = `Could not update instructor`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    }

    const { password: _, ...rest } = res.rows[0] as Instructor;
    return rest;
  }
}
