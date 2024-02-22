import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Home from "./components/Applicant/Home";
import Signin from "./components/Applicant/Signin";
import Signup from "./components/Applicant/Signup";
import Success from "./components/Applicant/Success";
import Application from "./components/Applicant/Application";
import Programs from "./components/Applicant/Programs";
import Applicants from "./components/Employee/Applicants";
import Table from "./components/Lecturer/Table";
import Cric from "./components/Lecturer/Cric";
import AccountInfo from "./components/Applicant/AccountInfo";
import Mydiplomas from "./components/Applicant/Mydiplomas";
import Regsubs from "./components/Applicant/Regsubs";
import Appinfo from "./components/Applicant/Appinfo";
import Appinfoemp from "./components/Employee/Appinfoemp";
import Addmain from "./components/Admin/Addmain";
import Mastermain from "./components/Master/Mastermain";
import Adiplomas from "./components/Admin/Adiplomas";
import Aemp from "./components/Admin/Aemp";
import Alect from "./components/Admin/Alect";
import Asubjects from "./components/Admin/Asubjects";
import Ayear from "./components/Admin/Ayear";
import Aprogram from "./components/Admin/Aprogram";
import Mcollege from "./components/Master/Mcollege";
import Madmin from "./components/Master/Madmin";
import Pdetails from "./components/Applicant/Pdetails";
import Apdetails from "./components/Applicant/Apdetails";
import Eprogram from "./components/Employee/Eprogram";
import Semester from "./components/Admin/Semester";
import BeforePay from "./components/Admin/BeforePay";
import Apay from "./components/Admin/Apay";
// import AppLayout from "./components/AppLayout";
// import ProtectedRoutes from "./components/ProtectedRoutes";

function App() {
  const [diplomaId, setDiplomaId] = useState();

  const pickDiplomaId = (id) => {
    setDiplomaId(id);
  };

  const [AdminDiplomaId, setAdminDiplomaId] = useState();

  const handleAdminDiplomaId = (id) => {
    setAdminDiplomaId(id);
  };

  const [levelId, setLevelId] = useState();

  const handleLevelId = (id) => {
    setLevelId(id);
  };

  const [semesterId, setSemesterId] = useState();

  const handleSemesterId = (id) => {
    setSemesterId(id);
  };

  const [payId, setPayId] = useState();

  const pickPayId = (id) => {
    setPayId(id);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            element={
              <ProtectedRoutes>
                <AppLayout />
              </ProtectedRoutes>
            }
          >
            <Route path="/applicant">
              <Route
                path="programs"
                element={<Programs pickDiplomaId={pickDiplomaId} />}
              />
              <Route
                path="programs/details"
                element={<Pdetails diplomaId={diplomaId} />}
              />
              <Route path="programs/Adetails" element={<Apdetails />} />
              <Route path="application" element={<Application />} />
              <Route path="success" element={<Success />} />
              <Route path="account" element={<AccountInfo />} />
              <Route path="diplomas" element={<Mydiplomas />} />
              <Route path="subjects" element={<Regsubs />} />
              <Route path="applicants" element={<Applicants />} />
              <Route path="appinfo" element={<Appinfo />} />
            </Route>

            <Route path="/employee">
              <Route
                path="programs/details"
                element={<Eprogram diplomaId={diplomaId} />}
              />
              <Route path="Applicant/info" element={<Appinfoemp />} />
            </Route>

            <Route path="lecturer">
              <Route path="table" element={<Table />} />
              <Route path="subjects" element={<Cric />} />
            </Route>

            <Route path="/admin">
              <Route path="main" element={<Addmain />} />
              <Route
                path="diplomas"
                element={
                  <Adiplomas handleAdminDiplomaId={handleAdminDiplomaId} />
                }
              />
              <Route
                path="years"
                element={
                  <Ayear
                    AdminDiplomaId={AdminDiplomaId}
                    handleSemesterId={handleSemesterId}
                    handleLevelId={handleLevelId}
                  />
                }
              />
              <Route path="employees" element={<Aemp />} />
              <Route path="lecturers" element={<Alect />} />
              <Route
                path="subjects"
                element={
                  <Asubjects
                    AdminDiplomaId={AdminDiplomaId}
                    levelId={levelId}
                    semesterId={semesterId}
                  />
                }
              />
              <Route
                path="payments"
                element={<BeforePay pickPayId={pickPayId} />}
              />
              <Route path="program/payments" element={<Apay payId={payId} />} />
              <Route path="programs" element={<Aprogram />} />
              <Route
                path="semesters"
                element={
                  <Semester
                    AdminDiplomaId={AdminDiplomaId}
                    semesterId={semesterId}
                    levelId={levelId}
                    handleSemesterId={handleSemesterId}
                  />
                }
              />
            </Route>

            <Route path="/master">
              <Route path="main" element={<Mastermain />} />
              <Route path="colleges" element={<Mcollege />} />
              <Route path="admins" element={<Madmin />} />
            </Route>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
