import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Appflow/Home";
import Signin from "./components/Appflow/Signin";
import Signup from "./components/Appflow/Signup";
import Success from "./components/Appflow/Success";
import Application from "./components/Appflow/Application";
import Programs from "./components/Appflow/Programs";
import Applicants from "./components/Empflow/Applicants";
import Table from "./components/Lecturer/Table";
import Cric from "./components/Lecturer/Cric";
import AccountInfo from "./components/Appflow/AccountInfo";
import Mydiplomas from "./components/Appflow/Mydiplomas";
import Regsubs from "./components/Appflow/Regsubs";
import Appinfo from "./components/Appflow/Appinfo";
import Appinfoemp from "./components/Empflow/Appinfoemp";
import Addmain from "./components/Admin/Addmain";
import Mastermain from "./components/Master/Mastermain";
import Adiplomas from "./components/Admin/Adiplomas";
import Aemp from "./components/Admin/Aemp";
import Alect from "./components/Admin/Alect";
import Asubjects from "./components/Admin/Asubjects";
import Ayear from "./components/Admin/Ayear";
import Apay from "./components/Admin/Apay";
import Aprogram from "./components/Admin/Aprogram";
import Mcollege from "./components/Master/Mcollege";
import Madmin from "./components/Master/Madmin";
import Pdetails from "./components/Appflow/Pdetails";
import Apdetails from "./components/Appflow/Apdetails";
import Eprogram from "./components/Empflow/Eprogram";
import { useState } from "react";
import AppLayout from "./components/AppLayout";
import ProtectedRoutes from "./components/ProtectedRoutes";

function App() {
  const [diplomaId, setDiplomaId] = useState();

  const pickDiplomaId = (id) => {
    setDiplomaId(id);
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
              <Route path="diplomas" element={<Adiplomas />} />
              <Route path="employees" element={<Aemp />} />
              <Route path="lecturers" element={<Alect />} />
              <Route path="subjects" element={<Asubjects />} />
              <Route path="years" element={<Ayear />} />
              <Route path="payments" element={<Apay />} />
              <Route path="programs" element={<Aprogram />} />
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
