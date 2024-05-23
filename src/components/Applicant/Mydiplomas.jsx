import { useAuth } from "../../services/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { indexMyPrograms } from "../../services/applicant/application";
import Spinner from "../Applicant/Spinner";

function Mydiplomas() {
  const { token } = useAuth();
  const navigate = useNavigate();

  const fetchData = async () => {
    const data = await indexMyPrograms(token);
    return data;
  };

  const { data: myPrograms, isLoading } = useQuery({
    queryFn: fetchData,
    queryKey: ["myPrograms"],
  });

  if (isLoading) return <Spinner />;

  return (
    <div className="Mydiplomas">
      <div className="Diploma">
        <div className="cards">
          {myPrograms?.map((diploma, index) => (
            <div className="card" key={index}>
              {diploma.status == "pending" && (
                <button
                  onClick={() => navigate(`/programs/${diploma.program_id}`)}
                >
                  <h2>{diploma.program_name}</h2>
                  <p>إنتظار</p>
                </button>
              )}
              {diploma.status == "reviewed" && (
                <button
                  onClick={() => navigate(`/programs/${diploma.program_id}`)}
                >
                  <h2>{diploma.program_name}</h2>
                  <p>تمت مراجعته</p>{" "}
                </button>
              )}
              {diploma.status == "first acceptance" && (
                <button
                  onClick={() => navigate(`/programs/${diploma.program_id}`)}
                >
                  <h2>{diploma.program_name}</h2>
                  <p>قبول مبدئي</p>{" "}
                </button>
              )}
              {diploma.status == "final acceptance" && (
                <button
                  onClick={() => navigate(`/programs/${diploma.program_id}`)}
                >
                  <h2>{diploma.program_name}</h2>
                  <p>قبول نهائي</p>{" "}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Mydiplomas;
