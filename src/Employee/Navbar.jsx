import { Link } from 'react-router-dom'


 function Navbar() {
  return (
    <div>
    <ul>
     <li><Link className='style'  to='/'>Home</Link></li>
     <li><Link className='style' to='/employee/create'>Create</Link></li>
     <li><Link className='style' to='/employee/edit/:empid'>Edit</Link></li>
     <li><Link className='style'  to='/employee/detail/:empid'>Details</Link></li>
     </ul>
    </div>
  )
}

export default Navbar