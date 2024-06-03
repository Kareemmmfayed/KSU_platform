/* eslint-disable react/prop-types */
import logo from "../assets/logo.png";
import pfp from "../assets/pfp.png";
import { Link } from "react-router-dom";
import { useAuth } from "../services/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { showApplicant } from "../services/applicant/me/show";
import { showEmployee } from "../services/employee/me/show";
import { showAdmin } from "../services/admin/me/show";
import { showMaster } from "../services/master/me/show";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { showInstructor } from "../services/instructor/me/show";
import { showStudent } from "../services/student/me/show";

function Header(props) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isLoggedIn, logout, userType, token } = useAuth();

  const [list, setList] = useState(false);

  const fetchName = async () => {
    // if (isLoggedIn) {
    //   if (userType === "applicant") {
    //     const res = await showApplicant(token);
    //     return res.name;
    //   } else if (userType === "student") {
    //     const res = await showStudent(token);
    //     return res.name;
    //   } else if (userType === "employee") {
    //     const res = await showEmployee(token);
    //     return res.name;
    //   } else if (userType === "lecturer") {
    //     const res = await showInstructor(token);
    //     return res.name;
    //   } else if (userType === "admin") {
    //     const res = await showAdmin(token);
    //     return res.name;
    //   } else if (userType === "master") {
    //     const res = await showMaster(token);
    //     return res.name;
    //   }
    // } else return [];

    if (isLoggedIn) {
      let res;
      switch (userType) {
        case "applicant":
          res = await showApplicant(token);
          break;
        case "student":
          res = await showStudent(token);
          break;
        case "employee":
          res = await showEmployee(token);
          break;
        case "lecturer":
          res = await showInstructor(token);
          break;
        case "admin":
          res = await showAdmin(token);
          break;
        case "master":
          res = await showMaster(token);
          break;
        default:
          return [];
      }
      return res.name;
    } else {
      return [];
    }
  };

  const { data } = useQuery({
    queryKey: ["name", isLoggedIn],
    queryFn: fetchName,
  });

  const show = () => {
    setList(!list);
  };

  const LogOut = () => {
    logout();
    navigate("/");
    queryClient.removeQueries();
  };

  const toAccount = () => {
    navigate("/account");
    setList(false);
  };

  const toDiplomas = () => {
    navigate("/applicant/applications");
    setList(false);
  };

  return (
    <div className="Header">
      <div className="Header__right">
        <button className="Header__right__logo" onClick={() => navigate("/")}>
          <img src={logo} alt="logo" />
        </button>
        <div className="Header__right__text">
          <h3>التقديم علي الدبلومات</h3>
          <p>جامعة كفر الشيخ</p>
        </div>
      </div>
      <div className="Header__left">
        {isLoggedIn ? (
          <div className="userName">
            <button onClick={show}>
              <img src={pfp} alt="Profile picture" />
              <p>{data}</p>
            </button>
            {list && (
              <ul>
                {userType == "applicant" && (
                  <li>
                    <button
                      onClick={toDiplomas}
                      style={{ borderBottom: "1px solid black" }}
                    >
                      الدبلومات السابقة
                    </button>
                  </li>
                )}
                <li>
                  <button
                    onClick={toAccount}
                    style={{ borderBottom: "1px solid black" }}
                  >
                    معلومات الحساب
                  </button>
                </li>
                <li>
                  <button className="red" onClick={LogOut}>
                    تسجيل الخروج
                  </button>
                </li>
              </ul>
            )}
          </div>
        ) : (
          <Link to={props.link}>
            <button className="btnbtn"> {props.name}</button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
