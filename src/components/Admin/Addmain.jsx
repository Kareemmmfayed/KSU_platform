import plus from "../../assets/plus.png";
import print from "../../assets/print.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../services/AuthContext";
import { indexPrograms } from "../../services/admin/program";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../Applicant/Spinner";

function Addmain() {
  const { token } = useAuth();
  const navigate = useNavigate();

  const fetchData = async () => {
    const res = await indexPrograms(token);
    return res;
  };

  const { data: programs, isLoading } = useQuery({
    queryFn: fetchData,
    queryKey: ["programs"],
  });

  const [filterValue, setFilterValue] = useState("");
  const filteredProgram = programs?.filter((pro) =>
    pro.name.includes(filterValue)
  );

  const printDiploma = (pro) => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
            <html>
                <head>
                    <style>
                    body {
                      direction: rtl;
                    }
                    </style>
                </head>
                <body>
                  <h1>${pro.name}</h1>
                  <p>${pro.description}</p>
                </body>
            </html>
        `);
    printWindow.document.close();
    printWindow.print();
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="Addmain">
      <div className="Addmain__in">
        <div className="Addmain__in__add">
          <ul>
            <li>
              <button onClick={() => navigate("/admin/diplomas")}>
                <img src={plus} alt="plus" />
                <span>إضافة برنامج دراسي جديد</span>
              </button>
            </li>
            <li>
              <button onClick={() => navigate("/admin/employees")}>
                <img src={plus} alt="plus" />
                <span>إضافة موظف جديد</span>
              </button>
            </li>
            <li>
              <button onClick={() => navigate("/admin/lecturers")}>
                <img src={plus} alt="plus" />
                <span>إضافة محاضر جديد</span>
              </button>
            </li>
            <li>
              <button onClick={() => navigate("/admin/payments")}>
                <img src={plus} alt="plus" />
                <span>إضافة مدفوعات جديدة</span>
              </button>
            </li>
            <li>
              <button onClick={() => navigate("/admin/DipYear")}>
                <img src={plus} alt="plus" />
                <span>إضافة سنة دراسية جديدة</span>
              </button>
            </li>
          </ul>
        </div>
        <div className="Addmain__in__screen">
          <div className="Addmain__in__screen__top">
            <h2>شاشة عرض البرامج الكاملة</h2>
            <input
              type="text"
              placeholder="بحث"
              value={filterValue}
              onChange={(e) => {
                setFilterValue(e.target.value);
              }}
            />
          </div>
          <div className="Addmain__in__screen__body">
            <div className="cards">
              {filteredProgram?.map((pro) => (
                <div className="card" key={pro.id}>
                  <button onClick={() => printDiploma(pro)}>
                    <img src={print} alt="print" />
                  </button>
                  <h3>البرنامج: {pro.name}</h3>
                  <p>الوصف : {pro.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Addmain;
