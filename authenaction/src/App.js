import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import DashBoard from "./Components/DashBoard/DashBoard";
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path ="/Dashboard" element = {<DashBoard />} />
      </Routes>
    </Router>
  );
}

export default App;
