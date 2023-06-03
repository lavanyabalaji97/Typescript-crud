import { Link } from 'react-router-dom'


 function Navbar() {
  return (
    <div>
    <ul>
     <li><Link className='style'  to='/'>Home</Link></li>
     <li><Link className='style' to='/employee/create'>Create</Link></li>

     </ul>
    </div>
  )
}

export default Navbar