import React from 'react';

const LoginForm = () => {
  return (
    <form className="user">
      <div className="form-group">
        <input
          type="email"
          className="form-control form-control-user"
          id="exampleInputEmail"
          aria-describedby="emailHelp"
          placeholder="Enter Email Address..."
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          className="form-control form-control-user"
          id="exampleInputPassword"
          placeholder="Password"
        />
      </div>
      <a href="index.html" className="btn btn-primary btn-user btn-block">
        Login
      </a>
    </form>
  );
}

export default LoginForm;
