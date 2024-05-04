import { useState } from "react";
import { useAuth } from "../../services/AuthContext";
import { indexStudents } from "../../services/instructor/students/index";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../Applicant/Spinner";
import { useParams } from "react-router-dom";

function Table() {
  const { token } = useAuth();
  const { subId } = useParams();
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = async () => {
    const res = await indexStudents(token, subId);
    return res;
  };

  const { data: students, isLoading } = useQuery({
    queryFn: fetchData,
    queryKey: [`students${subId}`],
  });

  if (!isLoading) {
    var filteredApplicants = students.filter((sub) =>
      sub.name.includes(searchTerm)
    );
  }

  if (isLoading) return <Spinner />;

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
            <html>
                <head>
                    <title>Print Table</title>
                    <style>
                        table {
                            border-collapse: collapse;
                            width: 100%;
                            font-size: 10px; /* Adjust the font size as needed */
                        }
                        th, td {
                            border: 1px solid black;
                            padding: 6px; /* Adjust the padding as needed */
                            text-align: left;
                        }
                    </style>
                </head>
                <body>
                    <table border="1">
                        <thead>
                            <tr>
                                <th>رقم الطالب</th>
                                <th>إسم الطالب</th>
                                <th>الرقم القومي</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${filteredApplicants
                              .map(
                                (applicant, index) => `
                                <tr>
                                    <td>${index + 1}</td>
                                    <td>${applicant.name}</td>
                                    <td>${applicant.national_id}</td>
                                </tr>
                            `
                              )
                              .join("")}
                        </tbody>
                    </table>
                </body>
            </html>
        `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="Table">
      <div className="Table__in">
        <div className="Applicants__in__top">
          <h2>الطلبة المتقدمين</h2>
          <input
            type="text"
            placeholder="بحث"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="Table__in__bot">
          <table border="1">
            <thead>
              <tr>
                <th>رقم الطالب</th>
                <th>إسم الطالب</th>
                <th>الرقم القومي</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplicants.map((applicant, index) => (
                <tr key={applicant.id}>
                  <td>{index + 1}</td>
                  <td>{applicant.name}</td>
                  <td>{applicant.national_id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="but">
          <button onClick={handlePrint}>الطباعة</button>
        </div>
      </div>
    </div>
  );
}

export default Table;
