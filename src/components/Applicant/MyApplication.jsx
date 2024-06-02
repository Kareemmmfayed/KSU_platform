import { useParams } from "react-router-dom";
import { showApplication } from "../../services/applicant/application/show";
import { useAuth } from "../../services/AuthContext";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../Applicant/Spinner";

function MyApplication() {
  const { appId } = useParams();
  const { token } = useAuth();

  const fetchData = async () => {
    const res = await showApplication(token, appId);
    return res;
  };

  const { data, isLoading } = useQuery({
    queryFn: fetchData,
    queryKey: [`MyApplicatoin}`, appId],
  });

  if (isLoading) return <Spinner />;

  return (
    <div className="Appemp">
      <div className="Appemp__in">
        <h2>معلومات طلب التقديم على الدبلومة</h2>
        <form style={{ paddingTop: "50px" }}>
          <div>
            <label htmlFor="status"> : الحالة</label>
            <input type="text" id="status" disabled value={data.status} />
          </div>
          <div>
            <label htmlFor="why"> : السبب</label>
            <textarea
              disabled
              id="why"
              cols="30"
              rows="5"
              value={data.feedback}
            ></textarea>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MyApplication;
