import Header from "../Header";
import Footer from "../Footer";
import Pdetailsin from "./Pdetailsin";

function Apdetails() {
  const data = {
    name: "kareem",
    description: "intro",
    applying_fees: "1000",
    program_fees: "1000",
  };

  return (
    <div className="Apdetails">
      <Pdetailsin Signed={false} data={data} />
    </div>
  );
}

export default Apdetails;
