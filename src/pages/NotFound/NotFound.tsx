import React from "react";
import { useNavigate } from "react-router-dom";

import "./index.scss";

export default function NotFound() {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    navigate("/");
  };

  return (
    <div className="not__found__page">
      <div className="not__found__container">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <button onClick={handleClick}>Go to Home</button>
      </div>
    </div>
  );
}
