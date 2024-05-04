import { useAuth } from "../../services/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { indexMyPrograms } from "../../services/applicant/application";
import Spinner from "../Applicant/Spinner";

function Mydiplomas() {
  const { token } = useAuth();

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
          {myPrograms.map((diploma, index) => (
            <div className="card" key={index}>
              <button>
                <h2>{diploma.name}</h2>
                <p>{diploma[1]}</p>
                {show && (
                  <>
                    <p>{diploma[2]}</p>
                    <p>{diploma[3]}</p>
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Mydiplomas;
