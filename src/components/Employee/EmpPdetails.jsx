/* eslint-disable react/prop-types */
import { showEmployeeProgram } from "../../services/employee/program/show";
import { useAuth } from "../../services/AuthContext";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../Applicant/Spinner";
import { useNavigate, useParams } from "react-router-dom";

function Pdetails() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const { diplomaId } = useParams();

  const fetchData = async () => {
    const data = await showEmployeeProgram(token, diplomaId);
    return data;
  };

  const { data: programData, isLoading } = useQuery({
    queryFn: fetchData,
    queryKey: [`programData${diplomaId}`],
  });

  if (isLoading) return <Spinner />;

  return (
    <div className="Pdetails">
      <div className="Pdetails__in">
        <h2>{programData.name}</h2>
        <div className="Pdetails__in__about">
          <h4>عن الدبلومة</h4>
          <p>{programData.description}</p>
        </div>
        <button
          className="btnbtn"
          onClick={() => navigate(`/employee/programs/${diplomaId}/applicants`)}
        >
          الطلبة المتقدمون
        </button>
      </div>
    </div>
  );
}

export default Pdetails;
