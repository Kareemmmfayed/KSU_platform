/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { showProgram } from "../../services/applicant/program/show";
import { useAuth } from "../../services/AuthContext";

function Pdetailsin({ Signed }) {
  const { token, dip } = useAuth();
  const navigate = useNavigate();

  const [data, setData] = useState();

  const fetchData = async () => {
    const res = await showProgram(token, dip);
    setData(res);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toApp = () => {
    navigate("/application");
  };

  const toData = () => {
    navigate("/appinfo");
  };

  return (
    <div className="Pdetails__in">
      <h2>{data.name}</h2>
      <div className="Pdetails__in__about">
        <h4>عن الدبلومة</h4>
        <p>{data.description}</p>
      </div>
      <div className="Pdetails__in__req">
        <h4>متطلبات القبول</h4>
        <ul>
          <li>حاصل على شهادة البكالوريوس في أي تخصص ذي صلة.</li>
          <li>سجل أكاديمي جيد.</li>
          <li>
            إجادة اللغة الإنجليزية مثبتة من خلال اختبارات معترف بها (TOEFL أو
            IELTS).
          </li>
          <li>رسالة توصية من أستاذ سابق أو مشرف أكاديمي.</li>
          <li>مقابلة شخصية لتقييم المهارات والمؤهلات.</li>
        </ul>
      </div>
      <div className="Pdetails__in__pay">
        <h4>رسوم البرنامج</h4>
        <ul>
          <li>رسوم التقديم: {data.applying_fees} (غير قابلة للاسترداد).</li>
          <li>رسوم الدراسة: {data.program_fees}.</li>
          <li>رسوم الكتب والمواد: تتفاوت حسب المقررات والمتطلبات.</li>
        </ul>
      </div>
      <div className="Pdetails__in__time">
        <h4>مدة البرنامج</h4>
        <ul>
          <li>عامين دراسيين</li>
          <li>أربعة فصول دراسية.</li>
        </ul>
      </div>
      {Signed ? (
        <button className="btnbtn" onClick={toApp}>
          سجل الآن
        </button>
      ) : (
        <button className="btnbtn" onClick={toData}>
          معلومات طلبك
        </button>
      )}
    </div>
  );
}

export default Pdetailsin;
