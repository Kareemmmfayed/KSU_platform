import Header from "../Header";
import Footer from "../Footer";
import plus from "../../assets/plus.png";
import { useState } from "react";
import print from "../../assets/print.png";
import { useNavigate } from "react-router-dom";

function Addmain() {
  const navigate = useNavigate();

  const program = [
    [
      "دبلومة إدارة الأعمال",
      "2023 - 2024",
      "الربيعي",
      ["مقرر 1", "مقرر 2"],
      ["مدفوع 1", "مدفوع 2"],
    ],
    [
      "دبلومة إدارة الأعمال",
      "2023 - 2024",
      "الربيعي",
      ["مقرر 1", "مقرر 2"],
      ["مدفوع 1", "مدفوع 2"],
    ],
    [
      "دبلومة إدارة الأعمال",
      "2023 - 2024",
      "الربيعي",
      ["مقرر 1", "مقرر 2"],
      ["مدفوع 1", "مدفوع 2"],
    ],
    [
      "دبلومة إدارة الأعمال",
      "2023 - 2024",
      "الربيعي",
      ["مقرر 1", "مقرر 2"],
      ["مدفوع 1", "مدفوع 2"],
    ],
    [
      "دبلومة المحاسبة",
      "2023 - 2024",
      "الربيعي",
      ["مقرر 4", "مقرر 3"],
      ["مدفوع 1", "مدفوع 2"],
    ],
  ];

  const [filterValue, setFilterValue] = useState("");
  const filteredProgram = program.filter((pro) =>
    pro.some((value) => value.includes(filterValue))
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
                <button onClick={() => navigate("/admin/subjects")}>
                  <img src={plus} alt="plus" />
                  <span>إضافة مقرر جديد</span>
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/admin/years")}>
                  <img src={plus} alt="plus" />
                  <span>إضافة عام/فصل دراسي جديد</span>
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/admin/payments")}>
                  <img src={plus} alt="plus" />
                  <span>إضافة مدفوعات جديدة</span>
                </button>
              </li>
              {/* <li>
                                <button onClick={navtopro}>
                                    <img src={plus} alt="plus" />
                                    <span>إضافة المقررات و المحاضرين للبرنامج</span>
                                </button>
                            </li>
                            <li>
                                <button>
                                    <img src={plus} alt="plus" />
                                    <span>إضافة المدفوعات للبرنامج</span>
                                </button>
                            </li> */}
            </ul>
          </div>
          <div className="Addmain__in__screen">
            <div className="Addmain__in__screen__top">
              <h2>شاشة عرض البرامج الكاملة</h2>
              <input
                type="text"
                placeholder="بحث"
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
              />
            </div>
            <div className="Addmain__in__screen__body">
              <div className="cards">
                {filteredProgram.map((pro, index) => (
                  <div className="card" key={index}>
                    <button onClick={printDiploma}>
                      <img src={print} alt="print" />
                    </button>
                    <h3>البرنامج: {pro[0]}</h3>
                    <p>العام: {pro[1]}</p>
                    <p>الفصل الدراسي: {pro[2]}</p>
                    <p>المقررات: </p>
                    <ol>
                      {pro[3].map((course, subIndex) => (
                        <li key={subIndex}>{course}</li>
                      ))}
                    </ol>
                    <p>المدفوعات: </p>
                    <ol>
                      {pro[4].map((payment, paymentIndex) => (
                        <li key={paymentIndex}>{payment}</li>
                      ))}
                    </ol>
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
