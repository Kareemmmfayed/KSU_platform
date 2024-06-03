import { useState } from "react";
import copy from "../../assets/copy.png";
import { useAuth } from "../../services/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { indexApplications } from "../../services/employee/application";
import { useQuery } from "@tanstack/react-query";
import SmallSpinner from "../SmallSpinner";

function Applicants() {
  const { token } = useAuth();
  const { diplomaId } = useParams();

  const fetchData = async () => {
    const data = await indexApplications(token, diplomaId);
    console.log(data);
    return data;
  };

  const { data: applicants, isLoading } = useQuery({
    queryFn: fetchData,
    queryKey: [`applicants${diplomaId}`],
  });

  const [searchValue, setSearchValue] = useState("");
  const [type, setType] = useState("applicant");

  if (!isLoading) {
    var filteredApplicants = applicants?.filter((app) =>
      app.name.includes(searchValue)
    );
  }

  return (
    <div className="Applicants">
      <div className="Applicants__in">
        <div className="Applicants__in__top">
          <h2>الطلبة المتقدمين</h2>
          <div>
            <button
              className={type === "applicant" ? "EmpActive" : ""}
              onClick={() => setType("applicant")}
            >
              المتقدمين
            </button>
            <button
              className={type === "student" ? "EmpActive" : ""}
              onClick={() => setType("student")}
            >
              الطلاب
            </button>
          </div>
          <input
            type="text"
            placeholder="بحث"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <List
          applicants={filteredApplicants}
          diplomaId={diplomaId}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}

function List({ applicants, diplomaId, isLoading }) {
  const navigate = useNavigate();

  const copycontent = (content) => {
    navigator.clipboard.writeText(content);
  };

  if (isLoading) return <SmallSpinner />;

  return (
    <ul>
      {applicants?.map((applicant) => (
        <div key={applicant.id}>
          <button
            onClick={() =>
              navigate(
                `/employee/programs/${diplomaId}/applicant/${applicant.id}/info`
              )
            }
          >
            <li key={applicant.id}>{applicant.name}</li>
            <p style={{ color: "grey" }}>
              الرقم القومي : {applicant.national_id}
            </p>
          </button>
          <button
            onClick={() =>
              copycontent(
                `الإسم : ${applicant.name}, الرقم القومي : ${applicant.national_id}`
              )
            }
          >
            <img src={copy} alt="copy" />
          </button>
        </div>
      ))}
    </ul>
  );
}

export default Applicants;
