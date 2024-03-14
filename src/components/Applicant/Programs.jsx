/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../services/AuthContext";
import { indexPrograms } from "../../services/applicant/program/index";
import { indexEmployeePrograms } from "../../services/employee/program/index";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../Applicant/Spinner";

function Programs() {
  const [searchTerm, setSearchTerm] = useState("");
  const { token, userType } = useAuth();

  const fetchData = async () => {
    if (userType === "applicant") {
      const programs = await indexPrograms(token);
      return programs;
    } else if (userType === "employee") {
      const programs = await indexEmployeePrograms(token);
      return programs;
    } else {
      return [];
    }
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
              {/* <button onClick={() => details(diploma.id)}>
                {diploma.name}
              </button> */}
              <Link to={`${diploma.id}`}>{diploma.name}</Link>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default Programs;
