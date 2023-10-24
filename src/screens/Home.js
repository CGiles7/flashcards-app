import React, { useState } from "react";
import { Link } from "react-router-dom";
import DeckList from "./DeckList";
import data from "../data/db.json";


function Home() {
  const [decks, setDecks] = useState(data.decks);
  const [selectedDeckName, setSelectedDeckName] = useState(""); // New state variable

  const handleDeleteDeck = (deckId) => {
    if (window.confirm("Are you sure you want to delete this deck?")) {
      // Perform the delete operation if needed
      // Update the decks state accordingly
      setDecks((prevDecks) => prevDecks.filter((deck) => deck.id !== deckId));
      setSelectedDeckName(""); // Clear the selected deck name
    }
  }

  return (
    <div>
      <Link to="/decks/new" className="btn btn-primary">
        Create Deck
      </Link>
      <DeckList
        decks={decks}
        onDeleteDeck={handleDeleteDeck}
        setSelectedDeckName={setSelectedDeckName} // Pass the function to update the selected deck name
      />
      {selectedDeckName && (
        <div className="breadcrumb">
          Home / {selectedDeckName} {/* Display the selected deck name in the breadcrumb */}
        </div>
      )}
    </div>
  );
}

export default Home;