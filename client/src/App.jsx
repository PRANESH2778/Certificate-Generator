import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Home';
import CertificateGenerate from './CertificateGenerate'
import CertificateView from './CertificateView';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/create' element={<CertificateGenerate/>}/>
            <Route path='/view' element={<CertificateView/>}/>
          </Routes>
      </BrowserRouter>    
    </>
  )
}

export default App
