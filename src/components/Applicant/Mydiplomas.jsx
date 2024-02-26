import Diploma from "../Diploma";

function Mydiplomas() {
  const diplomas = [
    ["دبلومة كذا", "كلية التجارة", "1/9/2023 - 30/9/2023", "مقبول"],
    ["دبلومة كذا", "كلية التجارة", "1/9/2023 - 30/9/2023", "مقبول"],
    ["دبلومة كذا", "كلية التجارة", "1/9/2023 - 30/9/2023", "مقبول"],
  ];
  return (
    <div className="Mydiplomas">
      <Diploma diplomas={diplomas} show={true} />
    </div>
  );
}

export default Mydiplomas;
