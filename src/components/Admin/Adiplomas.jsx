import home from "../../assets/home.png";
import plus from "../../assets/plusb.png";
import trash from "../../assets/trash.png";
import notchecked from "../../assets/notchecked.png";
import checked from "../../assets/checked.png";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../services/AuthContext";
import { indexPrograms } from "../../services/admin/program";
import { createProgram } from "../../services/admin/program/create";
import { deleteProgram } from "../../services/admin/program/delete";
import { useMutation, useQuery } from "@tanstack/react-query";
import Spinner from "../Applicant/Spinner";

function Adiplomas({ handleAdminDiplomaId }) {
  const { token } = useAuth();
  // const [programs, setPrograms] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [show, setShow] = useState(false);
  const [del, setDelete] = useState(false);
  const [name, setName] = useState("");
  const [intro, setIntro] = useState("");
  const [stime, setStime] = useState("");
  const [ctime, setCtime] = useState("");
  const navigate = useNavigate();

  const fetchData = async () => {
    const res = await indexPrograms(token);
    // setPrograms(res);
    return res;
  };

  const { data: programs, isLoading } = useQuery({
    queryFn: fetchData,
    queryKey: ["programs"],
  });

  // setPrograms(data);

  // useEffect(() => {
  //   fetchData();
  // }, []);

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
    await createProgram(
      token,
      name,
      intro,
      `${stime}T12:00:00`,
      `${ctime}T12:00:00`
    );
    setShow(false);
    fetchData();
  };

  const dele = async () => {
    if (del && selectedCard) {
      await deleteProgram(token, selectedCard);
      setSelectedCard(null);
      setDelete(!del);
      fetchData();
    } else {
      setDelete(!del);
      setSelectedCard(null);
    }
  };

  const { mutate: subMutation, isSubmitting } = useMutation({
    mutationFn: (e) => sub(e),
    onError: (error) => {
      console.log(error);
    },
  });

  const { mutate: deleteMutation, isDeleting } = useMutation({
    mutationFn: dele,
    onError: (error) => {
      console.log(error);
    },
  });

  const handleClick = (id) => {
    handleAdminDiplomaId(id);
    navigate("/admin/years");
  };

  if (isLoading || isDeleting || isSubmitting) return <Spinner />;

  return (
    <div className="Adiplomas">
      <div className="Adiplomas__in">
        <div className="Adiplomas__in__top">
          <button onClick={() => navigate("/admin/main")}>
            <img src={home} alt="home" />
          </button>
          <button onClick={addItem}>
            <img src={plus} alt="plus" />
          </button>
          <button onClick={deleteMutation}>
            <img src={trash} alt="trash" />
          </button>
        </div>
        <div className="Adiplomas__in__body">
          <div className="cards">
            {programs.map((program) => (
              <div className={del ? "card delete" : "card"} key={program.id}>
                <h2>{program.name}</h2>
                {del ? (
                  <button onClick={() => toggleCardState(program.id)}>
                    <img
                      src={selectedCard === program.id ? checked : notchecked}
                      alt="circle"
                    />
                  </button>
                ) : (
                  <button onClick={() => handleClick(program.id)}></button>
                )}
              </div>
            ))}
          </div>
        </div>
        {show && (
          <form onSubmit={subMutation}>
            <div>
              <label htmlFor="name">اسم البرنامج الدراسي :</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="intro">مقدمة عن البرنامج :</label>
              <input
                type="text"
                id="intro"
                value={intro}
                onChange={(e) => setIntro(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="time">موعد البداية :</label>
              <input
                type="text"
                id="time"
                value={stime}
                onChange={(e) => setStime(e.target.value)}
                placeholder="ex :- 2023-08-29"
                required
              />
            </div>
            <div>
              <label htmlFor="time">موعد النهاية :</label>
              <input
                type="text"
                id="time"
                value={ctime}
                onChange={(e) => setCtime(e.target.value)}
                placeholder="ex :- 2023-08-29"
                required
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

export default Adiplomas;
