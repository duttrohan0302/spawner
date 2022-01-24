  
import React from 'react';
import { Link } from 'react-router-dom';
const NotFound = () => {
  return (
    <div style={{minHeight:"100vh",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
      <h1 className='x-large text-primary display-2'>
        <i className="fa fa-exclamation-triangle" style={{color:"black"}} aria-hidden="true"></i>{' '} 
        <span  style={{color:"black"}}>
        Page Not Found

        </span>
      </h1>
      <Link to="/" className='display-4' style={{color:"white"}} >Go Home</Link>

    </div>
  );
};

export default NotFound;