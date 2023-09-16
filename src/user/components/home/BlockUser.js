import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../actions/userAction";

const BlockUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(logout());
  },[]);

  return (
    <div id="waiting-Page">
      <div className="card border-danger mb-3  mx-auto w-75">
        <div className="card-body  text-center pt-5 pb-5">
          <h5 className="card-title text-danger">Your account is blocked.</h5>
          <p className="card-text">Please Contact admin@socialBharat.com</p>
          <a href="#" class="btn btn-primary" onClick={()=>navigate('/')}>
            Go to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default BlockUser;
