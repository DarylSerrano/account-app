import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import RootPage from "./page/Root";
import UserPage from "./page/User";
import UserCreatePage from "./page/UserCreatePage";
import NavBar from "./components/NavBar";

export default function Routes() {
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path="/users/new" component={UserCreatePage}></Route>
        <Route path="/users/:id" component={UserPage}></Route>

        <Route exact path="/" component={RootPage}></Route>
      </Switch>
    </BrowserRouter>
  );
}
