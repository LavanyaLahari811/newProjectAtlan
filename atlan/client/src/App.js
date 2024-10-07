import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./routes/navbar/navbar";
import Home from "./routes/home/home";
import Auth from "./routes/register/register";
import Login from "./routes/login/login";
import FeaturesPage from "./routes/features/features";
import Info from "./routes/info/info";
import Display from "./routes/display/display";
import FinalSubmit from "./routes/finalSubmit/finalSubmit";
import Dashboard from "./routes/dashboard/dashboard";
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/login" element={<Login />} />
          <Route path="/features" element={<FeaturesPage/>}/>
          <Route path="/info" element={<Info/>}/>
          <Route path="/display" element={<Display/>}/>
          <Route path="/final-submit" element={<FinalSubmit/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
