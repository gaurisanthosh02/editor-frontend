import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { auth, provider} from './config'
import { signInWithPopup } from 'firebase/auth'
import EditingComponent from './EditingComponent'


const Home = () => {

    const [value, setValue] = useState("")

    const handleLogin = () => {
        signInWithPopup(auth, provider).then( data => {
            // console.log(JSON.stringify(data));
            const googleDetails = {
                email: data.user.email,
                name : data.user.displayName,
                userId : data.user.uid
            }
            console.log(googleDetails);
            localStorage.setItem("googleUser", JSON.stringify(googleDetails))
            setValue(googleDetails)
        }).catch(err => {
            alert("Login Failed !")
            console.log(err);
            
        })
    }




    const navigate = useNavigate()
  return (
    <div style={{backgroundColor:'#ffc107', minHeight:'100vh'}} className='d-flex justify-content-center align-items-center'>
        <div style={{backgroundColor:'rgba(255, 255, 255, 0.7)', height:'550px', width:'75%'}} className='rounded text-center p-5'>
            <h1 className='mt-5'>WELCOME TO ONLINE TEXT EDITOR</h1>
            <h6 className=''>featured using React Draft Wysiwyg</h6>
            <p className='fw-semibold' style={{marginTop:'110px'}}>Login to access your drafts and documents</p>
            { value ? navigate('/editor') :
                <button onClick={handleLogin} className='btn btn-warning'> Signin with Google</button>
            } 
            <p>By signing in, you agree to our Terms of Service and Privacy Policy</p>            
        </div>
    </div>
  )
}

export default Home

// auto_select={true} if i want to automatically login for users logged before