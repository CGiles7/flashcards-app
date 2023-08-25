import React, { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { readDeck, deleteDeck } from "../utils/api"; // Assuming you have a deleteDeck function
import NotFound from "../Layout/NotFound";
import Header from "../Layout/Header";

function DeckView({ deleteCardHandler }) {
  const { deckId } = useParams();
  const history = useHistory();
  const [deck, setDeck] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    async function loadDeck() {
      try {
        const loadedDeck = await readDeck(deckId, abortController.signal);
        setDeck(loadedDeck);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Aborted fetch: " + error.message);
        } else {
          console.log("Error loading deck: " + error.message);
        }
      }
    }

    loadDeck();

    return () => {
      abortController.abort();
    };
  }, [deckId]);

  const handleDeleteDeck = async () => {
    if (window.confirm("Are you sure you want to delete this deck?")) {
      await deleteDeck(deckId);
      history.push("/");
    }
  };

  const handleDeleteCard = async (cardId) => {
    if (window.confirm("Are you sure you want to delete this card?")) {
      deleteCardHandler(cardId);
    }
  };

  if (!deck) {
    return <NotFound />;
  }

  return (
    <div>
      <Header />
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {deck.name}
          </li>
        </ol>
      </nav>
      <div>
        <h4>{deck.name}</h4>
        <p>{deck.description}</p>
        <Link to={`/decks/${deckId}/edit`} className="btn btn-secondary">
          Edit
        </Link>{" "}
        <Link to={`/decks/${deckId}/study`} className="btn btn-primary">
          Study
        </Link>{" "}
        <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">
          Add Cards
        </Link>{" "}
        <button className="btn btn-danger" onClick={handleDeleteDeck}>
          Delete
        </button>
      </div>
      <h2>Cards</h2>
      {deck.cards.map((card) => (
        <div key={card.id} className="card">
          <div className="card-body">
            <h5 className="card-title">Question:</h5>
            <p className="card-text">{card.front}</p>
            <h5 className="card-title">Answer:</h5>
            <p className="card-text">{card.back}</p>
            <Link
              to={`/decks/${deckId}/cards/${card.id}/edit`}
              className="btn btn-secondary"
            >
              Edit
            </Link>{" "}
            <button
              className="btn btn-danger"
              onClick={() => handleDeleteCard(card.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DeckView;
