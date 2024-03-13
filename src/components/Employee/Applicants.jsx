import { useState, useEffect } from "react";
import copy from "../../assets/copy.png";
import { indexApplications } from "../../services/employee/application";
import { useAuth } from "../../services/AuthContext";
import { useNavigate } from "react-router-dom";

function Applicants({ diplomaId }) {
  // const [applicants, setApplicants] = useState("");

  const navigate = useNavigate();

  const applicants = [
    {
      name: "كريم حسام الدين فايد",
      id: "8568464561643",
      national_id: "85555555555555",
    },

    {
      name: "كريم حسام الدين فايد",
      id: "8568464561643",
      national_id: "85555555555555",
    },

    {
      name: "كريم حسام الدين فايد",
      id: "8568464561643",
      national_id: "85555555555555",
    },

    {
      name: "كريم حسام الدين فايد",
      id: "8568464561643",
      national_id: "85555555555555",
    },
  ];
  const [searchValue, setSearchValue] = useState("");
  const [filteredApplicants, setFilteredApplicants] = useState();

  // const { token } = useAuth();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await indexApplications(token, diplomaId);
  //     setApplicants(res);
  //   };

  //   fetchData();
  // }, []);

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchValue(searchTerm);

    const filtered = applicants.filter(
      (applicant) =>
        applicant[0].includes(searchTerm) || applicant[1].includes(searchTerm)
    );

    setFilteredApplicants(filtered);
  };

  const copyToClipboard = (name, number) => {
    const textToCopy = `${name} - ${number}`;
    const textArea = document.createElement("textarea");
    textArea.value = textToCopy;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
  };

  return (
    <div className="Applicants">
      <div className="Applicants__in">
        <div className="Applicants__in__top">
          <h2>الطلبة المتقدمين</h2>
          <input
            type="text"
            placeholder="بحث"
            value={searchValue}
            onChange={handleSearch}
          />
        </div>
        <ol>
          {applicants?.map((applicant) => (
            <div className="Applicants__in__bot" key={applicant.id}>
              <button
                className="Applicants__in__bot__right"
                style={{
                  border: "none",
                  background: "transparent",
                  display: "block",
                }}
                onClick={() => navigate("/employee/Applicant/info")}
              >
                <div>
                  <li>{applicant.name}</li>
                </div>
                <p>الرقم القومي : {applicant.national_id}</p>
              </button>
              <button
                onClick={() =>
                  copyToClipboard(applicant.name, applicant.national_id)
                }
              >
                <div>
                  <img src={copy} alt="copy" />
                </div>
              </button>
            </div>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default Applicants;
