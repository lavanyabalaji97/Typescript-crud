import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { showSuccessToast } from "../services/user";
import { Container, Card, CardContent, Typography, TextField, Button } from '@mui/material';
import { createUser } from "../services/user";
import axios from 'axios'
const EmployeeCreate = () => {
  const [name, namechange] = useState("");
  const [email, emailchange] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phone, phonechange] = useState("");
  const [validation, valchange] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const navigate = useNavigate();



  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const handleEmailBlur = () => {
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const phoneRegex = /^\d{10}$/;
  const handlePhoneBlur = () => {
    if (!phoneRegex.test(phone)) {
      setPhoneError("Please enter a valid 10-digit phone number");
    } else {
      setPhoneError("");
    }
  };


  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    if (!phoneRegex.test(phone)) {
      setPhoneError("Please enter a valid 10-digit phone number");
      return;
    }
    const empdata = { name, email, phone };
    axios.post("http://localhost:8000/employee", empdata)
      .then((res: any) => {
        showSuccessToast('user created');
        window.setTimeout(() => {
          navigate('/');
        }, 1000);
      })
      .catch((err: any) => {
        console.log(err.message);
      });
  };
  const handlePhoneChange = (e: any) => {
    if (e.target.value.length <= 10) {
      phonechange(e.target.value);
    }
  };


  return (

    <Container maxWidth="sm" className="m-auto">
      <form onSubmit={handleSubmit}>
        <Card sx={{ textAlign: 'left' }}>
          <CardContent>
            <Typography variant="h5" align="center" gutterBottom>
              Employee Create
            </Typography>
            <div className="row">
              <div className="col-lg-12">
                <div className="form-group">
                  <TextField
                    required
                    id="name"
                    label="Name"
                    value={name}
                    onChange={(e) => namechange(e.target.value)}
                    fullWidth
                  />
                </div>
              </div>
              <div className="col-lg-12">
                <div className="form-group">
                  <TextField
                    label="Email"
                    value={email}
                    onChange={(e) => emailchange(e.target.value)}
                    onBlur={handleEmailBlur}
                    fullWidth
                  />
                  {emailError && <span className="error text-danger">{emailError}</span>}

                </div>
              </div>
              <div className="col-lg-12">
                <div className="form-group">
                  <TextField
                    label="Phone"
                    value={phone}
                    onChange={handlePhoneChange}
                    onBlur={handlePhoneBlur}
                    inputProps={{ maxLength: 10 }}

                    fullWidth
                  />
                  {phoneError && <span className="error text-danger">{phoneError}</span>}
                </div>
              </div>
              <div className="col-lg-12">
                <div className="form-check">
                  <Button variant="contained" type="submit" className="first-btn" color="success" sx={{ ml: 1 }}>
                    Save
                  </Button>
                  <Button component={Link} to="/" className="back-btn" variant="contained" sx={{ ml: 1 }}>
                    Back
                  </Button>
                </div>
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
            </div>
          </CardContent>
        </Card>
      </form>
    </Container>
  );
}


export default EmployeeCreate;