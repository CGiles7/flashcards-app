import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck } from "../utils/api";
import CardsList from "./CardsList";

function Study() {
  const { deckId } = useParams();
  const history = useHistory();
  const [deck, setDeck] = useState(null);
  const [cards, setCards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showBack, setShowBack] = useState(false);

  useEffect(() => {
    async function loadDeck() {
      try {
        const loadedDeck = await readDeck(deckId);
        setDeck(loadedDeck);
        setCards(loadedDeck.cards);
      } catch (error) {
        console.log('Error loading deck: ' + error.message);
      }
    }

    loadDeck();
  }, [deckId]);

  const nextCard = () => {
    // Move to the next card or back to the first card if at the end
    setCurrentCardIndex((prevIndex) =>
      prevIndex === cards.length - 1 ? 0 : prevIndex + 1
    );
    setShowBack(false); // Show the front side by default on the next card

    // Check if all cards have been shown
    if (currentCardIndex === cards.length - 1) {
      const confirmRestart = window.confirm('Congratulations! You have completed the deck. Do you want to restart the deck?');
      if (confirmRestart) {
        setCurrentCardIndex(0);
        setShowBack(false);
      } else {
        history.push('/');
      }
    }
  };

  const flipCard = () => {
    // Toggle the state to flip the card
    setShowBack((prevShowBack) => !prevShowBack);
  };

  if (cards.length <= 2) {
    return (
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            {deck && (
              <li className="breadcrumb-item">
                <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
              </li>
            )}
            <li className="breadcrumb-item active" aria-current="page">
              Study
            </li>
          </ol>
        </nav>
        <h2>{`Study: ${deck ? deck.name : 'Deck'}`}</h2>
        <h4>Not enough cards in the deck. Add more cards to study.</h4>
        <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">
          Add Cards
        </Link>
      </div>
    );
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          {deck && (
            <li className="breadcrumb-item">
              <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
            </li>
          )}
          <li className="breadcrumb-item active" aria-current="page">
            Study
          </li>
        </ol>
      </nav>
      <h2>{`Study: ${deck ? deck.name : 'Deck'}`}</h2>
      <h4>Card {currentCardIndex + 1} of {cards.length}</h4>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">
            {showBack ? 'Back' : 'Front'}
          </h5>
          <p className="card-text">
            {showBack ? cards[currentCardIndex].back : cards[currentCardIndex].front}
          </p>
          <button className="btn btn-secondary" onClick={flipCard}>
            Flip
          </button>
          {showBack && (
            <button className="btn btn-primary" onClick={nextCard}>
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Study;