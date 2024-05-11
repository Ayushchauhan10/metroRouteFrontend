import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import RouteFinder from "./components/RouteFinder";
import Navbar from "./components/Navbar";
import { Map } from "./components/Map";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="w-[100%] min-h-screen flex flex-col gap-5 justify-start relative ">
      <Router>
        <Navbar />

        <Routes>
          <Route path="/" element={<RouteFinder />} />
          <Route path="/seeMap" element={<Map />} />
        </Routes>
      </Router>


      <Footer/>
    </div>
  );
}

export default App;
