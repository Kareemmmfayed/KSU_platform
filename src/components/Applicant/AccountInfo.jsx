import { useAuth } from "../../services/AuthContext";
import { COLLEGE } from "../../services/API";
import { showApplicant } from "../../services/applicant/me/show";
import { showAdmin } from "../../services/admin/me/show";
import { showEmployee } from "../../services/employee/me/show";
import { showMaster } from "../../services/master/me/show";
import { showInstructor } from "../../services/instructor/me/show";
import { useQuery } from "@tanstack/react-query";
import Spinner from "./Spinner";

function AccountInfo() {
  const { token, userType } = useAuth();

  const fetchData = async () => {
    if (userType === "applicant") {
      const res = await showApplicant(token);
      return res;
    } else if (userType === "employee") {
      const res = await showEmployee(token);
      return res;
    } else if (userType === "lecturer") {
      const res = await showInstructor(token);
      return res;
    } else if (userType === "admin") {
      const res = await showAdmin(token);
      return res;
    } else if (userType === "master") {
      const res = await showMaster(token);
      return res;
    }
    return "";
  };

  const { data: user, isLoading } = useQuery({
    queryFn: fetchData,
    queryKey: ["myInfo"],
  });

  if (isLoading) return <Spinner />;

  return (
    <div className="Account">
      <div className="Account__inner">
        <div className="Account__inner__form col-lg-5 col-md-6 col-12">
          <h2>معلومات الحساب</h2>
          <form>
            <input type="text" value={user.name} disabled />
            {userType === "applicant" && (
              <input type="number" value={user.national_id} disabled />
            )}
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
    </div>
  );
}

export default AccountInfo;
