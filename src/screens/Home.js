import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listDecks, deleteDeck } from "../utils/api/index";
import Header from "../Layout/Header";
import DeckList from "./DeckList"; // Import the DeckList component

function Home() {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    
    async function loadDecks() {
      try {
        const loadedDecks = await listDecks(abortController.signal);
        setDecks(loadedDecks);
      } catch (error) {
        if (!abortController.signal.aborted) {
          throw error;
        }
      }
    }

    loadDecks();

    return () => abortController.abort();
  }, []);

  const handleDeleteDeck = async (deckId) => {
    if (window.confirm("Are you sure you want to delete this deck?")) {
      await deleteDeck(deckId);
      setDecks((prevDecks) => prevDecks.filter((deck) => deck.id !== deckId));
    }
  };

  return (
    <div>
      <Header />
      <Link to="/decks/new" className="btn btn-primary">
        Create Deck
      </Link>
      <DeckList decks={decks} onDeleteDeck={handleDeleteDeck} />
    </div>
  );
}

export default Home;
