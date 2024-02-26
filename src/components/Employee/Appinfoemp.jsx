import Lock from "../Lock";

function Appinfoemp() {
  return (
    <div className="Appemp">
      <div className="Appemp__in">
        <h2>بيانات الطالب</h2>
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
          isEmp={true}
        />
        <div className="Appemp__in__btns">
          <button>إلغاء</button>
          <button className="btnbtn">إرسال</button>
        </div>
      </div>
    </div>
  );
}

export default Appinfoemp;
