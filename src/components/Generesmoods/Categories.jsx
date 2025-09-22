import React from 'react'
import './Categories.css'
import { useState,useEffect } from 'react'
import Loading from "../loadingpage/Loading.jsx"
import { Link } from 'react-router'
import { Tooltip } from 'react-tooltip'
function Categories() {
  const [response2,setResponse2] = useState([]);
  const [isloading,setIsloading] = useState(false)
  const Catego = ()=>{
    setIsloading(true)
    const url = "https://apis2.ccbp.in/spotify-clone/categories";
    const fn = async()=>{
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok==true){
          const result = data.categories.items.map((value)=>({
            images:value.icons[0].url,
            id: value.id,
            name: value.name
          }))
          setResponse2(result)
          setIsloading(false)
        }
    }
    fn()
  }
  useEffect(Catego,[])
  return (
    <>
      {isloading && <Loading/>

      }
      <div className='Categories-container'>
        {response2.map((i,index)=>(
          <Link key={index} to={`/categorydetail/${i.id}`} className='card'>
            <img src={i.images} className='categories-img'/>
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

export default Categories
