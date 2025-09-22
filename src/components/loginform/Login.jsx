import React from 'react'
import './login.css'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import Loading from '../loadingpage/Loading.jsx';
import { Navigate } from 'react-router';
function Login() {
    const [username ,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const [errormsg,setErrormsg] = useState(false);
    const navigate = useNavigate();

    const onChangeUsername =(event)=>{
        setUsername(event.target.value)
    }
    const onChangePassword= (event)=>{
        setPassword(event.target.value)
    }

    const onSubmitSuccess=(data) =>{
        setErrormsg("");
        const {jwt_token} = data;
        Cookies.set('jwt_token', jwt_token,{expires : 30});
        navigate('/');
    }
    const onSubmitFailure = (errormessage) =>{
        setErrormsg(errormessage);
    }

    const  submit =  async (event) => {
        event.preventDefault();    
        const userDetails = {username,password}
        const url = "https://apis.ccbp.in/login";
        const options = {
            method : 'POST',
            body: JSON.stringify(userDetails)
        }
        const response = await fetch(url,options)
        const fetchedData = await response.json() 
        
        if (response.ok === true){
            onSubmitSuccess(fetchedData);
        }
        else{
            onSubmitFailure(fetchedData.error_msg)
        }
        
    
    }
    const jwtToken = Cookies.get("jwt_token");
    if (jwtToken !== undefined){
       return <Navigate to="/"/>
    }
  return (
    <>
       <div className='login-main-container'>
            <div className='login-bg-container'>
                <div  className='formcard'>
                    <img src='https://res.cloudinary.com/dnx2ozxvd/image/upload/v1754323873/Screenshot_2025-08-04_214059_noxbua.png' className='logoimg'/>
                    <h1 className='logohead'>Spotify Remix</h1>
                    <form id='Loginform' onSubmit={submit}>
                        <div className='formcontainer'>
                            <div className='sep'>
                                <label htmlFor="name"  className='username'>Name</label>
                                <input type='text' id="name" name="name" className='userinputfield' onChange={onChangeUsername}></input>
                            </div>
                            <div className='sep'>
                                <label htmlFor ="Password" className='password'>Password</label>
                                <input type='password'id='Password' name='password' className='passwordfield' onChange={onChangePassword}></input>
                            </div>
                            <div className='errormsg-container'>{errormsg && <span className='main-error-msg'>{errormsg}</span> }</div>
                            <div><button className='submitbtn' type='submit' onClick={submit}>LOGIN</button></div>
                        </div>
                    </form>
                </div>
            </div>
       </div>
    </>
  )
}

export default Login
