import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Catalog from "./pages/catalog/Catalog";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./reset.css";
import './App.css';



function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
