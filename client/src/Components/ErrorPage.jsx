import React from 'react'
import { useNavigate } from 'react-router-dom'

const ErrorPage = () => {
    const navigate = useNavigate();
  return (
    <div className=' text-center m-56 text-lg'>
      <h1>Page Not Found Error</h1>
      <button className='cursor-pointer' onClick={()=>{navigate("/")}}>Back to Home Page</button>
    </div>
  )
}

export default ErrorPage
