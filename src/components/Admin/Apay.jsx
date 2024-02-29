import home from "../../assets/home.png";
import plus from "../../assets/plusb.png";
import notchecked from "../../assets/notchecked.png";
import checked from "../../assets/checked.png";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../../services/AuthContext";
import { indexPayments } from "../../services/admin/payments/index";
import { createPayment } from "../../services/admin/payments/create";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Spinner from "../Applicant/Spinner";

function Apay({ payId }) {
  const navigate = useNavigate();
  const { token } = useAuth();

  // const [payments, setPayments] = useState([]);
  const [kind, setKind] = useState();

  const [show, setShow] = useState(false);
  const [del, setDelete] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const queryClient = useQueryClient();

  const fetchData = async () => {
    const data = await indexPayments(token, payId);
    setPayments(data);
  };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  const { data: payments, isLoading } = useQuery({
    queryFn: fetchData,
    queryKey: ["payments"],
  });

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
    await createPayment(token, kind, payId);
    setShow(false);
    // fetchData();
  };

  const { mutate: addPayment, isPending: isAdding } = useMutation({
    mutationFn: (e) => sub(e),
    onSuccess: () => {
      queryClient.invalidateQueries("payments");
      toast.success("تمت الإضافة بنجاح");
    },
    onError: (error) => {
      console.log(error);
      toast.error("حدث خطأ ما");
    },
  });

  if (isLoading || isAdding) return <Spinner />;

  return (
    <div className="Apay">
      <div className="Apay__in">
        <div className="Apay__in__top">
          <button onClick={() => navigate("/")}>
            <img src={home} alt="home" />
          </button>
          <button onClick={addItem}>
            <img src={plus} alt="plus" />
          </button>
        </div>
        <div className="Apay__in__body">
          <div className="cards">
            {payments.map((pay) => (
              <div className={del ? "card delete" : "card"} key={pay.id}>
                <p>{pay.payment_kind}</p>
                {del && (
                  <button onClick={() => toggleCardState(pay.id)}>
                    <img
                      src={selectedCard === pay.id ? checked : notchecked}
                      alt="circle"
                    />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
        {show && (
          <form onSubmit={addPayment}>
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

export default Apay;
