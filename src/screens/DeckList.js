import React from "react";
import { Link } from "react-router-dom";
import db from "../data/db.json"; 

function DeckList({ decks, onDeleteDeck, setSelectedDeckName }) {
  // Extract the cards array from the db.json data
  const { cards } = db;

  // Transform the cards array into arrays for each deck
  const cardsByDeckId = cards.reduce((acc, card) => {
    if (!acc[card.deckId]) {
      acc[card.deckId] = [];
    }
    acc[card.deckId].push(card);
    return acc;
  }, {});

  return (
    <div className="mt-4">
      {decks.map((deck) => (
        <div className="card" key={deck.id}>
          <div className="card-body">
            <h5 className="card-title">{deck.name}</h5>
            {/* Use the length of the array for the number of cards in each deck */}
            <p className="card-text">{`${cardsByDeckId[deck.id] ? cardsByDeckId[deck.id].length : 0} cards`}</p>
            <Link
              to={`/decks/${deck.id}/study`}
              className="btn btn-primary"
              onClick={() => setSelectedDeckName(deck.name)} // Set the selected deck name
            >
              Study
            </Link>
            <Link to={`/decks/${deck.id}`} className="btn btn-secondary">
              View
            </Link>

            <button
              className="btn btn-danger"
              onClick={() => onDeleteDeck(deck.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DeckList;