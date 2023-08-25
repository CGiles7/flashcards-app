import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { readDeck } from "../utils/api";
import NotFound from "../Layout/NotFound";
import Header from "../Layout/Header";

function Study() {
  const { deckId } = useParams();
  const history = useHistory();
  const [deck, setDeck] = useState(null);
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

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

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  const nextCard = () => {
    setIsFlipped(false);
    setCardIndex((prevIndex) => (prevIndex + 1) % deck.cards.length);
  };

  const restartDeck = () => {
    setCardIndex(0);
    setIsFlipped(false);
  };

  const handleCardIndexChange = (newIndex) => {
    setCardIndex(newIndex);
    setIsFlipped(false);
  };

  if (!deck) {
    return <NotFound />;
  }

  if (deck.cards.length <= 2) {
    return (
      <div>
        <Header />
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/decks/${deckId}`}>{deck.name}</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Study
            </li>
          </ol>
        </nav>
        <h2>{deck.name}: Study</h2>
        <h3>Not enough cards.</h3>
        <p>You need at least 3 cards to study. Add more cards to the deck.</p>
        <br />
        <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">
          Add Cards
        </Link>
      </div>
    );
  }

  const currentCard = deck.cards[cardIndex];

  return (
    <div>
      <Header />
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Study
          </li>
        </ol>
      </nav>
      <h2>{deck.name}: Study</h2>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">
            Card {cardIndex + 1} of {deck.cards.length}
          </h5>
          <p className="card-text">
            {isFlipped ? currentCard.back : currentCard.front}
          </p>
          <button className="btn btn-secondary" onClick={flipCard}>
            Flip
          </button>{" "}
          {isFlipped && (
            <button className="btn btn-primary" onClick={nextCard}>
              Next
            </button>
          )}
          {!isFlipped && cardIndex === deck.cards.length - 1 && (
            <div>
              <p>All cards have been studied. Do you want to restart the deck?</p>
              <button className="btn btn-secondary" onClick={restartDeck}>
                Restart
              </button>{" "}
              <button
                className="btn btn-primary"
                onClick={() => history.push(`/decks/${deckId}`)}
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Study;
