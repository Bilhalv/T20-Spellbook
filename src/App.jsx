import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Grimorio from "./pages/Grimorio";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/grimorio" element={<Grimorio />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
