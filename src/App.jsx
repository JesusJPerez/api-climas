import { useState } from 'react'
import './App.css'
import Card from './components/Card'

function App() {

  const [dark,setDark]=useState(false)

  return (
    <div className={`body ${dark ? "body-dark" : ""}`}>
    <div className='header'>
      <div className='name'>Weather app</div>
      <div className='container-input'><input className="input" type="text" /></div>
      <div className='container-dark'> <button onClick={()=>setDark(!dark)} className='dark'>dark mode </button> </div>
    </div>
    <Card 
    dark={dark}
    ></Card>
    </div>
  )
}

export default App
