/* eslint-disable react/prop-types */
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useAuth } from "../services/AuthContext";
import pfp from "../assets/pfp.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { showApplicant } from "../services/applicant/me/show";
import { showEmployee } from "../services/employee/me/show";
import { showAdmin } from "../services/admin/me/show";
import { showMaster } from "../services/master/me/show";
import { useQuery } from "@tanstack/react-query";
import Spinner from "./Applicant/Spinner";

function Header(props) {
  const { isLoggedIn, logout, userType, token } = useAuth();

  const [list, setList] = useState(false);

  const fetchName = async () => {
    if (userType === "applicant") {
      const res = await showApplicant(token);
      return res.name || "";
    } else if (userType === "employee") {
      const res = await showEmployee(token);
      return res.name || "";
    } else if (userType === "admin") {
      const res = await showAdmin(token);
      return res.name || "";
    } else if (userType === "master") {
      const res = await showMaster(token);
      return res.name || "";
    }
    return "";
  };

  const { data, isLoading } = useQuery({
    queryKey: ["name"],
    queryFn: fetchName,
    retry: false,
  });

  // useEffect(() => {
  //   const fetchName = async () => {
  //     if (userType === "applicant") {
  //       const res = await showApplicant(token);
  //       setUserName(res.name);
  //     } else if (userType === "employee") {
  //       const res = await showEmployee(token);
  //       setUserName(res.name);
  //     } else if (userType === "admin") {
  //       const res = await showAdmin(token);
  //       setUserName(res.name);
  //     } else if (userType === "master") {
  //       const res = await showMaster(token);
  //       setUserName(res.name);
  //     }
  //   };

  //   if (isLoggedIn) {
  //     fetchName();
  //   }
  // }, []);

  const show = () => {
    setList(!list);
  };

  const navigate = useNavigate();

  const LogOut = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="Header">
      <div className="Header__right">
        <div className="Header__right__logo">
          <img src={logo} alt="logo" />
        </div>
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
                    <button onClick={() => navigate("/diplomas")}>
                      الدبلومات السابقة
                    </button>
                  </li>
                )}
                <li>
                  <button onClick={() => navigate("/account")}>
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
