import Header from "../Header";
import Footer from "../Footer";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../services/AuthContext";
import { LogInApplicant } from "../../services/auth/LogInApplicant";
import { LogInMaster } from "../../services/auth/LogInMaster";
import { LogInLecturer } from "../../services/auth/LogInLecturer";
import { LogInAdmin } from "../../services/auth/LogInAdmin";

function Signin() {
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rem, setRem] = useState(false);
  const [wrong, setWrong] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (role == "applicant") {
      const token = await LogInApplicant(email, password);
      if (token) {
        login(role, token, rem);
        navigate("/");
      } else {
        setWrong((e) => !e);
      }
    } else if (role == "lecturer") {
      const token = await LogInLecturer(email, password);
      if (token) {
        login(role, token, rem);
        navigate("/");
      } else {
        setWrong((e) => !e);
      }
    } else if (role == "admin") {
      const token = await LogInAdmin(email, password);
      if (token) {
        login(role, token, rem);
        navigate("/admin/main");
      } else {
        setWrong((e) => !e);
      }
    } else if (role == "master") {
      const token = await LogInMaster(email, password);
      if (token) {
        login(role, token, rem);
        navigate("/master/main");
      } else {
        setWrong((e) => !e);
      }
    }
  };

  return (
    <>
      <Header name="< العودة" link="/" />
      <div className="Sign-in">
        <div className="Sign-in__inner">
          <div className="sign-in__inner__form col-lg-5 col-md-6 col-12">
            <h2>أهلا بعودتك !</h2>
            <form onSubmit={handleSubmit}>
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option disabled value="">
                  الدور
                </option>
                <option value="applicant">طالب</option>
                <option value="lecturer">محاضر</option>
                <option value="employee">موظف</option>
                <option value="admin">أدمن</option>
                <option value="master">ماستر</option>
              </select>
              <input
                type="email"
                placeholder="البريد الإلكتروني"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={
                  wrong
                    ? { border: "1px solid red" }
                    : { border: "1px solid grey" }
                }
              />
              <input
                type="password"
                placeholder="كلمة السر"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={
                  wrong
                    ? { border: "1px solid red" }
                    : { border: "1px solid grey" }
                }
              />
              <div className="rem">
                <div>
                  <label htmlFor="rem">تذكرني</label>
                  <input
                    type="checkbox"
                    name="remember"
                    id="rem"
                    checked={rem}
                    onChange={(e) => setRem(e.target.checked)}
                  />{" "}
                </div>
                <a href="">نسيت كلمة المرور؟</a>
              </div>
              <div className="sub">
                <button type="submit" className="btnbtn">
                  {" "}
                  الدخول{" "}
                </button>
                <div>
                  ليس لديك حساب ؟ <Link to="/signup">انشـــئ حساب جديد</Link>
                </div>
              </div>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Signin;
