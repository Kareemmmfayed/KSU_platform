import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { Suspense, lazy } from "react";
import AppLayout from "./components/AppLayout";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Spinner from "./components/Applicant/Spinner";
const Signin = lazy(() => import("./components/Applicant/Signin"));
const Signup = lazy(() => import("./components/Applicant/Signup"));
const Home = lazy(() => import("./components/Applicant/Home"));
const Mastermain = lazy(() => import("./components/Master/Mastermain"));
const Mcollege = lazy(() => import("./components/Master/Mcollege"));
const Madmin = lazy(() => import("./components/Master/Madmin"));
const Addmain = lazy(() => import("./components/Admin/Addmain"));
const Adiplomas = lazy(() => import("./components/Admin/Adiplomas"));
const Aemp = lazy(() => import("./components/Admin/Aemp"));
const Alect = lazy(() => import("./components/Admin/Alect"));
const Apay = lazy(() => import("./components/Admin/Apay"));
const Ayear = lazy(() => import("./components/Admin/Ayear"));
const Semester = lazy(() => import("./components/Admin/Semester"));
const Asubjects = lazy(() => import("./components/Admin/Asubjects"));
const DipYear = lazy(() => import("./components/Admin/DipYear"));
const Cric = lazy(() => import("./components/Lecturer/Cric"));
const Table = lazy(() => import("./components/Lecturer/Table"));
const Applicants = lazy(() => import("./components/Employee/Applicants"));
const Appinfoemp = lazy(() => import("./components/Employee/Appinfoemp"));
const Appinfo = lazy(() => import("./components/Applicant/Appinfo"));
const Programs = lazy(() => import("./components/Applicant/Programs"));
const Mydiplomas = lazy(() => import("./components/Applicant/Mydiplomas"));
const Pdetails = lazy(() => import("./components/Applicant/Pdetails"));
const AccountInfo = lazy(() => import("./components/Applicant/AccountInfo"));
const Application = lazy(() => import("./components/Applicant/Application"));
const Success = lazy(() => import("./components/Applicant/Success"));
const Apdetails = lazy(() => import("./components/Applicant/Apdetails"));
const Regsubs = lazy(() => import("./components/Applicant/Regsubs"));
const EmpPrograms = lazy(() => import("./components/Employee/EmpPrograms"));
const EmpPdetails = lazy(() => import("./components/Employee/EmpPdetails"));
const MyApplication = lazy(() =>
  import("./components/Applicant/MyApplication")
);

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Suspense fallback={<Spinner />}>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Signin />} />
              <Route path="/signup" element={<Signup />} />
              <Route
                element={
                  <ProtectedRoutes role="all">
                    <AppLayout />
                  </ProtectedRoutes>
                }
              >
                <Route path="/account" element={<AccountInfo />} />
              </Route>
              <Route
                element={
                  <ProtectedRoutes role="applicant">
                    <AppLayout />
                  </ProtectedRoutes>
                }
              >
                <Route path="/programs" element={<Programs />} />
                <Route path="/programs/:diplomaId" element={<Pdetails />} />
                <Route path="/applicant">
                  <Route path="programs/Adetails" element={<Apdetails />} />
                  <Route
                    path="programs/:diplomaId/application"
                    element={<Application />}
                  />
                  <Route path="success" element={<Success />} />
                  <Route path="applications" element={<Mydiplomas />} />
                  <Route
                    path="applications/:appId"
                    element={<MyApplication />}
                  />
                  <Route path="subjects" element={<Regsubs />} />
                  <Route path=":diplomaId/appinfo" element={<Appinfo />} />
                </Route>
              </Route>
              <Route
                element={
                  <ProtectedRoutes role="employee">
                    <AppLayout />
                  </ProtectedRoutes>
                }
              >
                <Route path="/employee">
                  <Route path="programs" element={<EmpPrograms />} />

                  <Route path="programs/:diplomaId" element={<EmpPdetails />} />

                  <Route
                    path="programs/:diplomaId/applicants"
                    element={<Applicants />}
                  />
                  <Route
                    path="programs/:diplomaId/applicant/:appId/info"
                    element={<Appinfoemp />}
                  />
                </Route>
              </Route>
              <Route
                element={
                  <ProtectedRoutes role="lecturer">
                    <AppLayout />
                  </ProtectedRoutes>
                }
              >
                <Route path="lecturer">
                  <Route path="subjects/:subId" element={<Table />} />
                  <Route path="subjects" element={<Cric />} />
                </Route>
              </Route>

              <Route
                element={
                  <ProtectedRoutes role="admin">
                    <AppLayout />
                  </ProtectedRoutes>
                }
              >
                <Route path="/admin">
                  <Route path="main" element={<Addmain />} />
                  <Route path="diplomas" element={<Adiplomas />} />
                  <Route path="diplomas/:diplomaId/years" element={<Ayear />} />
                  <Route path="employees" element={<Aemp />} />
                  <Route path="lecturers" element={<Alect />} />
                  <Route
                    path="diplomas/:diplomaId/years/:yearId/semesters/:semesterId/courses"
                    element={<Asubjects />}
                  />
                  <Route path="payments" element={<Apay />} />
                  <Route
                    path="diplomas/:diplomaId/years/:yearId/semesters"
                    element={<Semester />}
                  />
                  <Route path="DipYear" element={<DipYear />} />
                </Route>
              </Route>

              <Route
                element={
                  <ProtectedRoutes role="master">
                    <AppLayout />
                  </ProtectedRoutes>
                }
              >
                <Route path="/master">
                  <Route path="main" element={<Mastermain />} />
                  <Route path="colleges" element={<Mcollege />} />
                  <Route path="admins" element={<Madmin />} />
                </Route>
              </Route>
            </Routes>
          </div>
        </Router>
      </Suspense>
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
