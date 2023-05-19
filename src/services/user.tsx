
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const removeEmployee = async(id: any) => {
        const res=await fetch(`http://localhost:8000/employee/${id}`, { method: "DELETE" })
        .then((res) => res.json())
}

// api.js

export const createUser = (empdata:any) => {
    return fetch("http://localhost:8000/employee", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(empdata)
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log(err.message);
      });
  };
  
// employeeService.js

  
export const showSuccessToast = (message: any) => {
    toast.success('saved successfully!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    },);
}



