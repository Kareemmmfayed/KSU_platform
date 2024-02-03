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
import { indexAdmin } from "../../services/master/admin";
import { COLLEGE } from "../../services/API";
import { createAdmin } from "../../services/master/admin/create";
import { deleteAdmin } from "../../services/master/admin/delete";

function Madmin() {
  const { token } = useAuth();
  const [admins, setAdmins] = useState([]);
  const [name, setName] = useState([]);
  const [mail, setMail] = useState([]);
  const [pass, setPass] = useState([]);

  const fetchData = async () => {
    const res = await indexAdmin(token);
    const data = await res.json();
    setAdmins(data.data.admins);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const navigate = useNavigate();

  const navtohome = () => {
    navigate("/");
  };

  const [show, setShow] = useState(false);
  const [del, setDelete] = useState(false);
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);

  const toggleCardState = (index) => {
    setSelectedCardIndex(index === selectedCardIndex ? null : index);
  };

  const addItem = () => {
    setShow(true);
  };

  const sub = async (e) => {
    e.preventDefault();
    await createAdmin(token, name, mail, pass);
    setShow(false);
    fetchData();
  };

  const dele = async () => {
    if (del && selectedCardIndex) {
      await deleteAdmin(token, selectedCardIndex);
      setSelectedCardIndex(null);
      setDelete(!del);
      fetchData();
    } else {
      setDelete(!del);
      setSelectedCardIndex(null);
    }
  };

  const copycontent = (content) => {
    navigator.clipboard.writeText(content);
  };

  return (
    <>
      <Header name="< العودة" link="/" />
      <div className="Madmin">
        <div className="Madmin__in">
          <div className="Madmin__in__top">
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
          <div className="Madmin__in__body">
            <div className="cards">
              {admins.map((admin) => (
                <div className={del ? "card delete" : "card"} key={admin.id}>
                  <h2>{admin.name}</h2>
                  <p>البريد الإلكتروني : {admin.email}</p>
                  <p>{COLLEGE.name}</p>
                  {del && (
                    <button onClick={() => toggleCardState(admin.id)}>
                      <img
                        src={
                          admin.id === selectedCardIndex ? checked : notchecked
                        }
                        alt="circle"
                        className="notcopy"
                      />
                    </button>
                  )}
                  {!del && (
                    <button
                      onClick={() =>
                        copycontent(
                          `الإسم: ${admin.name}\nالبريد الإلكتروني : ${admin.email}\n ${COLLEGE.name}`
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
                  type="password"
                  id="password"
                  onChange={(e) => setPass(e.target.value)}
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

export default Madmin;
