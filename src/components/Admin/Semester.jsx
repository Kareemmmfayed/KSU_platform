import Header from "../Header";
import Footer from "../Footer";
import home from "../../assets/home.png";
import plus from "../../assets/plusb.png";
import trash from "../../assets/trash.png";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import notchecked from "../../assets/notchecked.png";
import checked from "../../assets/checked.png";
import { useAuth } from "../../services/AuthContext";
import { indexSemester } from "../../services/admin/semester/index";
import { createSemester } from "../../services/admin/semester/create";
import { deleteSemester } from "../../services/admin/semester/delete";

function Semester({ AdminDiplomaId, levelId, handleSemesterId }) {
  const { token } = useAuth();
  const [semesters, setSemesters] = useState([]);
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const fetchData = async () => {
    const data = await indexSemester(token, AdminDiplomaId, levelId);
    setSemesters(data);
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

  const sub = async (e) => {
    e.preventDefault();
    await createSemester(token, AdminDiplomaId, levelId, name);
    setShow(false);
    fetchData();
  };

  const dele = async () => {
    if (del && selectedCard) {
      await deleteSemester(token, AdminDiplomaId, levelId, selectedCard);
      setSelectedCard(null);
      setDelete(!del);
      fetchData();
    } else {
      setDelete(!del);
      setSelectedCard(null);
    }
  };

  const handleClick = (id) => {
    handleSemesterId(id);
    navigate("/admin/subjects");
  };

  return (
    <>
      <div className="Ayear">
        <div className="Ayear__in">
          <div className="Ayear__in__top">
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
          <div className="Ayear__in__body">
            <div className="cards">
              {semesters.map((year) => (
                <div className={del ? "card delete" : "card"} key={year.id}>
                  <p>{year.name}</p>
                  {del ? (
                    <button onClick={() => toggleCardState(year.id)}>
                      <img
                        src={selectedCard === year.id ? checked : notchecked}
                        alt="circle"
                      />
                    </button>
                  ) : (
                    <button onClick={() => handleClick(year.id)}></button>
                  )}
                </div>
              ))}
            </div>
          </div>
          {show && (
            <form onSubmit={sub}>
              <div>
                <label htmlFor="name">إسم السمستر :</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <button type="submit" className="btnbtn">
                  إضافة
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
}

export default Semester;
