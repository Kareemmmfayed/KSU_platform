import { useNavigate } from "react-router-dom";
import { indexPrograms } from "../../services/admin/program/index";
import { useAuth } from "../../services/AuthContext";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../Applicant/Spinner";

function BeforePay({ pickPayId }) {
  const { token } = useAuth();
  const navigate = useNavigate();

  const fetchData = async () => {
    const data = await indexPrograms(token);
    return data;
  };

  const { data: cards, isLoading } = useQuery({
    queryFn: fetchData,
    queryKey: ["beforePay"],
  });

  const handleClick = (id) => {
    pickPayId(id);
    navigate("/admin/program/payments");
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="Before">
      <div className="Before__in">
        <div className="cards">
          {cards?.map((card) => (
            <button key={card.id} onClick={() => handleClick(card.id)}>
              <p>مصاريف دبلومة :</p>
              <p>{card.name}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BeforePay;
