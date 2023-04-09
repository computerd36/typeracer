import React from 'react'
import Typeracer from './components/Typeracer/Typeracer'
import logo from '../src/assets/logo.png'
import './index.css'

function App() {
  function logoclick() {
    console.log('logo clicked')
    window.location.reload();
  }
  return (
    <div className="App">
      <a onClick={logoclick} id="logo" className='animate-flicker'><img src={logo} ></img></a>
      <Typeracer text="Incidents of excessive and unnecessary force by law enforcement officers have become increasingly visible in recent years. One of the key challenges is holding officers accountable. Steps to address this issue include rigorous training and screening, increasing community oversight of police departments, and reforming laws to better protect citizen rights. Let's use our voices and actions to demand change for a more just and equitable society." />
    </div>
  )
}

export default App
