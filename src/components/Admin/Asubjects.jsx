import Header from "../Header";
import Footer from "../Footer";
import home from "../../assets/home.png";
import plus from "../../assets/plusb.png";
import trash from "../../assets/trash.png";
import checked from "../../assets/checked.png";
import notchecked from "../../assets/notchecked.png";
import copy from "../../assets/copy.png";
import { useAuth } from "../../services/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { indexCourse } from "../../services/admin/course/index";
import { createCourse } from "../../services/admin/course/create";
import { deleteCourse } from "../../services/admin/course/delete";

function Asubjects({ AdminDiplomaId, levelId, semesterId }) {
  const { token } = useAuth();
  const [subjects, setSubjects] = useState([]);

  const navigate = useNavigate();

  const fetchData = async () => {
    const res = await indexCourse(token);
    setSubjects(res);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [show, setShow] = useState(false);
  const [del, setDelete] = useState(false);
  const [cardStates, setCardStates] = useState(null);

  const toggleCardState = (id) => {
    if (del) {
      if (selectedCard === id) {
        setSelectedCard(null);
      } else {
        setSelectedCard(id);
      }
    }
  };

  const addItem = () => {
    setShow(true);
  };

  const sub = async (e) => {
    e.preventDefault();
    await createCourse(
      token,
      AdminDiplomaId,
      levelId,
      semesterId,
      name,
      hours,
      code
    );
    setShow(false);
    fetchData();
  };

  const dele = async () => {
    if (del && selectedCard) {
      await deleteCourse(
        token,
        AdminDiplomaId,
        levelId,
        semesterId,
        selectedCard
      );
      setSelectedCard(null);
      setDelete(!del);
      fetchData();
    } else {
      setDelete(!del);
      setSelectedCard(null);
    }
  };

  const copycontent = (content) => {
    navigator.clipboard.writeText(content);
  };

  return (
    <>
      <Header name="< العودة" link="/" />
      <div className="Asubjects">
        <div className="Asubjects__in">
          <div className="Asubjects__in__top">
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
          <div className="Asubjects__in__body">
            <div className="cards">
              {subjects.map((sub) => (
                <div className={del ? "card delete" : "card"} key={sub.id}>
                  <h2>إسم المقرر : {sub.name}</h2>
                  <p>كود المقرر : {sub.code}</p>
                  <p>عدد الساعات المعتمدة : {credit_hours}</p>
                  {del && (
                    <button onClick={() => toggleCardState(index)}>
                      <img
                        src={electedCard === year.id ? checked : notchecked}
                        alt="circle"
                        className="notcopy"
                      />
                    </button>
                  )}
                  {!del && (
                    <button
                      onClick={() =>
                        copycontent(
                          `إسم المقرر: ${emp[0]}\nكود المقرر: ${emp[1]}\nعدد الساعات المعتمدة: ${emp[2]}\n${emp[3]}`
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
                <label htmlFor="name">اسم المقرر :</label>
                <input type="text" id="name" />
              </div>
              <div>
                <label htmlFor="faculty">كود المقرر :</label>
                <input type="text" id="faculty" />
              </div>
              <div>
                <label htmlFor="mail">عدد الساعات المعتمدة :</label>
                <input type="text" id="mail" />
              </div>
              <div>
                <label htmlFor="password">مستوي المقرر :</label>
                <input type="text" id="password" />
              </div>
              <div>
                <button className="btnbtn">إضافة</button>
              </div>
            </form>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Asubjects;
