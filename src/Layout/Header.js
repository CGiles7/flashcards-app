// src/Layout/Header.js
import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="jumbotron bg-dark">
      <div className="container text-white">
        <h1 className="display-4">Flashcard-o-matic</h1>
        <p className="lead">Discover The Flashcard Difference.</p>
        <nav>
          <Link to="/" className="btn btn-link text-white">
            Home
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
