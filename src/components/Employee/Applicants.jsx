import { useState, useEffect } from "react";
import copy from "../../assets/copy.png";
import { indexApplications } from "../../services/employee/application";
import { useAuth } from "../../services/AuthContext";

function Applicants({ diplomaId }) {
  const [applicants, setApplicants] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [filteredApplicants, setFilteredApplicants] = useState();

  const { token } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const res = await indexApplications(token, diplomaId);
      setApplicants(res);
    };

    fetchData();
  }, []);

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchValue(searchTerm);

    const filtered = initialApplicants.filter(
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
          {filteredApplicants?.map((applicant) => (
            <div className="Applicants__in__bot" key={applicant.id}>
              <div className="Applicants__in__bot__right">
                <div>
                  <li>{applicant.name}</li>
                </div>
                <p>الرقم القومي : {applicant.national_id}</p>
              </div>
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
