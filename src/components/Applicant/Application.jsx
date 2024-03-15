import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../services/AuthContext";
import { useState } from "react";
import { indexProgramFiles } from "../../services/applicant/files";
import { createApplication } from "../../services/applicant/application/create";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../Applicant/Spinner";
import { useForm } from "react-hook-form";

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

  const onSub = async (values) => {
    console.log(values);
    const { up_ } = values;
    // await createApplication(token, diplomaId, values);
  };

  const { register, handleSubmit, errors, getValues, getFieldState } =
    useForm();

  console.log(getValues());
  console.log(getFieldState());

  if (isLoading) return <Spinner />;

  return (
    <div className="Application">
      <div className="Application__inner">
        <div className="Application__inner__form col-lg-5 col-md-6 col-12">
          <h2>إستمارة طلب التقديم</h2>
          <form onSubmit={handleSubmit(onSub)}>
            {files?.map((file, index) => (
              <div key={file.id}>
                <label htmlFor={`up-${index}`}>
                  <p>{file.name}</p>
                </label>
                <input
                  type="file"
                  id={`up-${index}`}
                  {...register(`up-${index}`)}
                />
              </div>
            ))}
            <div className="btns">
              <button className="left">حفظ</button>
              <button
                className="right btnbtn"
                // onClick={() => navigate("/applicant/success")}
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
