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
      <Typeracer text="Excessive and unnecessary force by law enforcement officers is a problem that needs accountability. This requires better training and screening, community oversight, and improved laws to protect citizens. We must demand change for a fairer society." />
    </div>
  )
}

export default App
