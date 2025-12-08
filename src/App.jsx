import { Routes, Route } from "react-router-dom"
import Home from "./Pages/Homepage"   
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
       <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />

      </Routes>
      <Footer/>
    </div>
  )
}
