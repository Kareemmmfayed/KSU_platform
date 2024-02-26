import home from "../../assets/home.png";
import plus from "../../assets/plusb.png";
import trash from "../../assets/trash.png";
import checked from "../../assets/checked.png";
import notchecked from "../../assets/notchecked.png";
import copy from "../../assets/copy.png";
import lect from "../../assets/lect.png";
import { useAuth } from "../../services/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { indexCourse } from "../../services/admin/course/index";
import { createCourse } from "../../services/admin/course/create";
import { deleteCourse } from "../../services/admin/course/delete";
import { indexLecturer } from "../../services/admin/lecturer/index";
import { AssignCourseToAdmin } from "../../services/admin/course/assignCourseToAdmin";

function Asubjects({ AdminDiplomaId, levelId, semesterId }) {
  const { token } = useAuth();
  const [subjects, setSubjects] = useState([]);
  const [lecturers, setLecturers] = useState([]);

  const navigate = useNavigate();

  const fetchData = async () => {
    const res = await indexCourse(token, AdminDiplomaId, levelId, semesterId);
    setSubjects(res);

    const data = await indexLecturer(token);
    setLecturers(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [show, setShow] = useState(false);
  const [del, setDelete] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

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

  const [name, setName] = useState("");
  const [hours, setHours] = useState("");
  const [code, setCode] = useState("");

  const sub = async (e) => {
    e.preventDefault();
    await createCourse(
      token,
      AdminDiplomaId,
      levelId,
      semesterId,
      name,
      Number(hours),
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

  const [select, setSelect] = useState(false);
  const [subId, setSubId] = useState("");
  const [lecturerId, setLecturerId] = useState("");

  const handleSelect = (id) => {
    setSelect(true);
    setSubId(id);
  };

  const subL = async (e) => {
    e.preventDefault();
    await AssignCourseToAdmin(
      token,
      AdminDiplomaId,
      levelId,
      semesterId,
      subId,
      lecturerId
    );
  };

  return (
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
                <p>عدد الساعات المعتمدة : {sub.credit_hours}</p>
                {del && (
                  <button onClick={() => toggleCardState(index)}>
                    <img
                      src={selectedCard === year.id ? checked : notchecked}
                      alt="circle"
                      className="notcopy"
                    />
                  </button>
                )}
                {!del && (
                  <>
                    <button
                      onClick={() =>
                        copycontent(
                          `إسم المقرر: ${sub.name}\nكود المقرر: ${sub.code}\nعدد الساعات المعتمدة: ${sub.credit_hours}`
                        )
                      }
                    >
                      <img src={copy} alt="circle" />
                    </button>
                    <button onClick={() => handleSelect(sub.id)}>
                      <img src={lect} alt="Pick a lecturer" />
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
        {show && (
          <form onSubmit={sub}>
            <div>
              <label htmlFor="name">اسم المقرر :</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="faculty">كود المقرر :</label>
              <input
                type="text"
                id="faculty"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="mail">عدد الساعات المعتمدة :</label>
              <input
                type="text"
                id="mail"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                required
              />
            </div>
            <div>
              <button onClick={() => setShow(false)}>إلغاء</button>
              <button className="btnbtn">إضافة</button>
            </div>
          </form>
        )}
        {select && (
          <form>
            <h2>إختر المحاضر المناسب :</h2>
            <ul>
              {lecturers.map((lect) => (
                <li key={lect.id}>
                  <input
                    type="radio"
                    name="lecturer"
                    id={`lect${lect.id}`}
                    onChange={() => setLecturerId(lect.id)}
                  />
                  <label htmlFor={`lect${lect.id}`}>{lect.name}</label>
                </li>
              ))}
            </ul>
            <div>
              <button onClick={() => setSelect(false)}>إلغاء</button>
              <button className="btnbtn" onClick={subL}>
                إضافة
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Asubjects;
