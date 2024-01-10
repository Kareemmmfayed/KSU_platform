import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Appflow/Home'
import Signin from './components/Appflow/Signin';
import Signup from './components/Appflow/Signup';
import Success from './components/Appflow/Success';
import Application from './components/Appflow/Application';
import Programs from './components/Appflow/Programs';
import Applicants from './components/Empflow/Applicants';
import Table from './components/Lecturer/Table';
import Cric from './components/Lecturer/Cric';
import AccountInfo from './components/Appflow/AccountInfo';
import Mydiplomas from './components/Appflow/Mydiplomas';
import Regsubs from './components/Appflow/Regsubs';
import Appinfo from './components/Appflow/Appinfo';
import Appinfoemp from './components/Empflow/Appinfoemp';
import Addmain from './components/Admin/Addmain';
import Mastermain from './components/Master/Mastermain';
import Adiplomas from './components/Admin/Adiplomas';
import Aemp from './components/Admin/Aemp';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/programs' element={<Programs />} />
          <Route path='/application' element={<Application />} />
          <Route path='/success' element={<Success />} />
          <Route path='/AccountInfo' element={<AccountInfo />} />
          <Route path='/YourDiplomas' element={<Mydiplomas />} />
          <Route path='/YourSubjects' element={<Regsubs />} />
          <Route path='/applicants' element={<Applicants />} />
          <Route path='/appinfo' element={<Appinfo />} />
          <Route path='/appinfoemp' element={<Appinfoemp />} />
          <Route path='/table' element={<Table />} />
          <Route path='/Subjects' element={<Cric />} />
          <Route path='/admin/main' element={<Addmain />} />
          <Route path='/admin/diplomas' element={<Adiplomas />} />
          <Route path='/admin/employees' element={<Aemp />} />
          <Route path='/master/main' element={<Mastermain />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

