import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../services/AuthContext";
import { showApplication } from "../../services/employee/application/show";
import { useQuery } from "@tanstack/react-query";
import { UpdateApplication } from "../../services/employee/application/update";
import { useState } from "react";
import Spinner from "../Applicant/Spinner";

function Appinfoemp() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const { diplomaId, appId } = useParams();

  const fetchData = async () => {
    const data = await showApplication(token, diplomaId, appId);
    return data;
  };

  const { data: Applicant, isLoading } = useQuery({
    queryFn: fetchData,
    queryKey: [`Applicant${appId}`],
  });

  const [status, setStatus] = useState(
    Applicant ? Applicant.application.status : ""
  );
  const [feedback, setFeedback] = useState(
    Applicant ? Applicant.application.feedback : ""
  );

  const [applyingFees, setApplyingFees] = useState(
    Applicant ? Applicant.application.applying_fees_status : false
  );

  const [programFees, setProgramFees] = useState(
    Applicant ? Applicant.application.program_fees_status : false
  );

  const onSub = async (e) => {
    e.preventDefault();

    console.log(typeof status);
    console.log(typeof feedback);
    console.log(typeof applyingFees);
    console.log(typeof programFees);

    await UpdateApplication(
      token,
      diplomaId,
      appId,
      status,
      feedback,
      applyingFees,
      programFees
    );
    navigate(`/employee/programs/${diplomaId}/applicants`);
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="Appemp">
      <div className="Appemp__in">
        <h2>بيانات الطالب</h2>
        <form onSubmit={onSub}>
          <div>
            <label htmlFor="name"> : الإسم بالكامل</label>
            <input type="text" id="name" disabled value={Applicant?.name} />
          </div>
          <div>
            <label htmlFor="id"> : الرقم القومي</label>
            <input type="text" id="id" disabled value={Applicant?.id} />
          </div>
          {Applicant.files?.map((file, index) => (
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
              value={applyingFees}
              onChange={(e) => setApplyingFees(e.target.value === "true")}
              required
            >
              <option value={true}>تم الدفع</option>
              <option value={false}>لم يتم الدفع</option>
            </select>
          </div>
          <div>
            <label htmlFor="fees"> : رسوم الدبلومة</label>
            <select
              id="fees"
              value={programFees}
              onChange={(e) => setProgramFees(e.target.value === "true")}
              required
            >
              <option value={true}>تم الدفع</option>
              <option value={false}>لم يتم الدفع</option>
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
            <button className="btnbtn">إرسال</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Appinfoemp;
