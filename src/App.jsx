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

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/success' element={<Success />} />
          <Route path='/application' element={<Application />} />
          <Route path='/programs' element={<Programs />} />
          <Route path='/applicants' element={<Applicants />} />
          <Route path='/table' element={<Table />} />
          <Route path='/Subjects' element={<Cric />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

