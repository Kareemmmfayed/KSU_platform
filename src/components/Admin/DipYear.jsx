import home from "../../assets/home.png";
import plus from "../../assets/plusb.png";
import trash from "../../assets/trash.png";
import notchecked from "../../assets/notchecked.png";
import checked from "../../assets/checked.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../services/AuthContext";
import { indexYears } from "../../services/admin/year/index";
import { createYear } from "../../services/admin/year/create";
import { deleteYear } from "../../services/admin/year/delete";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Spinner from "../Applicant/Spinner";
import toast from "react-hot-toast";

function DipYear() {
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

  const [name, setName] = useState("");

  const addItem = () => {
    setShow(true);
  };

  const cancel = () => {
    setName("");
    setShow(false);
  };

  const fetchData = async () => {
    const data = await indexYears(token);
    return data;
  };

  const { data: years, isLoading } = useQuery({
    queryFn: fetchData,
    queryKey: ["Dyears"],
  });

  const sub = async (e) => {
    e.preventDefault();
    await createYear(token, name);
    setShow(false);
    setName("");
  };

  const dele = async () => {
    if (del && selectedCard) {
      await deleteYear(token, selectedCard);
      setSelectedCard(null);
      setDelete(!del);
      toast.success("تم الحذف بنجاح");
    } else {
      setDelete(!del);
      setSelectedCard(null);
    }
  };

  const { mutate: subMutation, isSubmitting } = useMutation({
    mutationFn: (e) => sub(e),
    onSuccess: () => {
      queryClient.invalidateQueries("Dyears");
      toast.success("تمت الإضافة بنجاح");
    },
    onError: (error) => {
      console.log(error);
      toast.error("حدث خطأ ما");
    },
  });

  const { mutate: deleteMutation, isDeleting } = useMutation({
    mutationFn: dele,
    onSuccess: () => {
      queryClient.invalidateQueries("Dyears");
    },
    onError: (error) => {
      console.log(error);
      toast.error("حدث خطأ ما");
    },
  });

  if (isLoading || isDeleting || isSubmitting) return <Spinner />;
  return (
    <div className="DipYear">
      <div className="DipYear__in">
        <div className="DipYear__in__top">
          <button onClick={() => navigate("/admin/main")}>
            <img src={home} alt="home" />
          </button>
          <button onClick={addItem}>
            <img src={plus} alt="plus" />
          </button>
          <button onClick={deleteMutation} disabled={isDeleting}>
            <img src={trash} alt="trash" />
          </button>
        </div>
        <div className="Adiplomas__in__body">
          <div className="cards">
            {years?.map((year) => (
              <div className={del ? "card delete" : "card"} key={year.id}>
                <h2>{year.name}</h2>
                {del ? (
                  <button onClick={() => toggleCardState(year.id)}>
                    <img
                      src={selectedCard === year.id ? checked : notchecked}
                      alt="circle"
                    />
                  </button>
                ) : (
                  <button></button>
                )}
              </div>
            ))}
          </div>
        </div>
        {show && (
          <form onSubmit={subMutation}>
            <div>
              <label htmlFor="name">العام الدراسي :</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <button onClick={() => cancel()}>إلغاء</button>
              <button type="submit" className="btnbtn" disabled={isSubmitting}>
                إضافة
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default DipYear;
