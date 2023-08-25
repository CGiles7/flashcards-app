import React from "react";
import { Route, Switch } from "react-router-dom";
import Layout from "./Layout";
import NotFound from "./Layout/NotFound"; // Import the NotFound component
import "./App.css";

/**
 * App is a wrapper for <Layout>, you should not need to change this file.
 */

function App() {
  return (
    <div className="app-routes">
      <Switch>
        <Route exact path="/">
          <Layout />
        </Route>
        {/* Add a route for any other path */}
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
