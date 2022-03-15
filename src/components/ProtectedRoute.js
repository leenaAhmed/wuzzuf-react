import React from "react";
import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
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
              pathname:"/registration",
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
