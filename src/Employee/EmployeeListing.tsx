import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { removeEmployee } from '../services/user'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon, List as ListIcon } from "@mui/icons-material"
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CircularProgress from '@mui/material/CircularProgress';

const EmpListing = () => {
   const [data, setData] = useState<any[]>([])
   const [deleteId, setDeleteId] = useState("")
   const [show, setShow] = useState(false)
   const [isSignupSuccessful, setIsSignupSuccessful] = useState<boolean>(false);
   const [isLogout,setLogout]=useState<boolean>(false)


   const navigate = useNavigate()
   const LoadDetail = (id: any) => {
      navigate("/employee/detail/" + id)
   }

   const LoadEdit = (id: any) => {
      navigate("employee/edit/" + id)
   }

   const handleClose = () => {
      setShow(false)
   }

   const Removefunction = (id: any) => {
      setDeleteId(id)
      setShow(true)
   }


   const handelDeleteItem = () => {
      axios.delete(`http://localhost:8001/employee/${deleteId}`)
         .then((res) => {
            const newData = data.filter(x => x.id !== deleteId)
            setData(newData);
            toast.error("Employee deleted successfully");
         })
         .catch((err) => {
            console.log(err.message)
         });
      setShow(false)
   }


   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await axios.get("http://localhost:8001/employee");
            setData(response.data);
            setIsSignupSuccessful(true);
         } catch (error: any) {
            console.log(error.message);
         }
      };
      fetchData();
   }, []);

   const handleLogout=()=>{
      localStorage.setItem('isLoggedIn', 'false'); 
      navigate('/login')
   }

   return (
      <div className="container">

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
               <button onClick={handleLogout}>LogOut</button>
            </div>
         )}

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
         <Dialog open={show} onClose={handleClose}>
            <DialogTitle>Modal heading</DialogTitle>
            <DialogContent>
               <p>Sure, are you going to Delete</p>
            </DialogContent>
            <DialogActions>
               <Button variant="contained" onClick={handelDeleteItem} color="secondary">
                  Ok
               </Button>
               <Button variant="contained" onClick={handleClose} color="primary">
                  Cancel
               </Button>
            </DialogActions>
         </Dialog>
         <div className="card text-center">
            <div className="card-title">
               <h1>Employee Listing</h1>
            </div>
            <div className="card-body">
               {
                  data.length === 0 ? (
                     <div>
                        <h4>No Data Found</h4>
                        <div>
                           <Link className="btn btn-success add-btn" to="employee/create">Add New(+)</Link>
                        </div>
                     </div>
                  ) : (
                     <div>
                        <div className="text-end">
                           <Link className="btn btn-success" to="employee/create">Add New(+)</Link>
                        </div>
                        <TableContainer>
                           <Table>
                              <TableHead sx={{ backgroundColor: "darkslategrey" }}>
                                 <TableRow>
                                    <TableCell sx={{ color: "white" }}>Id</TableCell>
                                    <TableCell sx={{ color: "white" }}>Name</TableCell>
                                    <TableCell sx={{ color: "white" }}>Email</TableCell>
                                    <TableCell sx={{ color: "white" }}>Phone</TableCell>
                                    <TableCell sx={{ color: "white" }}>Action</TableCell>
                                 </TableRow>
                              </TableHead>
                              <TableBody>
                                 {data.map((item) => (
                                    <TableRow key={item.id}>
                                       <TableCell>{item.id}</TableCell>
                                       <TableCell>{item.name}</TableCell>
                                       <TableCell>{item.email}</TableCell>
                                       <TableCell>{item.phone}</TableCell>
                                       <TableCell>
                                          <Button onClick={() => LoadEdit(item.id)} variant="contained" startIcon={<EditIcon />} sx={{ ml: 1 }}>
                                             Edit
                                          </Button>
                                          <Button variant="contained" color="secondary" onClick={() => Removefunction(item.id)} sx={{ ml: 1 }}>
                                             Delete
                                          </Button>
                                          <Button onClick={() => LoadDetail(item.id)} color="success" variant="contained" startIcon={<ListIcon />} sx={{ ml: 1 }}>
                                             Details
                                          </Button>
                                       </TableCell>
                                    </TableRow>
                                 ))}
                              </TableBody>
                           </Table>
                        </TableContainer>
                     </div>
                  )}
            </div>
         </div>
      </div>
   )
}
export default EmpListing;