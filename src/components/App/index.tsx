import React from "react";
import { LoginScreen, RegisterScreen } from "../../pages/Auth";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "../../pages/Home";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={LoginScreen} />
        <Route exact path="/register" component={RegisterScreen} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
