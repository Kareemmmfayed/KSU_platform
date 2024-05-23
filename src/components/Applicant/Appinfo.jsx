import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../services/AuthContext";
import { showApplication } from "../../services/applicant/application/show.js";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../Applicant/Spinner";

function Appinfo() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const { diplomaId } = useParams();

  const fetchData = async () => {
    const data = await showApplication(token, diplomaId);
    return data;
  };

  const { data: MyApplication, isLoading } = useQuery({
    queryFn: fetchData,
    queryKey: ["MyApplication"],
  });

  if (isLoading) return <Spinner />;

  return (
    <div className="Appinfo">
      <div className="Appinfo__in">
        <h2>معلومات طلب التقديم على الدبلومة</h2>
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

export default Appinfo;
