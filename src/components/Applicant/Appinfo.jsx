import Lock from "../Lock";

function Appinfo() {
  return (
    <div className="Appinfo">
      <div className="Appinfo__in">
        <h2>معلومات طلب التقديم على الدبلومة</h2>
        <Lock
          name="kareem"
          id="11"
          bio="kareem"
          draft="kareem"
          draftfile="kareem"
          idcard="kareem"
          pay="kareem"
          cert="kareem"
          status="kareem"
          why="kareem"
          isEmp={false}
        />
      </div>
    </div>
  );
}

export default Appinfo;
