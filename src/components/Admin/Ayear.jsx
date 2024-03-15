import home from "../../assets/home.png";
import plus from "../../assets/plusb.png";
import trash from "../../assets/trash.png";
import notchecked from "../../assets/notchecked.png";
import checked from "../../assets/checked.png";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../services/AuthContext";
import { indexLevel } from "../../services/admin/level/index";
import { createLevel } from "../../services/admin/level/create";
import { deleteLevel } from "../../services/admin/level/delete";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Spinner from "../Applicant/Spinner";
import toast from "react-hot-toast";

export default function Ayear() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { diplomaId } = useParams();

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

  const [level, setLevel] = useState("");

  const addItem = () => {
    setShow(true);
  };

  const cancel = () => {
    setLevel("");
    setShow(false);
  };

  const fetchData = async () => {
    const data = await indexLevel(token, diplomaId);
    return data;
  };

  const { data: levels, isLoading } = useQuery({
    queryFn: fetchData,
    queryKey: [`level/${diplomaId}`],
  });

  const sub = async (e) => {
    e.preventDefault();
    await createLevel(token, diplomaId, level);
    setShow(false);
    setLevel("");
  };

  const { mutate: subMutation, isSubmitting } = useMutation({
    mutationFn: (e) => sub(e),
    onSuccess: () => {
      queryClient.invalidateQueries(`level/${diplomaId}`);
      toast.success("تمت الإضافة بنجاح");
    },
    onError: (error) => {
      console.log(error);
      toast.error("حدث خطأ ما");
    },
  });

  const dele = async () => {
    if (del && selectedCard) {
      await deleteLevel(token, diplomaId, selectedCard);
      setSelectedCard(null);
      setDelete(!del);
      toast.success("تم الحذف بنجاح");
    } else {
      setDelete(!del);
      setSelectedCard(null);
    }
  };

  const { mutate: deleteMutation, isDeleting } = useMutation({
    mutationFn: dele,
    onSuccess: () => {
      queryClient.invalidateQueries(`level/${diplomaId}`);
    },
    onError: (error) => {
      console.log(error);
      toast.error("حدث خطأ ما");
    },
  });

  if (isLoading || isDeleting || isSubmitting) return <Spinner />;

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
          <button onClick={deleteMutation}>
            <img src={trash} alt="trash" />
          </button>
        </div>
        <div className="Ayear__in__body">
          <div className="cards">
            {levels?.map((lvl) => (
              <div className={del ? "card delete" : "card"} key={lvl.id}>
                <p>{lvl.name}</p>
                {del ? (
                  <button onClick={() => toggleCardState(lvl.id)}>
                    <img
                      src={selectedCard === lvl.id ? checked : notchecked}
                      alt="circle"
                    />
                  </button>
                ) : (
                  <button
                    onClick={() => navigate(`${lvl.id}/semesters`)}
                  ></button>
                )}
              </div>
            ))}
          </div>
        </div>
        {show && (
          <form onSubmit={subMutation}>
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
              <button onClick={() => cancel()}>إلغاء</button>
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
