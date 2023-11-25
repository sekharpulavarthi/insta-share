import Cookies from "js-cookie";
import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = (props) => {
  const jwtToken = Cookies.get("jwt_token");
  if (jwtToken === undefined) return <Redirect to="/login" />;
  else return <Route {...props} />;
};

export default ProtectedRoute;
