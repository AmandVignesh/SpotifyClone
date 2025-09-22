import React from 'react'
import "./navbar.css"
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';


function Navbar() {
  const navigate = useNavigate();
  const logout = () => {
    Cookies.remove('jwt_token');
    navigate('/login',{replace: true})
  }
  const Navigatetohome = ()=>{
    navigate('/',{replace: true})
  }

  return (
    <div className='nav-container'>
      <nav className='navbar'>
        <div className='nav-top'>
          <img 
            src='https://res.cloudinary.com/dnx2ozxvd/image/upload/v1754323873/Screenshot_2025-08-04_214059_noxbua.png' 
            className='logo-navbar'
            onClick={Navigatetohome}
            alt="Logo"
          />
        </div>
        <div className='nav-bottom'>
            <button onClick={logout}>
              <img 
                src='https://res.cloudinary.com/dnx2ozxvd/image/upload/v1755000380/Screenshot_2025-08-12_173429_yq37g3.png' 
                className='logout-btn' 
                alt="Logout Button"
              />
            </button>
            <p className='logout-txt'>Logout</p>
          
        </div>
      </nav>
    </div>
  )
}

export default Navbar
