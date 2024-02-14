import Header from "../Header";
import Footer from "../Footer";
import home from "../../assets/home.png";
import plus from "../../assets/plusb.png";
import trash from "../../assets/trash.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import notchecked from "../../assets/notchecked.png";
import checked from "../../assets/checked.png";

export default function Ayear() {
  const years = [
    ["الفصل الصيفي", "2023-2024"],
    ["الفصل الصيفي", "2023-2024"],
    ["الفصل الصيفي", "2023-2024"],
  ];

  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [del, setDelete] = useState(false);
  const [cardStates, setCardStates] = useState(Array(years.length).fill(false));

  const toggleCardState = (index) => {
    setCardStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };

  const addItem = () => {
    setShow(true);
  };

  const sub = () => {};

  const dele = () => {
    setDelete(true);
  };

  return (
    <>
      <Header name="< العودة" link="/" />
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
              {years.map((diploma, index) => (
                <div className={del ? "card delete" : "card"} key={index}>
                  <p>{diploma[0]}</p>
                  <p>الفصل الدراسي</p>
                  <p>{diploma[1]}</p>
                  {del && (
                    <button onClick={() => toggleCardState(index)}>
                      <img
                        src={cardStates[index] ? checked : notchecked}
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
                <label htmlFor="name">العام الدراسي :</label>
                <input type="text" id="name" />
              </div>
              <div>
                <label htmlFor="faculty">الفصل الدراسي :</label>
                <input type="text" id="faculty" />
              </div>
              <div>
                <label htmlFor="intro">تاريخ بدأ الدراسة :</label>
                <input type="text" id="intro" />
              </div>
              <div>
                <label htmlFor="req">تاريخ نهاية الدراسة :</label>
                <input type="text" id="req" />
              </div>
              <div>
                <label htmlFor="time">ملاحظات :</label>
                <input type="text" id="time" className="special" />
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
