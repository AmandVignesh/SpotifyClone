import React from 'react'
import "./Categorydetail.css"
import { useParams } from 'react-router'
import { useState, useEffect } from 'react';
import Loading from '../loadingpage/Loading';
import Navbar from '../Navbar/Navbar';
import { Link } from 'react-router';
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
export default function Categorydetail() {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false)
    const [response, setResponse] = useState([])
    const fetchDetails = ()=>{
        setIsLoading(true)
        const URL = `https://apis2.ccbp.in/spotify-clone/category-playlists/${id}`
        const options = { method: "GET" }

        const fn = async ()=> {
            const response = await fetch(URL,options);
            const data = await response.json()
            if (response.ok){
                const result = data.playlists.items.map((i)=>({
                    description: i.description,
                    imageURl: i.images[0].url,
                    name: i.name
                }))
                console.log(result)
                setResponse(result)
                setIsLoading(false)
            }
        }
        fn()

    }

    useEffect(fetchDetails, [id])

  return (
    <>
        <Navbar/>
        <div className='category-details-container'>
            <Link to={"/"}>
                <div className='back-btn-container'>
                <ArrowLeftIcon className='back-icon' />
                <h1 className='back-head'>Back</h1>
                </div>
            </Link>
            {isLoading && 
            <Loading/>}
            <div className='category-card'>
                {response.map((eachcard)=>(
                    <div className='card'>
                        <img src= {eachcard.imageURl} className='img'/>
                        <h1 className='name-head' >{eachcard.name}</h1>
                        <p className='des-text'>{eachcard.description}</p>
                    </div>
                ))}
            </div>
        </div>
    </>
  )
}
