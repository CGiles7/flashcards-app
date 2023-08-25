import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../Layout/Header";
import { listDecks, deleteDeck } from "../utils/api/index";

function DeckList() {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    async function loadDecks() {
      const loadedDecks = await listDecks();
      setDecks(loadedDecks);
    }
    loadDecks();
  }, []);

  const handleDelete = async (deckId) => {
    if (window.confirm("Are you sure you want to delete this deck?")) {
      await deleteDeck(deckId);
      const updatedDecks = decks.filter((deck) => deck.id !== deckId);
      setDecks(updatedDecks);
    }
  };

  return (
    <div>
      <Header />
      <h2>Decks</h2>
      <ul className="list-group">
        {decks.map((deck) => (
          <li key={deck.id} className="list-group-item">
            <div>
              <h3>{deck.name}</h3>
              <p>{deck.description}</p>
              <p>{deck.cards.length} cards</p>
              <Link to={`/study/${deck.id}`} className="btn btn-primary">
                Study
              </Link>{" "}
              <Link to={`/decks/${deck.id}`} className="btn btn-secondary">
                View
              </Link>{" "}
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(deck.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DeckList;
