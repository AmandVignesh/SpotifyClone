import React from 'react'
import "./pagenot.css"
import Navbar from '../Navbar/Navbar.jsx'


function Pagenot() {
  return (
    <>
      <Navbar/>
        <div className='pagenot-found-container'>
            <div className='image-container-for-404'>
                <img src='https://res.cloudinary.com/dnx2ozxvd/image/upload/v1756060389/Frame_153_m89jdp.png' className='img-404'/>
            </div>
            <div className='page-text'>Page Not Found</div>
        </div>
    </>
  )
}

export default Pagenot
