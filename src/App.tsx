import './App.css';
import EmployeeCreate from './Employee/EmployeeCreate';
import EmployeeDetails from './Employee/EmployeeDetails';
import EmployeeEdit from './Employee/EmployeeEdit';
import EmployeeListing from './Employee/EmployeeListing';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Employee/Navbar';
import SignupForm from './components/Signup';
import LoginPage from './components/LoginForm';




function App() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* Login */}
          <Route path="/" element={<SignupForm />} />
          <Route path="/login" element={<LoginPage />} />          
          {isLoggedIn ? (
            <>
              <Route path="/employees" element={<EmployeeListing />} />
              <Route path="employee/employee/create" element={<EmployeeCreate />} />
              <Route path="employee/employee/detail/:empid" element={<EmployeeDetails />} />
              <Route path="employee/employee/edit/:empid" element={<EmployeeEdit />} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/login" />} />
          )}

        
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
