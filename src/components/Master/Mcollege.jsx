import home from "../../assets/home.png";
import plus from "../../assets/plusb.png";
import trash from "../../assets/trash.png";
import checked from "../../assets/checked.png";
import notchecked from "../../assets/notchecked.png";
import col from "../../assets/Collage.webp";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../services/AuthContext";
import { indexColleges } from "../../services/master/college/index";
import { createCollege } from "../../services/master/college/create";
import { deleteCollege } from "../../services/master/college/delete";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Spinner from "../Applicant/Spinner";
import toast from "react-hot-toast";

function Mcollege() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

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

  const [faculty, setFaculty] = useState("");
  const [college, setCollege] = useState("");

  const addItem = () => {
    setShow(true);
  };

  const empty = () => {
    setFaculty("");
    setCollege("");
  };

  const cancel = () => {
    empty();
    setShow(false);
  };

  const fetchColleges = async () => {
    const data = await indexColleges(token);
    return data;
  };

  const { data: colleges, isLoading } = useQuery({
    queryFn: fetchColleges,
    queryKey: ["colleges"],
  });

  const sub = async (e) => {
    e.preventDefault();
    await createCollege(token, faculty, college);
    setShow(false);
    empty();
  };

  const { mutate: create, isCreating } = useMutation({
    mutationFn: (e) => sub(e),
    onSuccess: () => {
      queryClient.invalidateQueries("colleges");
      toast.success("تمت الإضافة بنجاح");
    },
    onError: (error) => {
      console.log(error);
      toast.error("حدث خطأ ما");
    },
  });

  const dele = async () => {
    if (del && selectedCard) {
      await deleteCollege(token, selectedCard);
      setSelectedCard(null);
      toast.success("تم الحذف بنجاح");
      setDelete(!del);
    } else {
      setDelete(!del);
      setSelectedCard(null);
    }
  };

  const { mutate: deleteColl, isDeleting } = useMutation({
    mutationFn: dele,
    onSuccess: () => {
      queryClient.invalidateQueries("colleges");
    },
    onError: (error) => {
      console.log(error);
      toast.error("حدث خطأ ما");
    },
  });

  if (isLoading || isDeleting || isCreating) return <Spinner />;

  return (
    <div className="Mcollege">
      <div className="Mcollege__in">
        <div className="Mcollege__in__top">
          <button onClick={() => navigate("/master/main")}>
            <img src={home} alt="home" />
          </button>
          <button onClick={addItem}>
            <img src={plus} alt="plus" />
          </button>
          <button onClick={deleteColl} disabled={isDeleting}>
            <img src={trash} alt="trash" />
          </button>
        </div>
        <div className="Mcollege__in__body">
          <div className="cards">
            {colleges?.map((college) => (
              <div
                className={del ? "card delete" : "card"}
                key={college.id}
                onClick={() => toggleCardState(college.id)}
              >
                <img src={col} alt="college" />
                <h2>{college.name}</h2>
                {del && (
                  <button>
                    <img
                      src={selectedCard === college.id ? checked : notchecked}
                      alt="circle"
                      className="notcopy"
                    />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
        {show && (
          <form onSubmit={create}>
            <div>
              <label htmlFor="name">اسم الكلية :</label>
              <input
                type="text"
                id="name"
                value={faculty}
                onChange={(e) => setFaculty(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="faculty">اسم الجامعة :</label>
              <input
                type="text"
                id="faculty"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
              />
            </div>
            <div>
              <button onClick={() => cancel()}>إلغاء</button>
              <button className="btnbtn" disabled={isCreating}>
                إضافة
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Mcollege;
