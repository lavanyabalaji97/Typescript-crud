import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Card, CardContent, Typography, Button } from '@mui/material';
import axios from 'axios'


const EmployeeDetails = () => {
  const { empid } = useParams();
  const [empdata, empdatachange] = useState<User>()


  interface User {
    id: number,
    name: string,
    email: string,
    phone: number
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/employee/${empid}`);
        const data = response.data;
        empdatachange(data);
      } catch (error:any) {
        console.log(error.message);
      }
    };
  
    fetchData();
  }, [empid]);
  
  
  return (

    <Card sx={{ maxWidth: 500, margin: 'auto', textAlign: 'left' }}>
      <CardContent>
        <Typography variant="h5" align="center" gutterBottom>
          Employee Details
        </Typography>
        {empdata && (
          <div>
            <Typography variant="h5" align="center" gutterBottom>
              The employee name is: <b>{empdata.name}</b> ({empdata.id})
            </Typography>
            <Typography variant="h6">Contact Details</Typography>
            <Typography>Email is: {empdata.email}</Typography>
            <Typography>Phone is: {empdata.phone}</Typography>
            <Button component={Link} to="/" variant="contained" className="back-btn" color="secondary" sx={{ mt: 2 }}>
              Back to Listing
            </Button>
            
          </div>
          
        )}
      </CardContent>
      
    </Card>
  )
}
export default EmployeeDetails;
