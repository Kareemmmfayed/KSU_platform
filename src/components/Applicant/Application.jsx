import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../services/AuthContext";
import { useState } from "react";
import { indexProgramFiles } from "../../services/applicant/files";
import { createApplication } from "../../services/applicant/application/create";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../Applicant/Spinner";

function Application() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const { diplomaId } = useParams();

  const [myFiles, setMyFiles] = useState([]);

  const fetchData = async () => {
    const files = await indexProgramFiles(token, diplomaId);
    return files;
  };

  const { data: files, isLoading } = useQuery({
    queryFn: fetchData,
    queryKey: ["files"],
  });

  const onSub = async (e) => {
    e.preventDefault();
    await createApplication(token, diplomaId, myFiles);
  };

  const handleFileChange = (event, index) => {
    const updatedFiles = [...myFiles];
    updatedFiles[index] = event.target.files[index];
    setMyFiles(updatedFiles);
    console.log(myFiles);
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="Application">
      <div className="Application__inner">
        <div className="Application__inner__form col-lg-5 col-md-6 col-12">
          <h2>إستمارة طلب التقديم</h2>
          <form onSubmit={onSub}>
            {files?.map((file, index) => (
              <div key={file.id}>
                <label htmlFor={`up-${index}`}>
                  <p>{file.name}</p>
                </label>
                <input
                  type="file"
                  id={`up-${index}`}
                  value={myFiles[index]}
                  onChange={(e) => handleFileChange(e, index)}
                />
              </div>
            ))}
            <div className="btns">
              <button className="left">حفظ</button>
              <button
                className="right btnbtn"
                onClick={() => navigate("/applicant/success")}
              >
                إرسال
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Application;
