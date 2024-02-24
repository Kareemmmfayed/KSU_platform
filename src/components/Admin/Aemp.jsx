import Header from "../Header";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import home from "../../assets/home.png";
import plus from "../../assets/plusb.png";
import trash from "../../assets/trash.png";
import checked from "../../assets/checked.png";
import notchecked from "../../assets/notchecked.png";
import copy from "../../assets/copy.png";
import { useAuth } from "../../services/AuthContext";
import { indexEmployee } from "../../services/admin/employee";
import { createEmployee } from "../../services/admin/employee/create";
import { deleteEmployee } from "../../services/admin/employee/delete";

function Aemp() {
  const { token } = useAuth();
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [employees, setEmployees] = useState([]);

  const fetchData = async () => {
    const res = await indexEmployee(token);
    setEmployees(res);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [del, setDelete] = useState(false);
  const [cardStates, setCardStates] = useState(null);

  const toggleCardState = (id) => {
    if (del) {
      setCardStates(id);
    }
  };

  const addItem = () => {
    setShow(true);
  };

  const sub = async (e) => {
    e.preventDefault();
    await createEmployee(token, name, mail, password);
    setShow(false);
    fetchData();
  };

  const dele = async () => {
    if (del && cardStates) {
      await deleteEmployee(token, cardStates);
      setCardStates(null);
      setDelete(!del);
      fetchData();
    } else {
      setDelete(!del);
      setCardStates(null);
    }
  };

  const copycontent = (content) => {
    navigator.clipboard.writeText(content);
  };

  return (
    <>
      <div className="Aemp">
        <div className="Aemp__in">
          <div className="Aemp__in__top">
            <button onClick={() => navigate("/admin/main")}>
              <img src={home} alt="home" />
            </button>
            <button onClick={addItem}>
              <img src={plus} alt="plus" />
            </button>
            <button onClick={dele}>
              <img src={trash} alt="trash" />
            </button>
          </div>
          <div className="Aemp__in__body">
            <div className="cards">
              {employees.map((emp) => (
                <div
                  className={del ? "card delete" : "card"}
                  key={emp.id}
                  onClick={() => toggleCardState(emp.id)}
                >
                  <h2>{emp.name}</h2>
                  <p>البريد الإلكتروني : {emp.email}</p>
                  {del && (
                    <button onClick={() => toggleCardState(emp.id)}>
                      <img
                        src={cardStates === emp.id ? checked : notchecked}
                        alt="circle"
                        className="notcopy"
                      />
                    </button>
                  )}
                  {!del && (
                    <button
                      onClick={() =>
                        copycontent(
                          `الاسم: ${emp[0]}\nالبريد الإلكتروني: ${emp[1]}\nكلمة المرور: ${emp[2]}`
                        )
                      }
                    >
                      <img src={copy} alt="circle" className="copy" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
          {show && (
            <form onSubmit={sub}>
              <div>
                <label htmlFor="name">الاسم الرباعي :</label>
                <input
                  type="text"
                  id="name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="mail">البريد الالكتروني :</label>
                <input
                  type="text"
                  id="mail"
                  onChange={(e) => setMail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password">كلمة المرور :</label>
                <input
                  type="text"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <button className="btnbtn">إضافة</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
}

export default Aemp;
