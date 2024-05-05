import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../services/AuthContext";
import { showApplication } from "../../services/employee/application/show";
import { UpdateApplication } from "../../services/employee/application/update";
import { useEffect, useState } from "react";
import Spinner from "../Applicant/Spinner";

function Appinfoemp() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const { diplomaId, appId } = useParams();

  const [Applicant, setApplicant] = useState({});
  const [status, setStatus] = useState("");
  const [feedback, setFeedback] = useState("");
  const [applyingFees, setApplyingFees] = useState(false);
  const [programFees, setProgramFees] = useState(false);
  const [applicantId, setApplicantId] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplication = async () => {
      const data = await showApplication(token, diplomaId, appId);
      setApplicant(data);
      setStatus(data?.application?.status || "");
      setFeedback(data?.application?.feedback || "");
      setApplyingFees(data?.application?.applying_fees_status || false);
      setProgramFees(data?.application?.program_fees_status || false);
      setApplicantId(data?.application?.applicant_id);
      setLoading(false);
    };
    fetchApplication();
  }, [token, diplomaId, appId]);

  const onSub = async (e) => {
    e.preventDefault();
    await UpdateApplication(
      token,
      diplomaId,
      appId,
      status,
      feedback,
      applyingFees,
      programFees,
      applicantId
    );
    navigate(`/employee/programs/${diplomaId}/applicants`);
  };

  if (loading) return <Spinner />;

  return (
    <div className="Appemp">
      <div className="Appemp__in">
        <h2>بيانات الطالب</h2>
        <form onSubmit={onSub}>
          <div>
            <label htmlFor="name"> : الإسم بالكامل</label>
            <input
              type="text"
              id="name"
              disabled
              value={Applicant?.name || ""}
            />
          </div>
          <div>
            <label htmlFor="id"> : الرقم القومي</label>
            <input type="text" id="id" disabled value={Applicant?.id || ""} />
          </div>
          {Applicant?.files?.map((file, index) => (
            <div key={index}>
              <Link to={file[1]} target="_blank">
                {file[0]}
              </Link>
            </div>
          ))}
          <div>
            <label htmlFor="applying"> : رسوم التقديم</label>
            <select
              id="applying"
              value={applyingFees.toString()}
              onChange={(e) => setApplyingFees(e.target.value === "true")}
              required
            >
              <option value="true">تم الدفع</option>
              <option value="false">لم يتم الدفع</option>
            </select>
          </div>
          <div>
            <label htmlFor="fees"> : رسوم الدبلومة</label>
            <select
              id="fees"
              value={programFees.toString()}
              onChange={(e) => setProgramFees(e.target.value === "true")}
              required
            >
              <option value="true">تم الدفع</option>
              <option value="false">لم يتم الدفع</option>
            </select>
          </div>
          <div>
            <label htmlFor="status"> : حالة الطلب</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="pending">تحت مراجعته</option>
              <option value="reviewed">تمت مراجعته</option>
              <option value="first acceptance">قبول مبدئي</option>
              <option value="final acceptance">قبول نهائي</option>
            </select>
          </div>
          <div>
            <label htmlFor="why"> : السبب</label>
            <textarea
              id="why"
              cols="30"
              rows="5"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            ></textarea>
          </div>
          <div className="btns">
            <button
              onClick={() =>
                navigate(`/employee/programs/${diplomaId}/applicants`)
              }
            >
              إلغاء
            </button>
            <button type="submit" className="btnbtn">
              إرسال
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Appinfoemp;
