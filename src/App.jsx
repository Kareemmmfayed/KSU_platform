import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
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
import Eprograms from "./components/Employee/Eprograms";
import AppLayout from "./components/AppLayout";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Spinner from "./components/Applicant/Spinner";
import { Toaster } from "react-hot-toast";
import DipYear from "./components/Admin/DipYear";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60,
      },
    },
  });

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
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/account" element={<AccountInfo />} />
            <Route
              element={
                <ProtectedRoutes>
                  <AppLayout />
                </ProtectedRoutes>
              }
            >
              <Route path="/applicant">
                <Route path="programs" element={<Programs />} />
                <Route path="programs/:diplomaId" element={<Pdetails />} />

                <Route path="programs/Adetails" element={<Apdetails />} />
                <Route
                  path="programs/:diplomaId/application"
                  element={<Application />}
                />
                <Route path="success" element={<Success />} />
                <Route path="diplomas" element={<Mydiplomas />} />
                <Route path="subjects" element={<Regsubs />} />
                <Route path="appinfo" element={<Appinfo />} />
              </Route>

              <Route path="/employee">
                <Route
                  path="programs"
                  element={<Eprograms pickDiplomaId={pickDiplomaId} />}
                />
                <Route
                  path="program/details"
                  element={<Eprogram diplomaId={diplomaId} />}
                />
                <Route path="Applicant/info" element={<Appinfoemp />} />
                <Route
                  path="applicants"
                  element={<Applicants diplomaId={diplomaId} />}
                />
              </Route>

              <Route path="lecturer">
                <Route path="table" element={<Table diplomaId={diplomaId} />} />
                <Route
                  path="subjects"
                  element={<Cric pickDiplomaId={pickDiplomaId} />}
                />
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
                  path="diplomas/:diplomaId/years"
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
                  path="diplomas/:diplomaId/years/:yearId/semesters/:semesterId/courses"
                  element={<Asubjects />}
                />
                <Route
                  path="payments"
                  element={<BeforePay pickPayId={pickPayId} />}
                />
                <Route
                  path="program/payments"
                  element={<Apay payId={payId} />}
                />
                <Route path="programs" element={<Aprogram />} />
                <Route
                  path="diplomas/:diplomaId/years/yearId/semesters"
                  element={<Semester />}
                />
                <Route path="DipYear" element={<DipYear />} />
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
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "white",
            color: "black",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
