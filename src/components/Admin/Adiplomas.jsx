import Header from "../Header";
import Footer from "../Footer";
import home from "../../assets/home.png";
import plus from "../../assets/plusb.png";
import trash from "../../assets/trash.png";
import notchecked from "../../assets/notchecked.png";
import checked from "../../assets/checked.png";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../services/AuthContext";
import { indexPrograms } from "../../services/admin/program";
import { showAdmin } from "../../services/admin/me/show";
import { createProgram } from "../../services/admin/program/create";
import { deleteProgram } from "../../services/admin/program/delete";
import { showProgram } from "../../services/admin/program/show";

function Adiplomas() {
  const { token } = useAuth();
  const [programs, setPrograms] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [show, setShow] = useState(false);
  const [del, setDelete] = useState(false);
  const [name, setName] = useState("");
  const [faculty, setFaculty] = useState("");
  const [intro, setIntro] = useState("");
  const [req, setReq] = useState("");
  const [time, setTime] = useState("");
  const navigate = useNavigate();

  const fetchData = async () => {
    const meRes = await showAdmin(token);
    const meData = await meRes.json();
    const res = await indexPrograms(token, meData.data.adminData.collage_id);
    const data = await res.json();
    setPrograms(data.data.programs);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const navtohome = () => {
    navigate("/admin/main");
  };

  const toggleCardState = (id) => {
    if (del) {
      setSelectedCard(id);
    }
  };

  const addItem = () => {
    setShow(true);
  };

  const sub = async (e) => {
    e.preventDefault();
    const res = await showAdmin(token);
    const data = await res.json();
    await createProgram(
      token,
      data.data.adminData.collage_id,
      name,
      intro,
      100,
      100,
      "2023-08-29T12:00:00",
      "2023-08-29T12:00:00",
      100
    );
    setShow(false);
    fetchData();
  };

  const dele = async () => {
    if (del && selectedCard) {
      const res = await showAdmin(token);
      const data = await res.json();
      await deleteProgram(token, data.data.adminData.collage_id, selectedCard);
      setSelectedCard(null);
      setDelete(!del);
      fetchData();
    } else {
      setDelete(!del);
      setSelectedCard(null);
    }
  };

  const collegeName = async (program) => {
    const dres = await showAdmin(token);
    const ddata = await dres.json();
    const res = await showProgram(
      token,
      ddata.data.adminData.collage_id,
      program.id
    );
    const data = await res.json();
    return data.data.program.name;
  };

  return (
    <>
      <Header name="< العودة" link="/" />
      <div className="Adiplomas">
        <div className="Adiplomas__in">
          <div className="Adiplomas__in__top">
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
          <div className="Adiplomas__in__body">
            <div className="cards">
              {programs.map((program) => (
                <div
                  className={del ? "card delete" : "card"}
                  key={program.id}
                  onClick={() => toggleCardState(program.id)}
                >
                  <h2>{program.name}</h2>
                  <p>{collegeName(program)}</p>
                  {del && (
                    <button>
                      <img
                        src={selectedCard === program.id ? checked : notchecked}
                        alt="circle"
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
                <label htmlFor="name">اسم البرنامج الدراسي :</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="faculty">الكلية الخاصة بالبرنامج :</label>
                <input
                  type="text"
                  id="faculty"
                  value={faculty}
                  onChange={(e) => setFaculty(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="intro">مقدمة عن البرنامج :</label>
                <input
                  type="text"
                  id="intro"
                  className="special"
                  value={intro}
                  onChange={(e) => setIntro(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="req">متطلبات القبول بالبرنامج :</label>
                <input
                  type="text"
                  id="req"
                  className="special"
                  value={req}
                  onChange={(e) => setReq(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="time">مدة البرنامج :</label>
                <input
                  type="text"
                  id="time"
                  className="special"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
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
        <Footer />
      </div>
    </>
  );
}

export default Adiplomas;
