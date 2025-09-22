import React, { useState, useEffect } from 'react'
import "./Newrelease.css"
import { Tooltip } from 'react-tooltip'
import "react-tooltip/dist/react-tooltip.css";
import Loading from "../loadingpage/Loading"
import { Link } from 'react-router';
function Newrelease() {
  const [response3, setResponse3] = useState([])
  const [isloading,setIsloading] = useState(false)

  const Release = () => {
    setIsloading(true)
    const url = "https://apis2.ccbp.in/spotify-clone/new-releases"
    const fn = async () => {
      const response = await fetch(url)
      const data = await response.json()
      if (response.ok === true) {
        const result = data.albums.items.map((eachItem) => ({
          imageUrl: eachItem.images[0].url,
          name: eachItem.name,
          id: eachItem.id
        }))
        setResponse3(result)
        setIsloading(false)
      }
    }
    fn()
  }

  useEffect(Release, [])

  return (
    <>
      {isloading && <Loading/>
      
      }
      <div className="Newrelease-container">
        {response3.map((i, index) => (
          <Link to={`/newreleasedetail/${i.id}`}  key={index}>
            <div className="card">
              <img src={i.imageUrl} className="Newrelease-img" alt={i.name} />
              <h1   
              data-tooltip-id="album-tooltip"         
              data-tooltip-content={i.name} 
              >{i.name}</h1>
            </div>
          </Link>
        ))}
        <Tooltip id="album-tooltip" place="top" />
      </div>
    </>
    
  )
}

export default Newrelease
