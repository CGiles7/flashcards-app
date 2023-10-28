import React, { useState } from "react";
import { Link } from "react-router-dom";
import DeckList from "./DeckList";

function Home() {
  const [selectedDeck, setSelectedDeck] = useState(null); // Initialize as null

  // The list of decks should be managed within the DeckList component
  // as it's fetching data from the API.

  return (
    <div>
      <Link to="/decks/new" className="btn btn-primary">
        Create Deck
      </Link>
      <DeckList setSelectedDeck={setSelectedDeck} /> {/* Pass setSelectedDeck */}
      {selectedDeck && (
        <div className="breadcrumb">
          Home / {selectedDeck.name} {/* Display the selected deck's name in the breadcrumb */}
        </div>
      )}
    </div>
  );
}

export default Home;