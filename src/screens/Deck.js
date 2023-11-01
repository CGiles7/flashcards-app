import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { readDeck } from "../utils/api";

function Deck({ selectedDeck }) {
  const { deckId } = useParams();
  const [deck, setDeck] = useState(null);
  const [deckCards, setDeckCards] = useState([]); // Store cards for the selected deck

  // Load the deck and its cards
  useEffect(() => {
    async function loadDeck() {
      try {
        const loadedDeck = await readDeck(deckId);
        setDeck(loadedDeck);

        // Filter the cards for the selected deck and store them
        setDeckCards(selectedDeck ? selectedDeck.cards : []);
      } catch (error) {
        console.log('Error loading deck: ' + error.message);
      }
    }

    loadDeck();
  }, [deckId, selectedDeck]);

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          {selectedDeck && (
            <li className="breadcrumb-item">
              {deck.name}
            </li>
          )}
        </ol>
      </nav>
    </div>
  );
}

export default Deck;