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

function App() {
  const [program, setProgram] = useState();

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/programs"
            element={<Programs setDiploma={setProgram} />}
          />
          <Route
            path="/programs/details"
            element={<Pdetails diploma={program} />}
          />
          <Route path="/programs/Adetails" element={<Apdetails />} />
          <Route path="/application" element={<Application />} />
          <Route path="/success" element={<Success />} />
          <Route path="/account" element={<AccountInfo />} />
          <Route path="/diplomas" element={<Mydiplomas />} />
          <Route path="/subjects" element={<Regsubs />} />
          <Route path="/employee/programs/details" element={<Eprogram />} />
          <Route path="/applicants" element={<Applicants />} />
          <Route path="/appinfo" element={<Appinfo />} />
          <Route path="/employee/Applicant/info" element={<Appinfoemp />} />
          <Route path="/lecturer/table" element={<Table />} />
          <Route path="/Subjects" element={<Cric />} />
          <Route path="/admin/main" element={<Addmain />} />
          <Route path="/admin/diplomas" element={<Adiplomas />} />
          <Route path="/admin/employees" element={<Aemp />} />
          <Route path="/admin/lecturers" element={<Alect />} />
          <Route path="/admin/subjects" element={<Asubjects />} />
          <Route path="/admin/years" element={<Ayear />} />
          <Route path="/admin/payments" element={<Apay />} />
          <Route path="/admin/programs" element={<Aprogram />} />
          <Route path="/master/main" element={<Mastermain />} />
          <Route path="/master/colleges" element={<Mcollege />} />
          <Route path="/master/admins" element={<Madmin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
