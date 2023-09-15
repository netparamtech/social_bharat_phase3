import React from "react";
import { useNavigate } from "react-router-dom";

const BlockUser = () => {
  const navigate = useNavigate();

  return (
    <div id="waiting-Page">
      <div className="card border-danger mb-3  mx-auto w-75">
        <div className="card-body  text-center pt-5 pb-5">
          <h5 className="card-title text-danger">You account is blocked.</h5>
          <p className="card-text">Please Contact admin@socialBharat.com</p>
          <a href="/" class="btn btn-primary">
            Go to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default BlockUser;
