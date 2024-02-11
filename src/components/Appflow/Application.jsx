import Header from "../Header";
import Footer from "../Footer";
import up from "../../assets/upload.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Application() {
  const navigate = useNavigate();

  const [uploads, setUploads] = useState({
    one: false,
    two: false,
    three: false,
    four: false,
    five: false,
    six: false,
    seven: false,
  });

  const handleFileUpload = (id) => {
    setUploads({ ...uploads, [id]: true });
  };

  return (
    <>
      <Header name="< العودة" link="/" />
      <div className="Application">
        <div className="Application__inner">
          <div className="Application__inner__form col-lg-5 col-md-6 col-12">
            <h2>إستمارة طلب التقديم</h2>
            <form>
              <div
                style={
                  uploads.one
                    ? { border: "2px solid green" }
                    : { border: "1px solid grey" }
                }
              >
                <label htmlFor="one">
                  <p>شهادة البكالوريوس</p>
                  <img src={up} alt="upload" />
                </label>
                <input
                  type="file"
                  id="one"
                  onChange={() => handleFileUpload("one")}
                />
              </div>
              <div
                style={
                  uploads.two
                    ? { border: "2px solid green" }
                    : { border: "1px solid grey" }
                }
              >
                <label htmlFor="two">
                  <p>شهادة المؤهل / آخرى</p>
                  <img src={up} alt="upload" />
                </label>
                <input
                  type="file"
                  id="two"
                  onChange={() => handleFileUpload("two")}
                />
              </div>
              <div
                style={
                  uploads.three
                    ? { border: "2px solid green" }
                    : { border: "1px solid grey" }
                }
              >
                <label htmlFor="three">
                  <p>السيرة الذاتية</p>
                  <img src={up} alt="upload" />
                </label>
                <input
                  type="file"
                  id="three"
                  onChange={() => handleFileUpload("three")}
                />
              </div>
              <div
                style={
                  uploads.four
                    ? { border: "2px solid green" }
                    : { border: "1px solid grey" }
                }
              >
                <label htmlFor="four">
                  <p>الموقف من التجنيد</p>
                  <img src={up} alt="upload" />
                </label>
                <input
                  type="file"
                  id="four"
                  onChange={() => handleFileUpload("four")}
                />
              </div>
              <select>
                <option disabled selected>
                  الموقف من التجنيد
                </option>
                <option value="">one</option>
                <option value="">two</option>
              </select>
              <div
                style={
                  uploads.five
                    ? { border: "2px solid green" }
                    : { border: "1px solid grey" }
                }
              >
                <label htmlFor="five">
                  <p>بيان الموقف من التجنيد</p>
                  <img src={up} alt="upload" />
                </label>
                <input
                  type="file"
                  id="five"
                  onChange={() => handleFileUpload("five")}
                />
              </div>
              <div
                style={
                  uploads.six
                    ? { border: "2px solid green" }
                    : { border: "1px solid grey" }
                }
              >
                <label htmlFor="six">
                  <p>البطاقة الشخصية</p>
                  <img src={up} alt="upload" />
                </label>
                <input
                  type="file"
                  id="six"
                  onChange={() => handleFileUpload("six")}
                />
              </div>
              <div
                style={
                  uploads.seven
                    ? { border: "2px solid green" }
                    : { border: "1px solid grey" }
                }
              >
                <label htmlFor="seven">
                  <p>إيصال الدفع</p>
                  <img src={up} alt="upload" />
                </label>
                <input
                  type="file"
                  id="seven"
                  onChange={() => handleFileUpload("seven")}
                />
              </div>
              <div className="btns">
                <button className="left">حفظ</button>
                <button
                  className="right btnbtn"
                  onClick={() => navigate("/success")}
                >
                  إرسال
                </button>
              </div>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Application;
