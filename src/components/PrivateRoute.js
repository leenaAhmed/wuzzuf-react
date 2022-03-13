import React from "react";
import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import auth from "./../firebase";
export default function PrivateRoute({ component: Component, ...rest }) {
  console.log(auth.auth().currentUser.uid);
  return (
    <Route
      {...rest}
      render={(props) => {
        return auth.auth().currentUser.uid ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        );
      }}
    ></Route>
  );
}
