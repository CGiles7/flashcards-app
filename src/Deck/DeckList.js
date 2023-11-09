import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listDecks } from "../utils/api"; // Import the listDecks function

function DeckList({ onDeleteDeck, setSelectedDeck, deckCards }) {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();

    // Fetch the decks from the API
    listDecks(abortController.signal)
      .then((decks) => setDecks(decks))
      .catch((error) => console.error("Error fetching decks: " + error.message));

    // Cleanup the controller when the component unmounts
    return () => abortController.abort();
  }, []);

  return (
    <div className="mt-4">
      {decks.map((deck) => (
        <div className="card" key={deck.id}>
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-start">
              <h5 className="card-title">{deck.name}</h5>
              <p className="text-end">
                {`${deckCards.filter((card) => card.deckId === deck.id).length} cards`}
              </p>
            </div>
            <p className="card-text">{deck.description}</p>
            <Link
              to={`/decks/${deck.id}/study`}
              className="btn btn-primary"
              onClick={() => setSelectedDeck(deck)}
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