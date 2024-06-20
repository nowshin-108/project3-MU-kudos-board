// import { useState } from 'react'
import './App.css'
import Homepage from './Components/Homepage/Homepage'
import { CiLinkedin } from "react-icons/ci";

function App() {

  return (
    <>  
      
      <header><h1>KudosBoard</h1></header>

      <Homepage />

      <footer><a href="https://www.linkedin.com/in/nowshinanber/"><CiLinkedin /></a></footer>
    </>
  )
}

export default App
