import React from 'react'
import { useAuth } from "./../contexts/authContext";

 function Test() {
  const {currentUser}=useAuth()

 
  return (
    <>
    <div>{currentUser.uid}</div>
    <div>{currentUser.email}</div>
   
    
    </>)
}
export default Test;