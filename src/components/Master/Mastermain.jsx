import Header from "../Header";
import Footer from "../Footer";
import { useEffect, useRef } from "react";
import plus from "../../assets/plus.png";
import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../services/AuthContext";
// import { indexColleges } from "../../services/master/college/index";
// import { indexAdmin } from "../../services/master/admin/index";
// import { indexProgram } from "../../services/master/program/index";

function Mastermain() {
  // const { token } = useAuth();

  const myRef = useRef(null);
  const myRef1 = useRef(null);
  const myRef2 = useRef(null);
  const myRef3 = useRef(null);
  const myRef4 = useRef(null);
  const myRef5 = useRef(null);

  // const [collegeNum, setCollegeNum] = useState(0);
  // const [adminNum, setAdminNum] = useState(0);
  // const [programNum, setProgramNum] = useState(0);

  // const getData = async () => {
  //   const cdata = await indexColleges(token);
  //   setCollegeNum(cdata.data.count);

  //   const adata = await indexAdmin(token);
  //   setAdminNum(adata.data.count);

  //   const pdata = await indexProgram(token);
  //   setProgramNum(pdata.data.count);
  // };

  useEffect(() => {
    // getData();

    const circle = (per, ele, col, ref) => {
      const percentage = per;
      const circleElement = document.getElementById(ele);
      circleElement.style.setProperty("--percentage", `${percentage}%`);
      circleElement.style.setProperty("--col", col);
      const myElement = ref.current;
      myElement.style.setProperty("--numCol", col);
    };

    circle(50, "circle", "#CB8589", myRef);
    circle(50, "circle1", "#B4869F", myRef1);
    circle(50, "circle2", "#539987", myRef2);
    circle(50, "circle3", "#4793CD", myRef3);
    circle(50, "circle4", "#A18276", myRef4);
    circle(50, "circle5", "#A18276", myRef5);
  }, []);

  const navigate = useNavigate();

  return (
    <>
      <Header name="< العودة" link="/" />
      <div className="Mastermain">
        <div className="Mastermain__in">
          <div className="Mastermain__in__cards">
            <div className="card">
              <div className="card__right">
                <p>عدد الكليات</p>
                <p>0</p>
              </div>
              <div className="card__left">
                <div id="circle">
                  <div className="inner" ref={myRef}>
                    0
                  </div>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card__right">
                <p>عدد برامج الدبلومة</p>
                <p>0</p>
              </div>
              <div className="card__left">
                <div id="circle1">
                  <div className="inner" ref={myRef1}>
                    0
                  </div>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card__right">
                <p>عدد الطلاب</p>
                <p>10</p>
              </div>
              <div className="card__left">
                <div id="circle2">
                  <div className="inner" ref={myRef2}>
                    10
                  </div>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card__right">
                <p>عدد المسؤولين</p>
                <p>0</p>
              </div>
              <div className="card__left">
                <div id="circle3">
                  <div className="inner" ref={myRef3}>
                    0
                  </div>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card__right">
                <p>عدد الموظفين</p>
                <p>10</p>
              </div>
              <div className="card__left">
                <div id="circle4">
                  <div className="inner" ref={myRef4}>
                    10
                  </div>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card__right">
                <p>عدد المحاضرين</p>
                <p>10</p>
              </div>
              <div className="card__left">
                <div id="circle5">
                  <div className="inner" ref={myRef5}>
                    10
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
        <Footer />
      </div>
    </>
  );
}

export default Mastermain;
