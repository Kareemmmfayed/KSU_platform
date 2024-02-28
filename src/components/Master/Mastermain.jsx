import { useState, useEffect, useRef } from "react";
import plus from "../../assets/plus.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../services/AuthContext";
import { getStats } from "../../services/master/getStats";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../Applicant/Spinner";

function Mastermain() {
  const { token } = useAuth();

  const myRef = useRef(null);
  const myRef1 = useRef(null);
  const myRef2 = useRef(null);
  const myRef3 = useRef(null);
  const myRef4 = useRef(null);
  const myRef5 = useRef(null);

  // const [stats, setStats] = useState({});

  const getData = async () => {
    const data = await getStats(token);
    // setStats(data);
    return data;
  };

  const { data: stats, isLoading } = useQuery({
    queryFn: getData,
    queryKey: ["stats"],
  });

  // console.log(stats);

  // useEffect(() => {
  //   const circle = (per, ele, col, ref) => {
  //     const percentage = per;
  //     const circleElement = document.getElementById(ele);
  //     circleElement?.style.setProperty("--percentage", `${percentage}%`);
  //     circleElement?.style.setProperty("--col", col);
  //     const myElement = ref.current;
  //     myElement?.style.setProperty("--numCol", col);
  //   };

  //   circle(100, "circle", "#CB8589", myRef);
  //   circle(100, "circle1", "#B4869F", myRef1);
  //   circle(100, "circle2", "#539987", myRef2);
  //   circle(100, "circle3", "#4793CD", myRef3);
  //   circle(100, "circle4", "#A18276", myRef4);
  //   circle(100, "circle5", "#cc5454", myRef5);
  // }, []);

  const navigate = useNavigate();

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
              <div id="circle">
                <div className="inner" ref={myRef}>
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
              <div id="circle1">
                <div className="inner" ref={myRef1}>
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
              <div id="circle2">
                <div className="inner" ref={myRef2}>
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
              <div id="circle3">
                <div className="inner" ref={myRef3}>
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
              <div id="circle4">
                <div className="inner" ref={myRef4}>
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
              <div id="circle5">
                <div className="inner" ref={myRef5}>
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
