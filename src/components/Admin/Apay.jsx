import home from "../../assets/home.png";
import plus from "../../assets/plusb.png";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../../services/AuthContext";
import { indexPayments } from "../../services/admin/payments/index";
import { createPayment } from "../../services/admin/payments/create";
import toast from "react-hot-toast";

function Apay({ payId }) {
  const { token } = useAuth();
  const navigate = useNavigate();
  // const queryClient = useQueryClient();

  const [show, setShow] = useState(false);

  const [payments, setPayments] = useState([]);

  const addItem = () => {
    setShow(true);
  };

  const cancel = () => {
    setKind("");
    setShow(false);
  };

  const [kind, setKind] = useState();

  const fetchData = async () => {
    const data = await indexPayments(token, payId);
    setPayments(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // const { data: payments, isLoading } = useQuery({
  //   queryFn: fetchData,
  //   queryKey: ["payments"],
  // });

  const sub = async (e) => {
    e.preventDefault();
    console.log(payId);
    await createPayment(token, kind, payId);
    setShow(false);
    fetchData();
    toast.success("تمت الإضافة بنجاح");
    setKind("");
  };

  // const { mutate: addPayment, isPending: isAdding } = useMutation({
  //   mutationFn: (e) => sub(e),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries("payments");
  //     toast.success("تمت الإضافة بنجاح");
  //   },
  //   onError: (error) => {
  //     console.log(error);
  //     toast.error("حدث خطأ ما");
  //   },
  // });

  // if (isLoading || isAdding) return <Spinner />;

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
        </div>
        <div className="Apay__in__body">
          <div className="cards">
            {payments?.map((pay) => (
              <div className="card" key={pay.id}>
                <p>{pay.payment_kind}</p>
              </div>
            ))}
          </div>
        </div>
        {show && (
          <form onSubmit={sub}>
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
