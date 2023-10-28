import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DeckList from "./DeckList";
import { listDecks, deleteDeck } from "../utils/api"; // Import the deleteDeck function

function Home() {
  const [decks, setDecks] = useState([]);
  const [deckCards, setDeckCards] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();

    listDecks(abortController.signal)
      .then((decks) => {
        setDecks(decks);
        const allCards = decks.reduce((cards, deck) => cards.concat(deck.cards), []);
        setDeckCards(allCards);
      })
      .catch((error) => console.error("Error fetching decks: " + error.message));

    return () => abortController.abort();
  }, []);

  // Define the handleDeleteDeck function
  const handleDeleteDeck = async (deckId) => {
    if (window.confirm("Are you sure you want to delete this deck?")) {
      try {
        // Call the deleteDeck function and update the decks state
        await deleteDeck(deckId);
        setDecks((prevDecks) => prevDecks.filter((deck) => deck.id !== deckId));
        const allCards = decks.reduce((cards, deck) => cards.concat(deck.cards), []);
        setDeckCards(allCards);
      } catch (error) {
        console.error("Error deleting deck: " + error.message);
      }
    }
  };

  return (
    <div>
      <Link to="/decks/new" className="btn btn-primary">
        Create Deck
      </Link>
      <DeckList decks={decks} deckCards={deckCards} onDeleteDeck={handleDeleteDeck} />
    </div>
  );
}

export default Home;