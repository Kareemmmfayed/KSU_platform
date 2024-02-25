import home from "../../assets/home.png";
import plus from "../../assets/plusb.png";
import trash from "../../assets/trash.png";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import notchecked from "../../assets/notchecked.png";
import checked from "../../assets/checked.png";
import { useAuth } from "../../services/AuthContext";
import { indexLevel } from "../../services/admin/level/index";
import { createLevel } from "../../services/admin/level/create";
import { deleteLevel } from "../../services/admin/level/delete";

export default function Ayear({ AdminDiplomaId, handleLevelId }) {
  const { token } = useAuth();
  const [years, setYears] = useState([]);
  const [level, setLevel] = useState("");

  const navigate = useNavigate();

  const fetchData = async () => {
    const data = await indexLevel(token, AdminDiplomaId);
    setYears(data);
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
    await createLevel(token, AdminDiplomaId, level);
    setShow(false);
    fetchData();
  };

  const dele = async () => {
    if (del && selectedCard) {
      await deleteLevel(token, AdminDiplomaId, selectedCard);
      setSelectedCard(null);
      setDelete(!del);
      fetchData();
    } else {
      setDelete(!del);
      setSelectedCard(null);
    }
  };

  const handleClick = (id) => {
    handleLevelId(id);
    navigate("/admin/semesters");
  };

  return (
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
            {years.map((year) => (
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
              <label htmlFor="name">إسم المستوي :</label>
              <input
                type="text"
                id="name"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
              />
            </div>
            <div>
              <button onClick={() => setShow(false)}>إلغاء</button>
              <button type="submit" className="btnbtn">
                إضافة
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
