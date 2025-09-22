import { useState, useEffect } from 'react'
import './Favoritespicks.css'
import { Tooltip } from 'react-tooltip'
import "react-tooltip/dist/react-tooltip.css";
import Loading from "../loadingpage/Loading.jsx"
import { Link } from 'react-router';
import Cookies from 'js-cookie';
import Something from '../Somethingwent/Something.jsx';
function Favoritespicks() {
  const [response1, setResponse1] = useState([]);
  const [isloading,setIsloading]  = useState(false)

  

  const Favarites = () => {
    setIsloading(true)
    const URL = 'https://apis2.ccbp.in/spotify-clone/featured-playlists'
    const Jwt_token = Cookies.get("jwt_token")
    
    const options = {
      method:"GET",
      headers:{
        Authorization : `Bearer ${Jwt_token}` 
      }
    }
    const fn = async () => {
      const response = await fetch(URL,options)
      const data = await response.json()
      if (response.ok) {
        const result = data.playlists.items.map((value) => ({
          description: value.description,
          images: value.images[0].url,
          name: value.name,
          id:value.id
        }))
        setResponse1(result)
        setIsloading(false)
      }
    }
    fn()
  }

  useEffect(Favarites, [])

  return (
    <>
    {isloading && <Loading/>

    } 
    <div className='editor-container'>
      {response1.map((i, index) => (
        <Link key={index} to={`/detail/${i.id}`} className='card'>
          <img src={i.images} className='editors-img' alt={i.name}/>
          <h1   
            data-tooltip-id="album-tooltip"         
            data-tooltip-content={i.name} 
            >{i.name}
          </h1> 
        </Link>
      ))}
      <Tooltip id="album-tooltip" place="top" />
    </div>
    </>
  )
}

export default Favoritespicks
