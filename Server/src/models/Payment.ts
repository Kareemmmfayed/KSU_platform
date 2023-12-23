import { connectToDB } from "../utils/db";
import HttpError from "./httpError";

export type Payment = {
  id: string;
  paymentKind: string;
};

export type ProgramYearPayment = {
  id: string;
  date: string;
  created_at: string;
  updated_at: string;
} & InsertPaymentAYear;

export type InsertPaymentAYear = {
  program_id: string;
  payment_id: string;
  year_id: string;
  price: number;
};

export type StudentProgramYearPayment = {
  id: string;
  program_year_payments_id: string;
  applicant_id: string;
  amount_paid: number;
  payment_date?: string;
  purchase_number: number;
  purchase_image: string;
  created_at: string;
  updated_at: string;
};

class PaymentModel {
  async createPayment(paymentKind: string): Promise<Payment> {
    const connection = await connectToDB();

    let result;
    try {
      const query =
        "INSERT INTO payment (payment_kind) VALUES ($1) RETURNING *";
      result = await connection.query(query, [paymentKind]);
    } catch (err) {
      const msg = "Could not create payment";
      throw new HttpError(msg, 500);
    } finally {
      connection.release();
    }

    return result.rows[0];
  }

  async indexPayment(
    page: number = NaN,
    limit: number = NaN
  ): Promise<Payment[]> {
    const connection = await connectToDB();

    let result;

    // Check if page and limit are provided
    if (page && limit) {
      // Calculate the offset based on the page number and limit
      const offset = (page - 1) * limit;

      // query database with pagination
      try {
        const sql = "SELECT * FROM payment LIMIT $1 OFFSET $2";
        result = await connection.query(sql, [limit, offset]);
      } catch (error) {
        const msg = `Could not index payments. ${(error as HttpError).message}`;
        const statusCode = 500;
        throw new HttpError(msg, statusCode);
      } finally {
        // Release connection
        connection.release();
      }
    } else {
      try {
        const sql = "SELECT * FROM payment";
        result = await connection.query(sql);
      } catch (error) {
        const msg = `Could not retrieve all payments. ${
          (error as HttpError).message
        }`;
        const statusCode = 500;
        throw new HttpError(msg, statusCode);
      } finally {
        // Release connection
        connection.release();
      }
    }

    if (result.rows.length === 0) {
      const msg = `Could not retrieve payments`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    }

    return result.rows;
  }

  async deletePayment(paymentId: string): Promise<Payment> {
    const connection = await connectToDB();

    let result;
    try {
      const query = "DELETE FROM payment WHERE id = $1 RETURNING *";
      result = await connection.query(query, [paymentId]);
    } catch (err) {
      const msg = "Could not delete payment";
      throw new HttpError(msg, 500);
    } finally {
      connection.release();
    }

    return result.rows[0];
  }

  /**
   * Add payment to a year for a program
   * */
  async chooseAPayment({
    year_id: yearId,
    payment_id: paymentId,
    program_id: programId,
    price,
  }: InsertPaymentAYear): Promise<ProgramYearPayment> {
    const connection = await connectToDB();

    let result;
    try {
      const query =
        "INSERT INTO program_year_payments (program_id, payment_id, year_id, price) VALUES ($1, $2, $3, $4) RETURNING *";
      result = await connection.query(query, [
        programId,
        paymentId,
        yearId,
        price,
      ]);
    } catch (err) {
      const msg = "Could not choose a payment";
      throw new HttpError(msg, 500);
    } finally {
      connection.release();
    }

    if (result.rows.length === 0) {
      const msg = `Could not choose a payment`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    }

    return result.rows[0];
  }

  async assignPaymentToStudent(
    applicant_id: string,
    program_year_payments_id: string
  ): Promise<StudentProgramYearPayment> {
    const connection = await connectToDB();

    let result;
    try {
      const query1 = `SELECT price FROM program_year_payments WHERE id = $1`;
      const query2 = `INSERT INTO applicant_program_year_payments
  (program_year_payments_id, applicant_id, amount_paid)
VALUES
  ($1, $2, $3) RETURNING *`;
      const programPrice = await connection.query(query1, [
        program_year_payments_id,
      ]);
      result = await connection.query(query2, [
        program_year_payments_id,
        applicant_id,
        programPrice.rows[0].price,
      ]);
    } catch (err) {
      const msg = `Could not assign payment to a student: ${
        (err as HttpError).message
      }`;
      throw new HttpError(msg, 500);
    } finally {
      connection.release();
    }

    if (result.rows.length === 0) {
      const msg = "Could not assign payment to a student";
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    }

    return result.rows[0];
  }

  async updateStudentPayment(
    studentPaymentsId: string,
    purchaseNumber: string | null,
    paymentDate: string | null,
    status: "pending" | "approved" | null
  ): Promise<StudentProgramYearPayment> {
    const connection = await connectToDB();

    let result;
    try {
      const query = `UPDATE applicant_program_year_payments
SET purchase_number = COALESCE($1, purchase_number), payment_date = COALESCE($2, payment_date), status = COALESCE($3, status) WHERE id = $4 RETURNING *`;
      result = await connection.query(query, [
        purchaseNumber,
        paymentDate,
        status,
        studentPaymentsId,
      ]);
    } catch (err) {
      const msg = `Could not update payment for student: ${
        (err as HttpError).message
      }`;
      throw new HttpError(msg, 500);
    } finally {
      connection.release();
    }

    if (result.rows.length === 0) {
      const msg = "Could not update payment for student";
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    }

    return result.rows[0];
  }

  async listPendingPayments(
    page: number = NaN,
    limit: number = NaN
  ): Promise<StudentProgramYearPayment[]> {
    const connection = await connectToDB();

    let result;
    if (limit && page) {
      const offset = (page - 1) * limit;
      try {
        const query = `SELECT * FROM applicant_program_year_payments WHERE purchase_number IS NOT NULL AND STATUS = 'pending' LIMIT $1 OFFSET $2`;
        result = await connection.query(query, [limit, offset]);
      } catch (err) {
        const msg = `Could not list payments for students: ${
          (err as HttpError).message
        }`;
        throw new HttpError(msg, 500);
      } finally {
        connection.release();
      }
    } else {
      try {
        const query = `SELECT * FROM applicant_program_year_payments WHERE purchase_number IS NOT NULL AND STATUS = 'pending'`;
        result = await connection.query(query);
      } catch (err) {
        const msg = `Could not list payments for students: ${
          (err as HttpError).message
        }`;
        throw new HttpError(msg, 500);
      } finally {
        connection.release();
      }
    }

    if (result.rows.length === 0) {
      const msg = "Could not list payments for students";
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    }

    return result.rows;
  }

  async listProgramYearPayments(page: number = NaN, limit: number = NaN) {
    const connection = await connectToDB();

    let result;

    // Check if page and limit are provided
    if (page && limit) {
      // Calculate the offset based on the page number and limit
      const offset = (page - 1) * limit;

      // query database with pagination
      try {
        const sql = "SELECT * FROM program_year_payments LIMIT $1 OFFSET $2";
        result = await connection.query(sql, [limit, offset]);
      } catch (error) {
        const msg = `Could not index payments. ${(error as HttpError).message}`;
        const statusCode = 500;
        throw new HttpError(msg, statusCode);
      } finally {
        // Release connection
        connection.release();
      }
    } else {
      try {
        const sql = "SELECT * FROM program_year_payments";
        result = await connection.query(sql);
      } catch (error) {
        const msg = `Could not retrieve all payments. ${
          (error as HttpError).message
        }`;
        const statusCode = 500;
        throw new HttpError(msg, statusCode);
      } finally {
        // Release connection
        connection.release();
      }
    }

    if (result.rows.length === 0) {
      const msg = `Could not retrieve payments`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    }

    return result.rows;
  }

  async checkStudentPayed(studentId: string): Promise<boolean> {
    const connection = await connectToDB();

    let result;
    try {
      const query = `SELECT * FROM applicant_program_year_payments WHERE applicant_id=$1`;
      result = await connection.query(query, [studentId]);
    } catch (err) {
      const msg = `Could not check if student payed. ${
        (err as HttpError).message
      }`;
      const statusCode = 500;
      throw new HttpError(msg, statusCode);
    } finally {
      connection.release();
    }

    if (result.rows.length === 0) {
      const msg = `Coudn't found student`;
      const statusCode = 404;
      throw new HttpError(msg, statusCode);
    }

    return result.rows[0].status === "approved";
  }
}

export default PaymentModel;
