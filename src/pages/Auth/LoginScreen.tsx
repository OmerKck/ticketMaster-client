import React, { useState } from "react";
import "./LoginScreen.css";
import axios from "axios";
import { apiURL } from "../../constants";

const LoginScreen = () => {
  const [state, setState] = useState({
    username: "",
    password: "",
  });
  const [usernameError, setUsernameError] = useState({
    status: false,
    errorText: "",
  });
  const [passwordError, setPasswordError] = useState({
    status: false,
    errorText: "",
  });
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState(false);

  const { username, password } = state;
  const handleChange = (e) => {
    setPasswordError({
      status: false,
      errorText: "",
    });

    setUsernameError({
      status: false,
      errorText: "",
    });
    setAuthError(false);
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    const { username, password } = state;
    if (username === "") {
      setUsernameError({
        status: true,
        errorText: "Kullanıcı adı boş geçilemez",
      });
    } else if (username.length < 4) {
      setUsernameError({
        status: true,
        errorText: "Kullanıcı adı minimum 4 karakter olmalıdır",
      });
    }
    if (password === "") {
      setPasswordError({
        status: true,
        errorText: "Şifre alanı  boş geçilemez",
      });
    } else if (password.length < 4) {
      setPasswordError({
        status: true,
        errorText: "Şifre alanı minimum 4 karakter olmalıdır",
      });
    }
    axios
      .post(`${apiURL}/auth/local`, {
        identifier: username,
        password: password,
      })
      .then((res) => {
        setLoading(false);
      })
      .catch((err) => {
        setAuthError(true);
        setLoading(false);
      });
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
                    required
                  />
                  {usernameError.status && (
                    <span className="bg-danger text-white">
                      {usernameError.errorText}
                    </span>
                  )}
                </div>
                <div className="form-group">
                  <label className="form-control-label">Şifreniz</label>
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                  {passwordError.status && (
                    <span className="bg-danger text-white">
                      {passwordError.errorText}
                    </span>
                  )}
                </div>
                {authError && (
                  <span className="text-white">
                    Giriş yapılamadı. Bilgilerinizi kontrol edip tekrar
                    deneyiniz.
                  </span>
                )}

                <div className="col-lg-12 loginbttm">
                  <div className="col-lg-6 login-btm login-text"></div>
                  <div className="col-lg-6 login-btm login-button">
                    <button
                      type="submit"
                      className="btn btn-outline-primary"
                      disabled={loading}
                    >
                      {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
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
