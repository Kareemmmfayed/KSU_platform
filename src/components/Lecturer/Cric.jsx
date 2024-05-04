import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../services/AuthContext";
import { indexCourses } from "../../services/instructor/courses/index";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../Applicant/Spinner";

function Cric() {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = async () => {
    const res = await indexCourses(token);
    return res;
  };

  const { data: subjects, isLoading } = useQuery({
    queryFn: fetchData,
    queryKey: ["subjects"],
  });

  if (!isLoading) {
    var filteredPrograms = subjects.filter((sub) =>
      sub.name.includes(searchTerm)
    );
  }

  if (isLoading) return <Spinner />;

  return (
    <div className="Cric">
      <div className="Cric__in">
        <div className="Cric__in__top">
          <h2>المقررات الدراسية</h2>
          <input
            type="text"
            placeholder="بحث"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <ol>
          {filteredPrograms.map((sub) => (
            <li key={sub.id}>
              <button onClick={() => navigate(`${sub.id}`)}>{sub.name}</button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default Cric;
