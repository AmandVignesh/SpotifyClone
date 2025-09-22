import React from 'react';
import ReactDOM from 'react-dom/client'; 
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/loginform/Login.jsx';
import Home from './components/homepage/Home.jsx';
import Detailed from './components/Detailedcard/Detailed.jsx';
import Pagenot from './components/Pagenotfound/Pagenot.jsx';
import Categorydetail from './components/Categorydetail/Categorydetail.jsx';
import Newreledetail from './components/Newreleasedetail/Newreledetail.jsx';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/' element={<Home/>}/> 
        <Route path='/detail/:id' element={<Detailed/>}/>
        <Route path='/categorydetail/:id' element={<Categorydetail/>}/>
        <Route path='/newreleasedetail/:id' element={<Newreledetail/>}/>
        <Route path='*' element={<Pagenot/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
