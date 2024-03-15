import home from "../../assets/home.png";
import plus from "../../assets/plusb.png";
import trash from "../../assets/trash.png";
import checked from "../../assets/checked.png";
import notchecked from "../../assets/notchecked.png";
import copy from "../../assets/copy.png";
import lect from "../../assets/lect.png";
import { useAuth } from "../../services/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { indexCourse } from "../../services/admin/course/index";
import { createCourse } from "../../services/admin/course/create";
import { deleteCourse } from "../../services/admin/course/delete";
import { indexLecturer } from "../../services/admin/lecturer/index";
import { indexYears } from "../../services/admin/year/index";
import { AssignCourseToAdmin } from "../../services/admin/course/assignCourseToAdmin";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Spinner from "../Applicant/Spinner";
import toast from "react-hot-toast";

function Asubjects() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { diplomaId, yearId, semesterId } = useParams();
  const [lecturers, setLecturers] = useState([]);
  const [years, setYears] = useState([]);

  const fetchData = async () => {
    const data = await indexCourse(token, diplomaId, yearId, semesterId);
    return data;
  };

  useEffect(() => {
    const fetchThedata = async () => {
      const data1 = await indexLecturer(token);
      setLecturers(data1);

      const data2 = await indexYears(token);
      setYears(data2);
    };
    fetchThedata();
  }, []);

  const { data: subjects, isLoading } = useQuery({
    queryFn: fetchData,
    queryKey: [`courses${semesterId}`],
  });

  const [show, setShow] = useState(false);
  const [del, setDelete] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const toggleCardState = (id) => {
    if (del) {
      if (selectedCard === id) {
        setSelectedCard(null);
      } else {
        setSelectedCard(id);
      }
    }
  };

  const addItem = () => {
    setShow(true);
  };

  const [name, setName] = useState("");
  const [hours, setHours] = useState("");
  const [code, setCode] = useState("");

  const clear = () => {
    setName("");
    setHours("");
    setCode("");
  };

  const cancel = () => {
    clear();
    setShow(false);
  };

  const sub = async (e) => {
    e.preventDefault();
    await createCourse(
      token,
      diplomaId,
      yearId,
      semesterId,
      name,
      Number(hours),
      code
    );
    fetchData();
    setShow(false);
    clear();
  };

  const { mutate: subMutation, isSubmitting } = useMutation({
    mutationFn: (e) => sub(e),
    onSuccess: () => {
      queryClient.invalidateQueries(`courses${semesterId}`);
      toast.success("تمت الإضافة بنجاح");
    },
    onError: (error) => {
      console.log(error);
      toast.error("حدث خطأ ما");
    },
  });

  const dele = async () => {
    if (del && selectedCard) {
      await deleteCourse(token, diplomaId, yearId, semesterId, selectedCard);
      setSelectedCard(null);
      setDelete(!del);
      fetchData();
    } else {
      setDelete(!del);
      setSelectedCard(null);
    }
  };

  const { mutate: deleteMutation, isDeleting } = useMutation({
    mutationFn: dele,
    onSuccess: () => {
      queryClient.invalidateQueries(`courses${semesterId}`);
    },
    onError: (error) => {
      console.log(error);
      toast.error("حدث خطأ ما");
    },
  });

  const copycontent = (content) => {
    navigator.clipboard.writeText(content);
  };

  const [select, setSelect] = useState(false);
  const [subId, setSubId] = useState("");
  const [lecturerId, setLecturerId] = useState("");
  const [dyear, setDyear] = useState("");

  const handleSelect = (id) => {
    setSelect(true);
    setSubId(id);
  };

  const subL = async (e) => {
    e.preventDefault();
    await AssignCourseToAdmin(
      token,
      diplomaId,
      yearId,
      semesterId,
      subId,
      lecturerId,
      dyear
    );
    setSelect(false);
  };

  if (isLoading || isDeleting || isSubmitting) return <Spinner />;

  return (
    <div className="Asubjects">
      <div className="Asubjects__in">
        <div className="Asubjects__in__top">
          <button onClick={() => navigate("/admin/main")}>
            <img src={home} alt="home" />
          </button>
          <button onClick={addItem}>
            <img src={plus} alt="plus" />
          </button>
          <button onClick={deleteMutation}>
            <img src={trash} alt="trash" />
          </button>
        </div>
        <div className="Asubjects__in__body">
          <div className="cards">
            {subjects?.map((sub) => (
              <div className={del ? "card delete" : "card"} key={sub.id}>
                <h2>إسم المقرر : {sub.name}</h2>
                <p>كود المقرر : {sub.code}</p>
                <p>عدد الساعات المعتمدة : {sub.credit_hours}</p>
                {del && (
                  <button
                    onClick={() => toggleCardState(sub.id)}
                    className="del"
                  >
                    <img
                      src={selectedCard === sub.id ? checked : notchecked}
                      alt="circle"
                    />
                  </button>
                )}
                {!del && (
                  <>
                    <button
                      onClick={() =>
                        copycontent(
                          `إسم المقرر: ${sub.name}\nكود المقرر: ${sub.code}\nعدد الساعات المعتمدة: ${sub.credit_hours}`
                        )
                      }
                    >
                      <img src={copy} alt="circle" />
                    </button>
                    <button onClick={() => handleSelect(sub.id)}>
                      <img src={lect} alt="Pick a lecturer" />
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
        {show && (
          <form onSubmit={subMutation}>
            <div>
              <label htmlFor="name">اسم المقرر :</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="faculty">كود المقرر :</label>
              <input
                type="text"
                id="faculty"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="mail">عدد الساعات المعتمدة :</label>
              <input
                type="text"
                id="mail"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                required
              />
            </div>
            <div>
              <button onClick={() => cancel()}>إلغاء</button>
              <button className="btnbtn">إضافة</button>
            </div>
          </form>
        )}
        {select && (
          <form style={{ height: "265px" }}>
            <div>
              <label>إختر المحاضر المناسب :</label>
              <select
                value={lecturerId}
                onChange={(e) => setLecturerId(e.target.value)}
              >
                <option selected disabled></option>
                {lecturers.map((lect) => (
                  <option key={lect.id} value={lect.id}>
                    {lect.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>السنة الدراسية :</label>
              <select
                value={dyear}
                onChange={(e) => setDyear(e.target.value)}
                required
              >
                <option selected disabled></option>
                {years.map((year) => (
                  <option key={year.id} value={year.id}>
                    {year.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <button onClick={() => setSelect(false)}>إلغاء</button>
              <button className="btnbtn" onClick={subL}>
                إضافة
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Asubjects;
