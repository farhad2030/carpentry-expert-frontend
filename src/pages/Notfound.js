import React from "react";
import { useNavigate } from "react-router-dom";

const Notfound = () => {
  const navigate = useNavigate();
  return (
    <div>
      404
      <button onClick={navigate("/")}>Go to Home</button>
    </div>
  );
};

export default Notfound;
