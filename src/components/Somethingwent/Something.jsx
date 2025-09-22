import React from 'react'
import "./something.css"

function Something() {
  return (
    <>
        <div className='something-container'>
            <div className='something-animation'></div>
            <p className='something-text'>Something went wrong. Please try again</p>
            <button className='try-btn'>Try again</button>
        </div>
    </>
  )
}

export default Something
