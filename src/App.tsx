import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/Home/HomePage";
import Login from "./pages/Login/Login";
import NotFound from "./pages/NotFound/NotFound";
import Register from "./pages/Register/Register";
import Topup from "./pages/Topup/Topup";
import Transfer from "./pages/Transfer/Transfer";

import "./App.scss";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index element={<HomePage />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/transfer" element={<Transfer />} />
        <Route path="/topup" element={<Topup />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
export default App;
