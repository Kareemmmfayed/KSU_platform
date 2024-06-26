import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../services/AuthContext";
import { indexProgramFiles } from "../../services/applicant/files";
import { createApplication } from "../../services/applicant/application/create";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import Spinner from "../Applicant/Spinner";
import toast from "react-hot-toast";

function Application() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const { diplomaId } = useParams();

  const fetchData = async () => {
    const files = await indexProgramFiles(token, diplomaId);
    return files;
  };

  const { data: files, isLoading } = useQuery({
    queryFn: fetchData,
    queryKey: ["files"],
  });

  const onSub = async (values) => {
    const response = await createApplication(token, diplomaId, values.files);
    if (response) {
      navigate("/applicant/success");
    } else {
      toast.error(" حدث خطأ ما");
    }
  };

  const { register, handleSubmit } = useForm();

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
                  {...register(`files.${index}`)}
                  required
                  accept={file.type}
                />
              </div>
            ))}
            <div className="btns">
              <button className="left">حفظ</button>
              <button className="right btnbtn">إرسال</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Application;
