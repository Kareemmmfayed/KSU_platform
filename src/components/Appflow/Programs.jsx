/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Header from "../Header";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../services/AuthContext";
import { indexPrograms } from "../../services/applicant/program/index";

function Programs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [diplomas, setDiplomas] = useState([]);
  const { token, setDip } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const programs = await indexPrograms(token);
        setDiplomas(programs);
      } catch (error) {
        console.error("Error fetching programs:", error);
      }
    };

    fetchData();
  }, [token]);

  const filteredPrograms = diplomas.filter((program) =>
    program.name.includes(searchTerm)
  );

  const details = (id) => {
    navigate("/programs/details");
    setDip(id);
  };

  return (
    <>
      <Header name="< العودة" link="/" />
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
        <Footer />
      </div>
    </>
  );
}

export default Programs;
