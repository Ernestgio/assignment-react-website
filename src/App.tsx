import { Route, Routes } from "react-router-dom";
import "./App.scss";
import HomePage from "./pages/Home/HomePage";
import Login from "./pages/Login/Login";
import NotFound from "./pages/NotFound/NotFound";
import Register from "./pages/Register/Register";
import Topup from "./pages/Topup/Topup";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index element={<HomePage />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="topup" element={<Topup />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
