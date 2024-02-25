/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../services/AuthContext";
import { indexPrograms } from "../../services/applicant/program/index";
import { indexEmployeePrograms } from "../../services/employee/program/index";

function Eprograms({ pickDiplomaId }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [diplomas, setDiplomas] = useState([]);
  const { token, userType } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (userType === "applicant") {
        const programs = await indexPrograms(token);
        setDiplomas(programs);
      } else if (userType === "employee") {
        const programs = await indexEmployeePrograms(token);
        setDiplomas(programs);
      }
    };

    fetchData();
  }, [token]);

  const filteredPrograms = diplomas.filter((program) =>
    program.name.includes(searchTerm)
  );

  const details = (id) => {
    pickDiplomaId(id);
    if (userType === "applicant") {
      navigate("/programs/details");
    } else if (userType === "employee") {
      navigate("/employee/program/details");
    }
  };

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
              <button onClick={() => details(diploma.id)}>
                {diploma.name}
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default Eprograms;
