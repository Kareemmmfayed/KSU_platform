import home from "../../assets/home.png";
import plus from "../../assets/plusb.png";
import trash from "../../assets/trash.png";
import checked from "../../assets/checked.png";
import notchecked from "../../assets/notchecked.png";
import copy from "../../assets/copy.png";
import { COLLEGE } from "../../services/API";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../services/AuthContext";
import { indexAdmin } from "../../services/master/admin";
import { createAdmin } from "../../services/master/admin/create";
import { deleteAdmin } from "../../services/master/admin/delete";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Spinner from "../Applicant/Spinner";
import toast from "react-hot-toast";

function Madmin() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

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

  const [name, setName] = useState([]);
  const [mail, setMail] = useState([]);
  const [pass, setPass] = useState([]);

  const addItem = () => {
    setShow(true);
  };

  const empty = () => {
    setName("");
    setMail("");
    setPass("");
  };

  const cancel = () => {
    empty();
    setShow(false);
  };

  const fetchData = async () => {
    const data = await indexAdmin(token);
    return data;
  };

  const { data: admins, isLoading } = useQuery({
    queryFn: fetchData,
    queryKey: ["admins"],
  });

  const sub = async (e) => {
    e.preventDefault();
    await createAdmin(token, name, mail, pass);
    setShow(false);
  };

  const dele = async () => {
    if (del && selectedCard) {
      await deleteAdmin(token, selectedCard);
      setSelectedCard(null);
      setDelete(!del);
      toast.success("تم الحذف بنجاح");
    } else {
      setDelete(!del);
      setSelectedCard(null);
    }
  };

  const { mutate: create, isCreating } = useMutation({
    mutationFn: (e) => sub(e),
    onSuccess: () => {
      queryClient.invalidateQueries("admins");
      toast.success("تمت الإضافة بنجاح");
    },
    onError: (error) => {
      console.log(error);
      toast.error("حدث خطأ ما");
    },
  });

  const { mutate: delAdmin, isDeleting } = useMutation({
    mutationFn: dele,
    onSuccess: () => {
      queryClient.invalidateQueries("admins");
    },
    onError: (error) => {
      console.log(error);
      toast.error("حدث خطأ ما");
    },
  });

  const copycontent = (content) => {
    navigator.clipboard.writeText(content);
  };

  if (isLoading || isCreating || isDeleting) return <Spinner />;

  return (
    <div className="Madmin">
      <div className="Madmin__in">
        <div className="Madmin__in__top">
          <button onClick={() => navigate("/master/main")}>
            <img src={home} alt="home" />
          </button>
          <button onClick={addItem}>
            <img src={plus} alt="plus" />
          </button>
          <button onClick={delAdmin} disabled={isDeleting}>
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
                      src={admin.id === selectedCard ? checked : notchecked}
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
          <form onSubmit={create}>
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
              <button onClick={() => cancel()}>إلغاء</button>
              <button type="submit" className="btnbtn" disabled={isCreating}>
                إضافة
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Madmin;
