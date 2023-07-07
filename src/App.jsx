import { useState } from 'react'
import './App.css'
import Calendar from './Calendar.jsx'

function App() {
  const [data, SetData] = useState('')
  return (
    <>
      <Calendar />
    </>
  )
}

export default App
