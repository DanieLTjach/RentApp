import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Catalog from "./pages/catalog/Catalog";
import './App.css';



function App() {

  return (
    <div className="App">
      <Catalog />
      <Login />
      <Register />
    </div>
  );
}

export default App;
