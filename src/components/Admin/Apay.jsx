import home from "../../assets/home.png";
import plus from "../../assets/plusb.png";
import trash from "../../assets/trash.png";
import notchecked from "../../assets/notchecked.png";
import checked from "../../assets/checked.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../services/AuthContext";
import { indexPayments } from "../../services/admin/payments/index";
import { createPayment } from "../../services/admin/payments/create";
import { deletePayment } from "../../services/admin/payments/delete";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Spinner from "../Applicant/Spinner";
import toast from "react-hot-toast";

function Apay() {
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

  const addItem = () => {
    setShow(true);
  };

  const cancel = () => {
    setKind("");
    setShow(false);
  };

  const [kind, setKind] = useState();

  const fetchData = async () => {
    const data = await indexPayments(token);
    return data;
  };

  const { data: payments, isLoading } = useQuery({
    queryFn: fetchData,
    queryKey: ["payments"],
  });

  const sub = async (e) => {
    e.preventDefault();
    await createPayment(token, kind);
    setShow(false);
    setKind("");
  };

  const { mutate: subMutation, isSubmitting } = useMutation({
    mutationFn: (e) => sub(e),
    onSuccess: () => {
      queryClient.invalidateQueries(`payments`);
      toast.success("تمت الإضافة بنجاح");
    },
    onError: (error) => {
      console.log(error);
      toast.error("حدث خطأ ما");
    },
  });

  const dele = async () => {
    if (del && selectedCard) {
      await deletePayment(token, selectedCard);
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
      queryClient.invalidateQueries("payments");
    },
    onError: (error) => {
      console.log(error);
      toast.error("حدث خطأ ما");
    },
  });

  if (isLoading || isSubmitting || isDeleting) return <Spinner />;

  return (
    <div className="Apay">
      <div className="Apay__in">
        <div className="Apay__in__top">
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
        <div className="Apay__in__body">
          <div className="cards">
            {payments?.map((e) => (
              <div className={del ? "card delete" : "card"} key={e.id}>
                <p>{e.payment_kind}</p>
                {del && (
                  <button
                    onClick={() => toggleCardState(e.id)}
                    className="this"
                  >
                    <img
                      src={selectedCard === e.id ? checked : notchecked}
                      alt="circle"
                    />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
        {show && (
          <form onSubmit={subMutation}>
            <div>
              <label htmlFor="name">نوع القسط :</label>
              <input
                type="text"
                id="name"
                value={kind}
                onChange={(e) => setKind(e.target.value)}
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

export default Apay;
