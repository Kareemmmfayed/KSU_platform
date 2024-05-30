import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../services/AuthContext";
import { indexEmployeePrograms } from "../../services/employee/program/index";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../Applicant/Spinner";

function Programs() {
  const [searchTerm, setSearchTerm] = useState("");
  const { token } = useAuth();
  const navigate = useNavigate();

  const fetchData = async () => {
    const programs = await indexEmployeePrograms(token);
    return programs;
  };

  const { data: programs, isLoading } = useQuery({
    queryFn: fetchData,
    queryKey: ["programs"],
  });

  if (!isLoading) {
    var filteredPrograms = programs.filter((program) =>
      program.name.includes(searchTerm)
    );
  }

  if (isLoading) return <Spinner />;

  return (
    <div className="Programs">
      <div className="Programs__in">
        <div className="Programs__in__top">
          <h2>برامج الدبلومات المتاحة حاليا</h2>
          <input
            type="text"
            placeholder="بحث"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <ol>
          {filteredPrograms.map((diploma) => (
            <li key={diploma.id}>
              <button onClick={() => navigate(`${diploma.id}`)}>
                {diploma.name}
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default Programs;
