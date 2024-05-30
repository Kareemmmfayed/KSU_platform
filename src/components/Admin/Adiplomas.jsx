import home from "../../assets/home.png";
import plus from "../../assets/plusb.png";
import trash from "../../assets/trash.png";
import notchecked from "../../assets/notchecked.png";
import checked from "../../assets/checked.png";
import myFiles from "../../assets/files.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../services/AuthContext";
import { indexPrograms } from "../../services/admin/program";
import { createProgram } from "../../services/admin/program/create";
import { deleteProgram } from "../../services/admin/program/delete";
import { createProgramFile } from "../../services/admin/files/create";
import { indexYears } from "../../services/admin/year/index";
import { indexPayments } from "../../services/admin/payments/index";
import { AddPaymentToProgram } from "../../services/admin/payments/addPaymentToProgram";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Spinner from "../Applicant/Spinner";
import toast from "react-hot-toast";

function Adiplomas() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [show, setShow] = useState(false);
  const [del, setDelete] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const toggleCardState = (id) => {
    if (selectedCard === id) {
      setSelectedCard(null);
    } else {
      setSelectedCard(id);
    }
  };

  const [name, setName] = useState("");
  const [intro, setIntro] = useState("");
  const [stime, setStime] = useState("");
  const [ctime, setCtime] = useState("");

  const addItem = () => {
    setShow(true);
  };

  const empty = () => {
    setName("");
    setIntro("");
    setStime("");
    setCtime("");
  };

  const cancel = () => {
    empty();
    setShow(false);
  };

  const fetchData = async () => {
    const res = await indexPrograms(token);
    return res;
  };

  const { data: programs, isLoading } = useQuery({
    queryFn: fetchData,
    queryKey: ["programs"],
  });

  const fetchYears = async () => {
    const res = await indexYears(token);
    return res;
  };

  const { data: years } = useQuery({
    queryFn: fetchYears,
    queryKey: ["years"],
  });

  const fetchPayments = async () => {
    const res = await indexPayments(token);
    return res;
  };

  const { data: payments } = useQuery({
    queryFn: fetchPayments,
    queryKey: ["payments"],
  });

  const sub = async (e) => {
    e.preventDefault();
    await createProgram(
      token,
      name,
      intro,
      `${stime}T12:00:00`,
      `${ctime}T12:00:00`
    );
    setShow(false);
  };

  const dele = async () => {
    if (del && selectedCard) {
      await deleteProgram(token, selectedCard);
      setSelectedCard(null);
      setDelete(!del);
      toast.success("تم الحذف بنجاح");
    } else {
      setDelete(!del);
      setSelectedCard(null);
    }
  };

  const { mutate: subMutation, isSubmitting } = useMutation({
    mutationFn: (e) => sub(e),
    onSuccess: () => {
      queryClient.invalidateQueries("programs");
      toast.success("تمت الإضافة بنجاح");
    },
    onError: (error) => {
      console.log(error);
      toast.error("حدث خطأ ما");
    },
  });

  const { mutate: deleteMutation, isDeleting } = useMutation({
    mutationFn: dele,
    onSuccess: () => {
      queryClient.invalidateQueries("programs");
    },
    onError: (error) => {
      console.log(error);
      toast.error("حدث خطأ ما");
    },
  });

  const [fileName, setFileName] = useState("");
  const [fileType, setFileType] = useState("");
  const [programId, setProgramId] = useState("");

  const [files, setFiles] = useState(false);
  const [assignPayment, setAssignPayment] = useState(false);

  const onShowFiles = (id) => {
    setFiles(true);
    setProgramId(id);
  };

  const cancelFiles = () => {
    setFileName("");
    setFileType("");
    setFiles(false);
  };

  const addFile = (id) => {
    onShowFiles(id);
    setSelectedCard(null);
  };

  const addPayment = (id) => {
    setProgramId(id);
    setAssignPayment(true);
    setSelectedCard(null);
  };

  const subFile = async (e) => {
    e.preventDefault();
    await createProgramFile(token, programId, fileName, fileType);
    cancelFiles();
    toast.success("تمت الإضافة بنجاح");
  };

  const [selectedPayments, setSelectedPayments] = useState([]);
  const [prices, setPrices] = useState([]);

  const handleSelectChange = (event) => {
    const selectedPaymentId = event.target.value.split(",")[0];
    const selectedPaymentKind = event.target.value.split(",")[1];
    setSelectedPayments((prevState) => [
      ...prevState,
      { id: selectedPaymentId, name: selectedPaymentKind },
    ]);
  };

  const cancelAssigning = () => {
    setAssignPayment(false);
    setSelectedPayments([]);
    setPrices([]);
  };

  const handlePriceChange = (index, value) => {
    setPrices((prevPrices) => {
      const updatedPrices = [...prevPrices];
      updatedPrices[index] = Number(value);
      return updatedPrices;
    });
  };

  const deleteLastSelectedPayment = () => {
    setSelectedPayments((prevSelectedPayments) => {
      const updatedSelectedPayments = [...prevSelectedPayments];
      updatedSelectedPayments.pop();
      return updatedSelectedPayments;
    });

    setPrices((prevPrices) => {
      const updatedPrices = [...prevPrices];
      updatedPrices.pop();
      return updatedPrices;
    });
  };

  const [yearId, setYearId] = useState("");

  const extractIds = (array) => {
    return array.map((item) => item.id);
  };

  const AddToProgram = async (e) => {
    e.preventDefault();
    const idsOnly = extractIds(selectedPayments);
    await AddPaymentToProgram(token, programId, yearId, idsOnly, prices);
    cancelAssigning();
  };

  const { mutate: AssignPayment, isAssigning } = useMutation({
    mutationFn: (e) => AddToProgram(e),
    onSuccess: () => {
      toast.success("تم إضافة الرسوم بنجاح");
    },
    onError: (error) => {
      console.log(error);
      toast.error("حدث خطأ ما");
    },
  });

  if (isLoading || isDeleting || isSubmitting || isAssigning)
    return <Spinner />;

  return (
    <div className="Adiplomas">
      <div className="Adiplomas__in">
        <div className="Adiplomas__in__top">
          <button onClick={() => navigate("/admin/main")}>
            <img src={home} alt="home" />
          </button>
          <button onClick={addItem}>
            <img src={plus} alt="plus" />
          </button>
          <button onClick={deleteMutation} disabled={isDeleting}>
            <img src={trash} alt="trash" />
          </button>
        </div>
        <div className="Adiplomas__in__body">
          <div className="cards">
            {programs?.map((program) => (
              <div className={del ? "card delete" : "card"} key={program.id}>
                <h2>{program.name}</h2>
                {del ? (
                  <button
                    onClick={() => toggleCardState(program.id)}
                    className="this"
                  >
                    <img
                      src={selectedCard === program.id ? checked : notchecked}
                      alt="circle"
                    />
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => navigate(`${program.id}/years`)}
                      className="this"
                    ></button>
                    <button
                      className="files"
                      onClick={() => toggleCardState(program.id)}
                    >
                      <img src={myFiles} alt="Add files" />
                    </button>
                    {selectedCard == program.id && (
                      <div className="myList">
                        <ul>
                          <li>
                            <button onClick={() => addFile(program.id)}>
                              إضافة ملف
                            </button>
                          </li>
                          <li>
                            <button onClick={() => addPayment(program.id)}>
                              إضافة رسوم
                            </button>
                          </li>
                        </ul>
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
        {show && (
          <form onSubmit={subMutation}>
            <div>
              <label htmlFor="name">اسم البرنامج الدراسي :</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="intro">مقدمة عن البرنامج :</label>
              <input
                type="text"
                id="intro"
                value={intro}
                onChange={(e) => setIntro(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="time">موعد البداية :</label>
              <input
                type="text"
                id="time"
                value={stime}
                onChange={(e) => setStime(e.target.value)}
                placeholder="ex :- 2023-08-29"
                required
              />
            </div>
            <div>
              <label htmlFor="time">موعد النهاية :</label>
              <input
                type="text"
                id="time"
                value={ctime}
                onChange={(e) => setCtime(e.target.value)}
                placeholder="ex :- 2023-08-29"
                required
              />
            </div>
            <div>
              <button onClick={() => cancel()}>إلغاء</button>
              <button type="submit" className="btnbtn" disabled={isSubmitting}>
                إضافة
              </button>
            </div>
          </form>
        )}
        {files && (
          <form onSubmit={subFile} className="second">
            <div>
              <label htmlFor="fileName">اسم الملف :</label>
              <input
                type="text"
                id="fileName"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="intro">نوع الملف :</label>
              <select
                value={fileType}
                onChange={(e) => setFileType(e.target.value)}
                required
              >
                <option selected disabled></option>
                <option value="image/jpeg">jpeg</option>
                <option value="image/jpg">jpg</option>
                <option value="application/pdf">pdf</option>
              </select>
            </div>
            <div>
              <button onClick={() => cancelFiles()}>إلغاء</button>
              <button type="submit" className="btnbtn">
                إضافة
              </button>
            </div>
          </form>
        )}
        {assignPayment && (
          <form
            style={{ height: "80%" }}
            className="Assign"
            onSubmit={AssignPayment}
          >
            <div>
              <label htmlFor="year">العام الدراسي :</label>
              <select
                required
                id="year"
                value={yearId}
                onChange={(e) => setYearId(e.target.value)}
              >
                <option selected disabled></option>
                {years.map((year) => (
                  <option value={year.id} key={year.id}>
                    {year.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="payments">قائمة المدفوعات :</label>
              <select required id="payments" onChange={handleSelectChange}>
                <option selected></option>
                {payments
                  .filter(
                    (pay) =>
                      !selectedPayments.some(
                        (selected) => selected.id === pay.id
                      )
                  )
                  .map((pay) => (
                    <option
                      key={pay.id}
                      value={`${pay.id},${pay.payment_kind}`}
                    >
                      {pay.payment_kind}
                    </option>
                  ))}
              </select>
            </div>
            <div style={{ height: "146px" }}>
              <ul className="myList">
                {selectedPayments?.map((pay, index) => (
                  <div>
                    <li key={pay.id}>{pay.name}</li>
                    <input
                      type="number"
                      key={index}
                      value={prices[index]}
                      onChange={(e) => handlePriceChange(index, e.target.value)}
                      required
                    />
                  </div>
                ))}
                <div></div>
              </ul>
              <button
                onClick={() => deleteLastSelectedPayment()}
                className="dltBtn"
                type="button"
              >
                إحذف
              </button>
            </div>
            <div>
              <button onClick={() => cancelAssigning()}>إلغاء</button>
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

export default Adiplomas;
