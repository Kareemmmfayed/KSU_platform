import Header from "../Header";
import { useAuth } from "../../services/AuthContext";
import { useNavigate } from "react-router-dom";

function Landing() {
  const { isLoggedIn, userType } = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    // if (isLoggedIn) {
    //   if (userType === "applicant" || userType === "student") {
    //     navigate("programs");
    //   } else if (userType === "employee") {
    //     navigate("/employee/programs");
    //   } else if (userType === "lecturer") {
    //     navigate("/lecturer/subjects");
    //   } else if (userType === "admin") {
    //     navigate("/admin/main");
    //   } else if (userType === "master") {
    //     navigate("/master/main");
    //   }
    // } else {
    //   navigate("/login");
    // }

    if (isLoggedIn) {
      switch (userType) {
        case "applicant":
        case "student":
          navigate("programs");
          break;
        case "employee":
          navigate("/employee/programs");
          break;
        case "lecturer":
          navigate("/lecturer/subjects");
          break;
        case "admin":
          navigate("/admin/main");
          break;
        case "master":
          navigate("/master/main");
          break;
        default:
          navigate("/login");
          break;
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="Landing">
      <Header name="الدخول" link="/login" />
      <div className="Landing__hero">
        <div className="Landing__hero__text">
          <p>
            منصة التقديم الإلكتروني على <span>الدبلومات </span>
            للخريجين في جامعة كفر الشيخ.
          </p>
          <p>
            مرحبًا بك في منصة التقديم الإلكتروني للدبلومات. نحن هنا لنسهِّل عليك
            الخطوات المطلوبة للحصول على فرصة دراسية في مجالات متنوعة .
          </p>
          {userType !== "student" ? (
            <button className="btnbtn" onClick={handleClick}>
              إختر مسارك
            </button>
          ) : (
            <button
              className="btnbtn"
              onClick={() => navigate("/StudentPrograms")}
            >
              دبلوماتي{" "}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Landing;
