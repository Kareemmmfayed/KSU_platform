import { connectToDB } from "../utils/db";
import HttpError from "./httpError";

export type Course = {
  id: string;
  name: string;
  credit_hours: number;
  code: string;
  semester_id: string;
  description: string;
  created_at: string;
  updated_at: string;
};

export default class CourseModel {
  async createCourse(
    name: string,
    creditHours: number,
    code: string,
    description: string,
    semesterId: string
  ): Promise<Course> {
    // Connect to database
    const connection = await connectToDB();

    let res;
    try {
      const query = `INSERT INTO course (name, semester_id, code, description, credit_hours) VALUES ($1, $2, $3, $4, $5) RETURNING *`;

      res = await connection.query(query, [
        name,
        semesterId,
        code,
        description,
        creditHours,
      ]);
    } catch (err) {
      const msg = `New course could not be created: ${
        (err as HttpError).message
      }`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    } finally {
      connection.release();
    }

    if (res.rows.length === 0) {
      const msg = `New course could not be created`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    }

    return res.rows[0];
  }

  async showCourse(id: string): Promise<Course> {
    const connection = await connectToDB();

    let res;
    try {
      const query = `SELECT * FROM course WHERE id = $1`;
      res = await connection.query(query, [id]);
    } catch (err) {
      const msg = `Course could not be retrieved: ${
        (err as HttpError).message
      }`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    } finally {
      connection.release();
    }

    if (res.rows.length === 0) {
      const msg = `Course could not be retrieved`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    }

    return res.rows[0];
  }

  async indexCourse(
    page: number = NaN,
    limit: number = NaN
  ): Promise<{ courses: Course[]; count: number }> {
    const connection = await connectToDB();

    let res;

    if (page && limit) {
      const offset = (page - 1) * limit;

      try {
        // Query with pagination
        const query = `SELECT * FROM course LIMIT $1 OFFSET $2`;
        res = await connection.query(query, [limit, offset]);
      } catch (err) {
        const msg = `Could not index courses: ${(err as HttpError).message}`;
        const statusCode = 500;
        throw new HttpError(msg, statusCode);
      }
    } else {
      try {
        // Query with pagination
        const query = `SELECT * FROM course`;
        res = await connection.query(query);
      } catch (err) {
        const msg = `Could not get all courses: ${(err as HttpError).message}`;
        const statusCode = 500;
        throw new HttpError(msg, statusCode);
      }
    }

    if (res.rows.length === 0) {
      const msg = "No courses found";
      const statusCode = 404;
      throw new HttpError(msg, statusCode);
    }

    let count;
    try {
      const query = `SELECT COUNT(*) FROM course`;
      count = await connection.query(query);
    } catch (err) {
      const msg = `Could not count courses. ${(err as HttpError).message}`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    } finally {
      connection.release();
    }

    return {
      courses: res.rows,
      count: count.rows[0].count,
    };
  }

  async deleteCourse(id: string): Promise<Course> {
    const connection = await connectToDB();

    let res;
    try {
      const query = `DELETE FROM course WHERE id = $1 RETURNING *`;
      res = await connection.query(query, [id]);
    } catch (err) {
      const msg = `Course could not be deleted: ${(err as HttpError).message}`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    } finally {
      connection.release();
    }

    if (res.rows.length === 0) {
      const msg = `Course could not be deleted`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    }

    return res.rows[0];
  }

  async applyToCourse(
    studentId: string,
    courseId: string
  ): Promise<{ courseId: string }> {
    const connection = await connectToDB();

    try {
      const query1 = `SELECT id FROM instructor_courses WHERE course_id = $1`;
      const instructorCoursesId = await connection.query(query1, [courseId]);

      const query2 = `SELECT id FROM student_courses WHERE instructor_courses_id = $1`;
      const courseIsFound = await connection.query(query2, [
        instructorCoursesId.rows[0].id,
      ]);

      if (courseIsFound.rows.length !== 0) {
        throw new HttpError("Already applied to this course", 500);
      }

      const query3 = `INSERT INTO student_courses (student_id, instructor_courses_id) VALUES ($1, $2)`;
      const newlyCreatedStudentCourse = await connection.query(query3, [
        studentId,
        instructorCoursesId.rows[0].id,
      ]);
    } catch (err) {
      const msg = `Could apply to course: ${(err as HttpError).message}`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    } finally {
      connection.release();
    }

    return { courseId };
  }

  async addInstructorCourse(
    instructorId: string,
    courseId: string,
    yearId: string
  ): Promise<{ courseId: string }> {
    const connection = await connectToDB();

    let result;
    try {
      const query = `INSERT INTO instructor_courses (instructor_id, course_id, year_id) VALUES ($1, $2, $3) RETURNING *`;
      result = await connection.query(query, [instructorId, courseId, yearId]);
    } catch (err) {
      const msg = `Cannot add instructor courses. ${
        (err as HttpError).message
      }`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    } finally {
      connection.release();
    }

    if (result.rows.length === 0) {
      const msg = "Cannot add instructor courses";
      const statusCode = 404;
      throw new HttpError(msg, statusCode);
    }

    return { courseId };
  }
}
