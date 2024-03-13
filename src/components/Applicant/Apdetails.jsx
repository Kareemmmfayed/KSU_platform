import Pdetailsin from "./Pdetailsin";

function Apdetails() {
  const data = {
    name: "دبلومة كذا",
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
