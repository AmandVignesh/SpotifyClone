import React from 'react'
import './home.css'

import Cookies from 'js-cookie';
import Navbar from '../Navbar/Navbar.jsx';
import Favoritespicks from '../EditorsPicks/favoritespicks.jsx';
import Categories from '../Generesmoods/Categories.jsx';
import Newrelease from '../Newreleases/Newrelease.jsx';
import { Navigate } from 'react-router';

function Home() {

    const jwtToken = Cookies.get("jwt_token");
    if (jwtToken === undefined){
       return <Navigate to="/login"/>
    }
    

   
    return (
        <div className='main-home-container'>
            <Navbar/>
            <div className='all-sections'>
                <div className='Editors-picks'>
                    <h1 className='editor-head'>Editor's Picks</h1>
                    <Favoritespicks  />
                </div>
                <div className='Genres-mood'>
                    <h1 className='Categories-head'>Generes & Moods</h1>
                    {
                    <Categories />
}
                </div>
                <div className='New-releases-section'>
                    <h1 className='Newreleases-head'>New releases</h1>
                    <Newrelease />
                </div>
            </div>
        </div>
    )
}

export default Home
