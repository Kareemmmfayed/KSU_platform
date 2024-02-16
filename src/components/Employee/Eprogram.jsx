/* eslint-disable react/prop-types */
import Header from "../Header";
import Footer from "../Footer";
import plus from "../../assets/plus.png";
import { useNavigate } from "react-router-dom";
import { showEmployeeProgram } from "../../services/employee/program/show";
import { useState, useEffect } from "react";
import { useAuth } from "../../services/AuthContext";

function Eprogram({ diplomaId }) {
  const navigate = useNavigate();

  const { token } = useAuth();

  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const res = await showEmployeeProgram(token, diplomaId);
      setData(res);
    };

    fetchData();
  }, []);

  return (
    <>
      <Header name="< العودة" link="/" />
      <div className="Eprogram">
        <div className="Eprogram__in">
          <h2>{data.name}</h2>
          <div className="Eprogram__in__about">
            <h4>عن الدبلومة</h4>
            <p>{data.description}</p>
          </div>
          <div className="Eprogram__in__add">
            <button>
              <img src={plus} alt="plus" />
              <p>العام الدراسي الاول</p>
            </button>
            <button>
              <img src={plus} alt="plus" />
              <p>العام الدراسي الثاني</p>
            </button>
          </div>
          <button className="btnbtn" onClick={() => navigate("/applicants")}>
            الطلبة المتقدمون
          </button>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Eprogram;
