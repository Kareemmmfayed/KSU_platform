import home from "../../assets/home.png";
import plus from "../../assets/plusb.png";
import trash from "../../assets/trash.png";
import notchecked from "../../assets/notchecked.png";
import checked from "../../assets/checked.png";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../../services/AuthContext";
import { indexSemester } from "../../services/admin/semester/index";
import { createSemester } from "../../services/admin/semester/create";
import { deleteSemester } from "../../services/admin/semester/delete";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Spinner from "../Applicant/Spinner";
import toast from "react-hot-toast";

function Semester({ AdminDiplomaId, levelId, handleSemesterId }) {
  const { token } = useAuth();
  const navigate = useNavigate();
  // const queryClient = useQueryClient();

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

  const [name, setName] = useState("");

  const addItem = () => {
    setShow(true);
  };

  const cancel = () => {
    setName("");
    setShow(false);
  };

  const [semesters, setSemesters] = useState([]); //

  const fetchData = async () => {
    const data = await indexSemester(token, AdminDiplomaId, levelId);
    // return data;
    setSemesters(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // const { data: semesters, isLoading } = useQuery({
  //   queryFn: fetchData,
  //   queryKey: ["semesters"],
  // });

  const sub = async (e) => {
    e.preventDefault();
    await createSemester(token, AdminDiplomaId, levelId, name);
    setShow(false);
    fetchData(); //
    toast.success("تمت الإضافة بنجاح");
    setName("");
  };

  // const { mutate: subMutation, isSubmitting } = useMutation({
  //   mutationFn: (e) => sub(e),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries("semesters");
  //     toast.success("تمت الإضافة بنجاح");
  //   },
  //   onError: (error) => {
  //     console.log(error);
  //     toast.error("حدث خطأ ما");
  //   },
  // });

  const dele = async () => {
    if (del && selectedCard) {
      await deleteSemester(token, AdminDiplomaId, levelId, selectedCard);
      setSelectedCard(null);
      setDelete(!del);
      toast.success("تم الحذف بنجاح");
      fetchData();
    } else {
      setDelete(!del);
      setSelectedCard(null);
    }
  };

  // const { mutate: deleteMutation, isDeleting } = useMutation({
  //   mutationFn: dele,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries("semesters");
  //   },
  //   onError: (error) => {
  //     console.log(error);
  //     toast.error("حدث خطأ ما");
  //   },
  // });

  const handleClick = (id) => {
    handleSemesterId(id);
    navigate("/admin/subjects");
  };

  // if (isLoading || isDeleting || isSubmitting) return <Spinner />;

  return (
    <div className="Ayear">
      <div className="Ayear__in">
        <div className="Ayear__in__top">
          <button onClick={() => navigate("/admin/main")}>
            <img src={home} alt="home" />
          </button>
          <button onClick={addItem}>
            <img src={plus} alt="plus" />
          </button>
          <button onClick={dele}>
            <img src={trash} alt="trash" />
          </button>
        </div>
        <div className="Ayear__in__body">
          <div className="cards">
            {semesters?.map((sem) => (
              <div className={del ? "card delete" : "card"} key={sem.id}>
                <p>{sem.name}</p>
                {del ? (
                  <button onClick={() => toggleCardState(sem.id)}>
                    <img
                      src={selectedCard === sem.id ? checked : notchecked}
                      alt="circle"
                    />
                  </button>
                ) : (
                  <button onClick={() => handleClick(sem.id)}></button>
                )}
              </div>
            ))}
          </div>
        </div>
        {show && (
          <form onSubmit={sub}>
            <div>
              <label htmlFor="name">إسم السمستر :</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <button onClick={() => cancel()}>إلغاء</button>
              <button type="submit" className="btnbtn">
                إضافة
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Semester;
