/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

function Pdetailsin({ Signed, data }) {
  const navigate = useNavigate();

  return (
    <div className="Pdetails__in">
      <h2>{data.name}</h2>
      <div className="Pdetails__in__about">
        <h4>عن الدبلومة</h4>
        <p>{data.description}</p>
      </div>
      {Signed ? (
        <button
          className="btnbtn"
          onClick={() => navigate("/applicant/application")}
        >
          سجل الآن
        </button>
      ) : (
        <button
          className="btnbtn"
          onClick={() => navigate("/applicant/appinfo")}
        >
          معلومات طلبك
        </button>
      )}
    </div>
  );
}

export default Pdetailsin;
