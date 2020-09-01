import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import RootPage from "./pages/Root";
import UserPage from "./pages/User";
import UserCreatePage from "./pages/UserCreatePage";
import ConnectionCreatePage from "./pages/ConnectionCreatePage";
import UserEditPage from "./pages/UserEditPage";
import ConnectionDeletePage from "./pages/ConnectionDeletePage";
import NotFoundPage from "./pages/NotFoundPage";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/users/new" component={UserCreatePage}></Route>
        <Route
          path="/users/:id/connections/create"
          component={ConnectionCreatePage}
        ></Route>
        <Route
          path="/users/:id/connections/delete"
          component={ConnectionDeletePage}
        ></Route>
        <Route path="/users/:id/edit" component={UserEditPage}></Route>
        <Route path="/users/:id" component={UserPage}></Route>

        <Route exact path="/" component={RootPage}></Route>
        <Route component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
}
