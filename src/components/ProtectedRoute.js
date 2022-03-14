import React from "react";
import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import auth from "../firebase";
export default function ProtectedRoute({ component: Component, ...rest }) {
  const{currentUser}=useAuth()
  return (
    <Route
      {...rest}
      render={(props) => {
        return (
          currentUser ? (
          <Component {...props} />
        ) : (
          <Redirect to={
            {
              pathname:"/login",
              state:{
                from:props.location
              }
            }
          } />
        ));
      }}
    ></Route>
  );
}
