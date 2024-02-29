import plus from "../../assets/plus.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../services/AuthContext";
import { getStats } from "../../services/master/getStats";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../Applicant/Spinner";

function Mastermain() {
  const { token } = useAuth();
  const navigate = useNavigate();

  const getData = async () => {
    const data = await getStats(token);
    return data;
  };

  const { data: stats, isLoading } = useQuery({
    queryFn: getData,
    queryKey: ["stats"],
  });

  if (isLoading) return <Spinner />;

  return (
    <div className="Mastermain">
      <div className="Mastermain__in">
        <div className="Mastermain__in__cards">
          <div className="card">
            <div className="card__right">
              <p>عدد الكليات</p>
            </div>
            <div className="card__left">
              <div className="circle" style={{ background: "#CB8589" }}>
                <div className="inner" style={{ color: "#CB8589" }}>
                  {stats.collagesCount}
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card__right">
              <p>عدد برامج الدبلومة</p>
            </div>
            <div className="card__left">
              <div className="circle" style={{ background: "#B4869F" }}>
                <div className="inner" style={{ color: "#B4869F" }}>
                  {stats.programsCount}
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card__right">
              <p>عدد الطلاب</p>
            </div>
            <div className="card__left">
              <div className="circle" style={{ background: "#539987" }}>
                <div className="inner" style={{ color: "#539987" }}>
                  {stats.studentsCount}
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card__right">
              <p>عدد المسؤولين</p>
            </div>
            <div className="card__left">
              <div className="circle" style={{ background: "#4793CD" }}>
                <div className="inner" style={{ color: "#4793CD" }}>
                  {stats.adminsCount}
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card__right">
              <p>عدد الموظفين</p>
            </div>
            <div className="card__left">
              <div className="circle" style={{ background: "#A18276" }}>
                <div className="inner" style={{ color: "#A18276" }}>
                  {stats.employeesCount}
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card__right">
              <p>عدد المحاضرين</p>
            </div>
            <div className="card__left">
              <div className="circle" style={{ background: "#cc5454" }}>
                <div className="inner" style={{ color: "#cc5454" }}>
                  {stats.instructorsCount}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="Mastermain__in__links">
          <button onClick={() => navigate("/master/colleges")}>
            <img src={plus} alt="plus" />
            <h2>إضافة كلية جديدة</h2>
          </button>
          <button onClick={() => navigate("/master/admins")}>
            <img src={plus} alt="plus" />
            <h2>إضافة مسؤول جديد</h2>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Mastermain;
