import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { showSuccessToast} from "../services/user";
import { Container, Card, CardContent, Typography, TextField, Button } from '@mui/material';
import axios from 'axios'

function EmployeeEdit() {
    const { empid } = useParams();
    // const [empdata, empdatachange] = useState([])

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/employee/${empid}`);
          const data = response.data;
          namechange(data.name);
          emailchange(data.email);
          phonechange(data.phone);
          activechange(data.isactive);
        } catch (error:any) {
          console.log(error.message);
        }
      };
  
      fetchData();
    }, [empid]);
    
    // const [id, idchange] = useState("");
    const [name, namechange] = useState("");
    const [email, emailchange] = useState("");
    const [phone, phonechange] = useState("");
    const [active, activechange] = useState(true);
    

     
      const handleSubmit = async (e: any) => {
        e.preventDefault();
        const empdata = { name, email, phone, active };
        try {
          const response = await axios.put(`http://localhost:8000/employee/${empid}`, empdata);
          showSuccessToast("Edited successfully!");
        } catch (error:any) {
          console.log(error.message);
        }
      };
    

    return (

        <Container maxWidth="sm" className="m-auto">
      <form onSubmit={handleSubmit}>
        <Card sx={{ textAlign: 'left' }}>
          <CardContent>
            <Typography variant="h5" align="center" gutterBottom>
              Employee Edit
            </Typography>
            <div className="row">
              <div className="col-lg-12">
                <div className="form-group">
                  <TextField
                    required
                    label="Name"
                    value={name}
                    onChange={(e)=>namechange(e.target.value)}
                    fullWidth
                  />
                </div>
              </div>
              <div className="col-lg-12">
                <div className="form-group">
                  <TextField
                    label="Email"
                    value={email}
                    onChange={(e)=>emailchange(e.target.value)}
                    fullWidth
                  />
                </div>
              </div>
              <div className="col-lg-12">
                <div className="form-group">
                  <TextField
                    label="Phone"
                    value={phone}
                    onChange={(e)=>phonechange(e.target.value)}
                    fullWidth
                  />
                </div>
              </div>
              <div className="col-lg-12">
                <div>
                  <Button variant="contained" type="submit" color="success" sx={{ml: 1 }}>
                    Save
                  </Button>
                  <Button component={Link} to="/" className="back-btn" variant="contained" sx={{ml: 1 }}>
                    Back
                  </Button>
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
            </div>
          </CardContent>
        </Card>
      </form>
    </Container>

    )

}
export default EmployeeEdit;