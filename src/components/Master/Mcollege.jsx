import Header from "../Header";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import home from "../../assets/home.png";
import plus from "../../assets/plusb.png";
import trash from "../../assets/trash.png";
import checked from "../../assets/checked.png";
import notchecked from "../../assets/notchecked.png";
import col from "../../assets/Collage.png";
import { indexColleges } from "../../services/master/college/index";
import { useAuth } from "../../services/AuthContext";
import { createCollege } from "../../services/master/college/create";
import { deleteCollege } from "../../services/master/college/delete";

function Mcollege() {
  const { token } = useAuth();
  const [programs, setPrograms] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [del, setDelete] = useState(false);

  const fetchPrograms = async () => {
    const res = await indexColleges(token);
    const data = await res.json();
    setPrograms(data.data.collages);
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  const navigate = useNavigate();

  const navtohome = () => {
    navigate("/master/main");
  };

  const toggleCardState = (id) => {
    if (del) {
      setSelectedCard(id);
    }
  };

  const addItem = () => {
    setShow(true);
  };

  const [show, setShow] = useState(false);
  const [faculty, setFaculty] = useState("");
  const [college, setCollege] = useState("");

  const sub = async (e) => {
    e.preventDefault();
    await createCollege(token, faculty, college);
    setShow(false);
    setFaculty("");
    setCollege("");
    fetchPrograms();
  };

  const dele = async () => {
    if (del && selectedCard) {
      await deleteCollege(token, selectedCard);
      setSelectedCard(null);
      fetchPrograms();
    } else {
      setDelete(!del);
      setSelectedCard(null);
    }
  };

  return (
    <>
      <Header name="< العودة" link="/" />
      <div className="Mcollege">
        <div className="Mcollege__in">
          <div className="Mcollege__in__top">
            <button onClick={navtohome}>
              <img src={home} alt="home" />
            </button>
            <button onClick={addItem}>
              <img src={plus} alt="plus" />
            </button>
            <button onClick={dele}>
              <img src={trash} alt="trash" />
            </button>
          </div>
          <div className="Mcollege__in__body">
            <div className="cards">
              {programs.map((college) => (
                <div
                  className={del ? "card delete" : "card"}
                  key={college.id}
                  onClick={() => toggleCardState(college.id)}
                >
                  <img src={col} alt="college" />
                  <h2>{college.name}</h2>
                  {del && (
                    <button>
                      <img
                        src={selectedCard === college.id ? checked : notchecked}
                        alt="circle"
                        className="notcopy"
                      />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
          {show && (
            <form onSubmit={sub}>
              <div>
                <label htmlFor="name">اسم الكلية :</label>
                <input
                  type="text"
                  id="name"
                  value={faculty}
                  onChange={(e) => setFaculty(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="faculty">اسم الجامعة :</label>
                <input
                  type="text"
                  id="faculty"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                />
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

export default Mcollege;
