import Header from "../Header";
import Footer from "../Footer";
import { Link } from "react-router-dom";
import { useState } from "react";
import { SignUpApplicant } from "../../services/auth/SignUpApplicant";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../services/AuthContext";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [gender, setGender] = useState("");
  const [wrongPass, setWrongPass] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password == cpassword) {
      if (await SignUpApplicant(name, email, password, nationalId, gender)) {
        console.log("Worked");
        login("applicant", false);
        navigate("/");
      } else {
        console.log("Sign Up Failed!");
      }
    } else {
      setWrongPass((e) => !e);
      console.log("Wrong pass!");
    }
  };

  return (
    <>
      <Header name="< العودة" link="/" />
      <div className="Signup">
        <div className="Signup__inner">
          <div className="signup__inner__form col-lg-5 col-md-6 col-12">
            <h2>أنشئ حسابك</h2>
            <form onSubmit={handleSignUp}>
              <input
                type="text"
                placeholder="الإسم بالكامل"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                placeholder="الرقم القومي"
                value={nationalId}
                onChange={(e) => setNationalId(e.target.value)}
                minLength={14}
                maxLength={14}
              />
              <div className="gender">
                <label htmlFor="gender">: النوع</label>
                <div className="male">
                  <label htmlFor="male">ذكر</label>
                  <input
                    type="radio"
                    id="male"
                    name="gender"
                    value="male"
                    checked={gender === "male"}
                    onChange={(e) => setGender(e.target.value)}
                  />
                </div>
                <div className="female">
                  <label htmlFor="female">أنثي</label>
                  <input
                    type="radio"
                    id="female"
                    name="gender"
                    value="female"
                    checked={gender === "female"}
                    onChange={(e) => setGender(e.target.value)}
                  />
                </div>
              </div>
              <input
                type="email"
                placeholder="البريد الإلكتروني"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="كلمة السر"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={wrongPass ? { border: "1px solid red" } : {}}
              />
              <input
                type="password"
                placeholder="تأكيد كلمة المرور"
                value={cpassword}
                onChange={(e) => setCpassword(e.target.value)}
                style={wrongPass ? { border: "1px solid red" } : {}}
              />
              <div className="sub">
                <button type="submit" className="btnbtn">
                  {" "}
                  الدخول{" "}
                </button>
                <div>
                  لديك حساب بالفعل ؟ <Link to="/login">سجل دخولك</Link>
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

export default Signup;
