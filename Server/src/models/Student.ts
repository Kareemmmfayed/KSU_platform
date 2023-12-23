import compareHashedPassword from "../utils/compareHashedPassword";
import { connectToDB } from "../utils/db";
import { Course } from "./Course";
import HttpError from "./httpError";

export type Student = {
  id: string;
  name: string;
  password: string;
  email: string;
  national_id: string;
  gender: string;
  created_at: string;
  updated_at: string;
};

export class StudentModel {
  async createStudent(
    applicantId: string,
    collageId: string
  ): Promise<Student> {
    const connection = await connectToDB();

    let result;
    try {
      const query = `insert
into
	student (collage_id,
	id,
	 name,
	 password,
	 email,
	 national_id,
	 gender 
	)
select
	$1,
	id,
	name ,
	password,
	email,
	national_id,
	gender
from
	applicant
where
	id = $2 RETURNING *`;

      result = await connection.query(query, [collageId, applicantId]);
    } catch (err) {
      const msg = `Could not create student: ${(err as HttpError).message}`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    } finally {
      connection.release();
    }

    // Check if the result is empty
    if (result.rows.length === 0) {
      const msg = `Could not create student`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    }

    // Return the created student
    const student = result.rows[0];
    const { password: _, ...restStudent } = student;
    return restStudent;
  }

  async indexStudent(page: number = NaN, limit: number = NaN) {
    // connect to database
    const connection = await connectToDB();

    let result;

    // Check if page and limit are provided
    if (page && limit) {
      // Calculate the offset based on the page number and limit
      const offset = (page - 1) * limit;

      // query database with pagination
      try {
        const sql = "SELECT * FROM student LIMIT $1 OFFSET $2";
        result = await connection.query(sql, [limit, offset]);
      } catch (error) {
        const mes = `Could not index students. ${(error as HttpError).message}`;
        const statusCode = 500;
        throw new HttpError(mes, statusCode);
      } finally {
        // Release connection
        connection.release();
      }
    } else {
      // If page and limit are not provided, retrieve all students
      try {
        const sql = "SELECT * FROM student";
        result = await connection.query(sql);
      } catch (error) {
        const mes = `Could not retrieve all students. ${
          (error as HttpError).message
        }`;
        const statusCode = 500;
        throw new HttpError(mes, statusCode);
      } finally {
        // Release connection
        connection.release();
      }
    }

    if (result.rows.length === 0) {
      const mes = `No students found.`;
      const statusCode = 404;
      throw new HttpError(mes, statusCode);
    }

    // Calculate students count
    let count;
    try {
      const sql = "SELECT COUNT(*) FROM student";
      count = await connection.query(sql);
    } catch (error) {
      const mes = `Could not calculate students count. ${
        (error as HttpError).message
      }`;
      const statusCode = 500;
      throw new HttpError(mes, statusCode);
    }

    return { students: result.rows, count: count.rows[0].count };
  }

  async authenticateStudent(email: string, password: string): Promise<Student> {
    const connection = await connectToDB();

    let result;
    try {
      const query = `SELECT * FROM student WHERE email = $1`;

      result = await connection.query(query, [email]);
    } catch (err) {
      const msg = `Could not authenticate student: ${
        (err as HttpError).message
      }`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    } finally {
      connection.release();
    }

    // Check if the result is empty
    if (result.rows.length === 0) {
      const msg = `Could not authenticate student`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    }

    // Check if the password is correct
    const student = result.rows[0];
    const isPasswordCorrect = await compareHashedPassword(
      password,
      student.password
    );

    if (!isPasswordCorrect) {
      const msg = `Could not authenticate student`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    }

    // Return the created student
    const studentCopy = result.rows[0];
    const { password: _, ...rest } = studentCopy;
    return rest;
  }

  // Show student profile
  async showStudent(studentId: string): Promise<Student> {
    const connection = await connectToDB();

    let result;
    try {
      const query = `SELECT * FROM student WHERE id = $1`;

      result = await connection.query(query, [studentId]);
    } catch (err) {
      const msg = `Could not show student: ${(err as HttpError).message}`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    } finally {
      connection.release();
    }

    // Check if the result is empty
    if (result.rows.length === 0) {
      const msg = `Could not show student`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    }

    // Return the created student
    const student = result.rows[0];
    const { password: _, ...studentRest } = student;
    return studentRest;
  }

  // Show student by national id
  async showByNationalId(national_id: string): Promise<Student> {
    const connection = await connectToDB();

    let res;
    try {
      const query = `SELECT * FROM student WHERE national_id = $1`;
      res = await connection.query(query, [national_id]);
    } catch (err) {
      const msg = `Could not get student to pay: ${(err as HttpError).message}`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    } finally {
      connection.release();
    }

    // check if student exists
    if (res.rows.length === 0) {
      const msg = `Student does not exist`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    }

    return res.rows[0];
  }

  // TODO: finish delete and update student
  // delete student

  // update student

  // show courses of a student
  async showStudentCourses(
    studentId: string
  ): Promise<{ courses: Course[]; count: number }> {
    const connection = await connectToDB();

    let res;
    try {
      const query = `select
	c.*
from
	student_courses sc
join instructor_courses ic on
	sc.instructor_courses_id = ic.id
join course c on ic.course_id = c.id 
where sc.student_id = $1`;
      res = await connection.query(query, [studentId]);
    } catch (err) {
      const msg = `Could not get student courses: ${
        (err as HttpError).message
      }`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    }
    if (res.rows.length === 0) {
      const msg = `There is no courses for this student`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    }

    let count;
    try {
      const query = `select
  COUNT(*)
from
	student_courses sc
join instructor_courses ic on
	sc.instructor_courses_id = ic.id
join course c on ic.course_id = c.id 
where sc.student_id = $1`;
      count = await connection.query(query, [studentId]);
    } catch (err) {
      const msg = `Could not count course. ${(err as HttpError).message}`;
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
}
