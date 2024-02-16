import Header from "../Header";
import Footer from "../Footer";
import plus from "../../assets/plus.png";
import { useState, useEffect } from "react";
import print from "../../assets/print.png";
import { useNavigate } from "react-router-dom";
import { indexPrograms } from "../../services/admin/program";
import { useAuth } from "../../services/AuthContext";

function Addmain() {
  const navigate = useNavigate();

  const { token } = useAuth();
  const [programs, setPrograms] = useState([]);

  const fetchData = async () => {
    const res = await indexPrograms(token);
    setPrograms(res);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [filterValue, setFilterValue] = useState("");
  const filteredProgram = programs.filter((pro) =>
    pro.name.includes(filterValue)
  );

  const printDiploma = () => {};

  return (
    <>
      <Header name="< العودة" link="/" />
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
                {filteredProgram.map((pro) => (
                  <div className="card" key={pro.id}>
                    <button onClick={printDiploma}>
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
        <Footer />
      </div>
    </>
  );
}

export default Addmain;
