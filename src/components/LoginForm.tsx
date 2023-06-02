import React, { useState } from 'react';
import {
  Button,
  Container,
  TextField,
  Typography,
} from '@mui/material';
import { redirect } from 'react-router-dom';

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

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setLoginForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      const userData = JSON.parse(userDataString);  
      if (
        loginForm.email === userData.email &&
        loginForm.password === userData.password
      ) {
        return redirect("/signup");
      } else {
        setErrorMessage('Invalid email or password');
      }
    } else {
      setErrorMessage('Email or password not found in storage');
    };

  }
  return (
    <Container maxWidth="sm">
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
      </form>
    </Container>
  );
};

export default LoginPage;
