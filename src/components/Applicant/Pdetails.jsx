/* eslint-disable react/prop-types */
import Header from "../Header";
import Footer from "../Footer";
import Pdetailsin from "./Pdetailsin";
import { useState, useEffect } from "react";
import { showProgram } from "../../services/applicant/program/show";
import { useAuth } from "../../services/AuthContext";

function Pdetails({ diplomaId }) {
  const { token } = useAuth();

  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const res = await showProgram(token, diplomaId);
      setData(res);
    };

    fetchData();
  }, []);

  return (
    <div className="Pdetails">
      <Pdetailsin Signed={true} data={data} />
    </div>
  );
}

export default Pdetails;
