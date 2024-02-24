import Header from "../Header";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { indexPrograms } from "../../services/admin/program/index";
import { useAuth } from "../../services/AuthContext";

function BeforePay({ pickPayId }) {
  const navigate = useNavigate();

  const { token } = useAuth();

  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await indexPrograms(token);
      setPrograms(data);
    };

    fetchData();
  }, []);

  const handleClick = (id) => {
    pickPayId(id);
    navigate("/admin/program/payments");
  };

  return (
    <>
      <div className="Before">
        <div className="Before__in">
          <div className="cards">
            {programs.map((program) => (
              <button key={program.id} onClick={() => handleClick(program.id)}>
                <p>مصاريف دبلومة :</p>
                <p>{program.name}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default BeforePay;
