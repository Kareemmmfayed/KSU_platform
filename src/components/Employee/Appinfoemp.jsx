import { useParams } from "react-router-dom";
import { useAuth } from "../../services/AuthContext";
// import { showApplication } from "../../services/employee/application/show";
// import { useQuery } from "@tanstack/react-query";
// import Spinner from "../Applicant/Spinner";

function Appinfoemp() {
  const { token } = useAuth();
  const { diplomaId, appId } = useParams();

  // const fetchData = async () => {
  //   const data = await showApplication(token, diplomaId, appId);
  //   return data;
  // };

  // fetchData();

  // const { data: Applicant, isLoading } = useQuery({
  //   queryFn: fetchData,
  //   queryKey: [`Applicant${appId}`],
  // });

  // if (isLoading) return <Spinner />;

  return (
    <div className="Appemp">
      <div className="Appemp__in">
        <h2>بيانات الطالب</h2>
        <form>
          <div>
            <label htmlFor="name"> : الإسم بالكامل</label>
            <input type="text" id="name" disabled />
          </div>
        </form>
        <div className="Appemp__in__btns">
          <button>إلغاء</button>
          <button className="btnbtn">إرسال</button>
        </div>
      </div>
    </div>
  );
}

export default Appinfoemp;
