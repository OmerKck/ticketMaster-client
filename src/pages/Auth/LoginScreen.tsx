import React, { useState } from "react";
import "./LoginScreen.css";

const LoginScreen = () => {
  const [state, setState] = useState({
    username: "",
    password: "",
  });
  const { username, password } = state;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(state);
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-3 col-md-2"></div>
        <div className="col-lg-6 col-md-8 login-box">
          <div className="col-lg-12 login-key">
            <i className="fa fa-key" aria-hidden="true"></i>
          </div>
          <div className="col-lg-12 login-title">TICKET MASTER</div>

          <div className="col-lg-12 login-form">
            <div className="col-lg-12 login-form">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-control-label">Kullanıcı Adınız</label>
                  <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label className="form-control-label">Şifreniz</label>
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="col-lg-12 loginbttm">
                  <div className="col-lg-6 login-btm login-text"></div>
                  <div className="col-lg-6 login-btm login-button">
                    <button type="submit" className="btn btn-outline-primary">
                      Giriş
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-lg-3 col-md-2"></div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
