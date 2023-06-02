
import './App.css';
import EmployeeCreate from './Employee/EmployeeCreate';
import EmployeeDetails from './Employee/EmployeeDetails';
import EmployeeEdit from './Employee/EmployeeEdit';
import EmployeeListing from './Employee/EmployeeListing';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Employee/Navbar';
import SignupForm from './components/Signup';

// const AuthGuard = ({ comp: Comp}: any) => {
//   const losingStatus = localStorage.getItem('loginstate');
//   if (losingStatus === 'logedin') {
//     return <Comp></Comp>
//   }

//   return <Navigate to="/login" replace={true} />

// }

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* Login */}
          {/* <Route path='/' element={<AuthGuard comp={EmployeeListing} />} /> */}
          <Route path='/employeelisting' element={<EmployeeListing />} />
          <Route path='/employee/create' element={<EmployeeCreate />} />
          <Route path='/employee/detail/:empid' element={<EmployeeDetails />} />
          <Route path='/employee/edit/:empid' element={<EmployeeEdit />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
