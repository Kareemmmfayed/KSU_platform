import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../services/AuthContext";
import { showApplication } from "../../services/employee/application/show";
import { useQuery } from "@tanstack/react-query";
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

  if (isLoading) return <Spinner />;

  return (
    <div className="Appemp">
      <div className="Appemp__in">
        <h2>بيانات الطالب</h2>
        <form>
          <div>
            <label htmlFor="name"> : الإسم بالكامل</label>
            <input type="text" id="name" disabled value={Applicant.name} />
          </div>
          <div>
            <label htmlFor="id"> : الرقم القومي</label>
            <input type="text" id="id" disabled value={Applicant.id} />
          </div>
          {Applicant.files?.map((file, index) => (
            <div>
              <Link to={file[1]} target="_blank" key={index}>
                {file[0]}
              </Link>
            </div>
          ))}
        </form>
        <div className="Appemp__in__btns">
          <button
            onClick={() =>
              navigate(`/employee/programs/${diplomaId}/applicants`)
            }
          >
            إلغاء
          </button>
          <button className="btnbtn">إرسال</button>
        </div>
      </div>
    </div>
  );
}

export default Appinfoemp;
