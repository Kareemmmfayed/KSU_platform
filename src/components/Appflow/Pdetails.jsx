/* eslint-disable react/prop-types */
import Header from "../Header";
import Footer from "../Footer";
import Pdetailsin from "./Pdetailsin";

function Pdetails({ program }) {
  return (
    <>
      <Header name="< العودة" link="/" />
      <div className="Pdetails">
        <Pdetailsin Signed={true} program={program} />
        <Footer />
      </div>
    </>
  );
}

export default Pdetails;
