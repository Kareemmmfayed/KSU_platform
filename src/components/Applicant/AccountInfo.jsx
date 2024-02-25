import Header from "../Header";
import Footer from "../Footer";
import { showApplicant } from "../../services/applicant/me/show";
import { useEffect, useState } from "react";
import { useAuth } from "../../services/AuthContext";
import { COLLEGE } from "../../services/API";
import { useNavigate } from "react-router-dom";

function AccountInfo() {
  const { token, isloggedIn } = useAuth();
  const navigate = useNavigate();

  const [user, setUser] = useState({});

  useEffect(() => {
    if (!isloggedIn) navigate("/login");
    const fetchData = async () => {
      const res = await showApplicant(token);
      setUser(res);
    };

    fetchData();
  }, []);

  return (
    <>
      <Header name="< العودة" link="/" />
      <div className="Account">
        <div className="Account__inner">
          <div className="Account__inner__form col-lg-5 col-md-6 col-12">
            <h2>معلومات الحساب</h2>
            <form>
              <input type="text" value={user.name} disabled />
              <input type="number" value={user.national_id} disabled />
              <input type="text" value={COLLEGE.name} disabled />
              <div className="gender">
                <label htmlFor="gender">: النوع</label>
                <div className="male">
                  <label>ذكر</label>
                  <input
                    type="radio"
                    id="male"
                    name="gender"
                    value="male"
                    checked
                    disabled
                  />
                </div>
                <div className="female">
                  <label>أنثي</label>
                  <input
                    type="radio"
                    id="female"
                    name="gender"
                    value="female"
                    disabled
                  />
                </div>
              </div>
              <input
                type="email"
                placeholder="البريد الإلكتروني"
                value={user.email}
                disabled
              />
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default AccountInfo;
