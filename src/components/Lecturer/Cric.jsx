import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../services/AuthContext";
import { indexCourses } from "../../services/instructor/courses/index";

function Cric({ pickDiplomaId }) {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [subjects, setSubjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await indexCourses(token);
      setSubjects(res);
    };

    fetchData();
  }, [token]);

  const filteredPrograms = subjects.filter((sub) =>
    sub.name.includes(searchTerm)
  );

  const handleClick = (id) => {
    pickDiplomaId(id);
    navigate("/lecturer/table");
  };
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
              <button onClick={() => handleClick(sub.id)}>{sub.name}</button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default Cric;
