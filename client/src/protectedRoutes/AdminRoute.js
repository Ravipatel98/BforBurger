import React from "react";
import { Route, Redirect } from "react-router-dom";

const AdminRoute = ({ loggedInUser, component: Component, ...rest }) => {
  return (
    <Route
      exact
      {...rest}
      render={(props) => {
        console.log(loggedInUser);
        if (
          JSON.stringify(loggedInUser) !== "{}" &&
          loggedInUser.data.user.role.toLowerCase() === "admin"
        ) {
          return <Component />;
        } else {
          return (
            <Redirect to={{ pathname: "/", state: { from: props.location } }} />
          );
        }
      }}
    />
  );
};

export default AdminRoute;
