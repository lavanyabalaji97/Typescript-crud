import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  Button,
  Container,
  TextField,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface LoginFormState {
  email: any;
  password: any;
}

const initialLoginFormState: LoginFormState = {
  email: '',
  password: '',
};

const LoginPage = () => {
  const [loginForm, setLoginForm] = useState<LoginFormState>(
    initialLoginFormState
  );
  const [errorMessage, setErrorMessage] = useState('');
  const [isSignupSuccessful, setIsSignupSuccessful] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleInputChange = (
    event: any
  ) => {
    const { name, value } = event.target;
    setLoginForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFormSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const response = await axios.get('http://localhost:8001/users');
      const userData = response.data;
      const matchedUser = userData.find(
        (user: any) =>
          user.email === loginForm.email && user.password === loginForm.password
      );
      if (matchedUser) {        
        setIsSignupSuccessful(true);
        toast.success("Login successfully");
        setErrorMessage('');
        localStorage.setItem('isLoggedIn', 'true'); 
        setTimeout(() => {
          navigate("/employees");
        }, 2000);

      } else {
        setErrorMessage('Invalid email or password');
        toast.error("Invalid email or password");
      }
    }
    catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred during login');
    }
  }

  return (
    <Container maxWidth="sm">
      {isSignupSuccessful && (
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            padding: "10px",
            zIndex: 999,
          }}
        >
          <AccountCircleIcon fontSize="large" />
        </div>
      )}
      <form onSubmit={handleFormSubmit}>
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>

        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={loginForm.email}
          onChange={handleInputChange}
          margin="normal"
          required
        />

        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          value={loginForm.password}
          onChange={handleInputChange}
          margin="normal"
          required
        />

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Log In
        </Button>
        {errorMessage && <div>{errorMessage}</div>}
        <div>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </div>
      </form>

    </Container>
  );
}

export default LoginPage;
