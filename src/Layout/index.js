import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import Deck from "../screens/Deck";
import CreateDeck from "../screens/CreateDeck";
import EditDeck from "../screens/EditDeck";
import AddCard from "../screens/AddCard";
import EditCard from "../screens/EditCard";
import Study from "../screens/Study"; 
import Home from "../screens/Home"; 

function Layout() {
  return (
    <div>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/decks/new">
            <CreateDeck />
          </Route>
          <Route path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route path="/decks/:deckId/edit">
            <EditDeck />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>
          <Route path="/decks/:deckId">
            <Deck />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
      </div>
  );
}

export default Layout;
