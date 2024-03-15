import { useNavigate } from "react-router-dom";
import { indexPrograms } from "../../services/admin/program/index";
import { useAuth } from "../../services/AuthContext";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../Applicant/Spinner";
import home from "../../assets/home.png";

function BeforePay() {
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

  if (isLoading) return <Spinner />;

  return (
    <div className="Before">
      <div className="Before__in">
        <div className="Before__in__top">
          <button onClick={() => navigate("/admin/main")}>
            <img src={home} alt="home" />
          </button>
        </div>
        <div className="cards">
          {cards?.map((card) => (
            <button key={card.id} onClick={() => navigate(`${card.id}`)}>
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
