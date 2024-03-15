import home from "../../assets/home.png";
import plus from "../../assets/plusb.png";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../services/AuthContext";
import { indexPayments } from "../../services/admin/payments/index";
import { createPayment } from "../../services/admin/payments/create";
import toast from "react-hot-toast";

function Apay() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const { paymentId } = useParams();

  const [show, setShow] = useState(false);

  const addItem = () => {
    setShow(true);
  };

  const cancel = () => {
    setKind("");
    setShow(false);
  };

  const [kind, setKind] = useState();

  const fetchData = async () => {
    const data = await indexPayments(token, paymentId);
    return data;
  };

  const { data: payments, isLoading } = useQuery({
    queryFn: fetchData,
    queryKey: ["payments"],
  });

  const sub = async (e) => {
    e.preventDefault();
    await createPayment(token, kind, paymentId);
    setShow(false);
    setKind("");
  };

  const { mutate: subMutation, isSubmitting } = useMutation({
    mutationFn: (e) => sub(e),
    onSuccess: () => {
      queryClient.invalidateQueries(`payments${yearId}`);
      toast.success("تمت الإضافة بنجاح");
    },
    onError: (error) => {
      console.log(error);
      toast.error("حدث خطأ ما");
    },
  });

  if (isLoading || isSubmitting) return <Spinner />;

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
            {payments?.map((e) => (
              <div className="card" key={e.id}>
                <p>{e.payment_kind}</p>
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
