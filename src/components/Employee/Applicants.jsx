import { useState } from "react";
import copy from "../../assets/copy.png";
import { useAuth } from "../../services/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { indexApplications } from "../../services/employee/application";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../Applicant/Spinner";

function Applicants() {
  const { token } = useAuth();
  const navigate = useNavigate();
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

  if (!isLoading) {
    var filteredApplicants = applicants?.filter((app) =>
      app.name.includes(searchValue)
    );
  }

  const copycontent = (content) => {
    navigator.clipboard.writeText(content);
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="Applicants">
      <div className="Applicants__in">
        <div className="Applicants__in__top">
          <h2>الطلبة المتقدمين</h2>
          <input
            type="text"
            placeholder="بحث"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <ul>
          {filteredApplicants?.map((applicant) => (
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
      </div>
    </div>
  );
}

export default Applicants;
