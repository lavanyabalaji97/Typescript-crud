import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  InputAdornment,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "./SignupForm.css";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";


const SignupForm: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [nameError, setNameError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [phoneError, setPhoneError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Perform validations
    let isValid = true;

    if (!name) {
      setNameError("Name is required");
      isValid = false;
    }

    if (!email) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!isValidEmail(email)) {
      setEmailError("Invalid email format");
      isValid = false;
    }

    if (!phone) {
      setPhoneError("Phone is required");
      isValid = false;
    } else if (!isValidPhone(phone)) {
      setPhoneError("Invalid phone number format");
      isValid = false;
    }

    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    }

    if (!confirmPassword) {
      setConfirmPasswordError("Confirm Password is required");
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      isValid = false;
    }

    if (isValid) {
      try {
        const userData = {
          name,
          email,
          phone,
          password,
        };
        axios.post('http://localhost:8001/users', userData);
        toast.success("user created successfully");
        setTimeout(() => {
        navigate('/login')
        },2000);
        // setIsSignupSuccessful(true);
      } catch (error) {
        console.log(error);

      }
    }
  };
 

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const isValidEmail = (email: string) => {
    // Basic email validation, you can use a library or a more robust solution
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPhone = (phone: string) => {
    // Basic phone number validation, you can customize this based on your requirements
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  return (
    <Container maxWidth="sm" className="container">
      {/* {isSignupSuccessful && (
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
      )} */}
      <Typography variant="h3" align="center" gutterBottom>
        SignUp
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setNameError("");
          }}
          fullWidth
          margin="normal"
          required
          error={!!nameError}
          helperText={nameError}
        />
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailError("");
          }}
          fullWidth
          margin="normal"
          required
          error={!!emailError}
          helperText={emailError}
        />
        <TextField
          label="Phone"
          type="tel"
          value={phone}
          onChange={(e) => {
            if (e.target.value.length <= 10) {
              setPhone(e.target.value);
              setPhoneError("");
            }
          }}
          fullWidth
          margin="normal"
          required
          error={!!phoneError}
          helperText={phoneError}
          inputProps={{
            maxLength: 10,
          }}
        />

        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setPasswordError("");
          }}
          fullWidth
          margin="normal"
          required
          error={!!passwordError}
          helperText={passwordError}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {showPassword ? (
                  <Visibility onClick={handlePasswordVisibility} />
                ) : (
                  <VisibilityOff onClick={handlePasswordVisibility} />
                )}
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Confirm Password"
          type={showPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            setConfirmPasswordError("");
          }}
          fullWidth
          margin="normal"
          required
          error={!!confirmPasswordError}
          helperText={confirmPasswordError}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {showPassword ? (
                  <Visibility onClick={handlePasswordVisibility} />
                ) : (
                  <VisibilityOff onClick={handlePasswordVisibility} />
                )}
              </InputAdornment>
            ),
          }}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          signup
        </Button>
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
};

export default SignupForm;
