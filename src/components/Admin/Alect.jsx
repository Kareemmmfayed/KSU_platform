import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import home from "../../assets/home.png";
import plus from "../../assets/plusb.png";
import trash from "../../assets/trash.png";
import checked from "../../assets/checked.png";
import notchecked from "../../assets/notchecked.png";
import copy from "../../assets/copy.png";
import { useAuth } from "../../services/AuthContext";
import { indexLecturer } from "../../services/admin/lecturer/index";
import { createLecturer } from "../../services/admin/lecturer/create";
import { deleteLecturer } from "../../services/admin/lecturer/delete";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Spinner from "../Applicant/Spinner";

function Alect() {
  const { token } = useAuth();

  // const [lecturers, setLecturers] = useState([]);
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const fetchData = async () => {
    const res = await indexLecturer(token);
    setLecturers(res);
  };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  const { data: lecturers, isLoading } = useQuery({
    queryFn: fetchData,
    queryKey: ["lecturers"],
  });

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
    await createLecturer(token, name, mail, password);
    setShow(false);
    // fetchData();
  };

  const dele = async () => {
    if (del && cardStates) {
      await deleteLecturer(token, cardStates);
      setCardStates(null);
      setDelete(!del);
      toast.success("تم الحذف بنجاح");
      // fetchData();
    } else {
      setDelete(!del);
      setCardStates(null);
    }
  };

  const { mutate: addLecturer, isAdding } = useMutation({
    mutationFn: (e) => sub(e),
    onSuccess: () => {
      queryClient.invalidateQueries("lecturers");
      toast.success("تم الحذف بنجاح");
    },
    onError: (error) => {
      console.log(error);
      toast.error("حدث خطأ ما");
    },
  });
  const { mutate: deleteMutation, isDeleting } = useMutation({
    mutationFn: dele,
    onSuccess: () => {
      queryClient.invalidateQueries("lecturers");
    },
    onError: (error) => {
      console.log(error);
      toast.error("حدث خطأ ما");
    },
  });

  const copycontent = (content) => {
    navigator.clipboard.writeText(content);
  };

  if (isLoading || isAdding || isDeleting) return <Spinner />;

  return (
    <div className="Alect">
      <div className="Alect__in">
        <div className="Alect__in__top">
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
        <div className="Alect__in__body">
          <div className="cards">
            {lecturers?.map((lec) => (
              <div className={del ? "card delete" : "card"} key={lec.id}>
                <h2>الدكتور : {lec.name}</h2>
                <p>البريد الإلكتروني : {lec.email}</p>
                {del && (
                  <button onClick={() => toggleCardState(lec.id)}>
                    <img
                      src={cardStates === lec.id ? checked : notchecked}
                      alt="circle"
                      className="notcopy"
                    />
                  </button>
                )}
                {!del && (
                  <button
                    onClick={() =>
                      copycontent(
                        `الاسم: ${lec.name}\nالبريد الإلكتروني: ${lec.email}`
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
          <form onSubmit={addLecturer}>
            <div>
              <label htmlFor="name">اسم المحاضر :</label>
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
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <button onClick={() => setShow(false)}>إلغاء</button>
              <button className="btnbtn">إضافة</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Alect;
