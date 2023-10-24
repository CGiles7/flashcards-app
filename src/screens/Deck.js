import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { readDeck } from '../utils/api';

function Deck() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState(null);

  // Load the deck and its cards
  useEffect(() => {
    async function loadDeck() {
      try {
        const loadedDeck = await readDeck(deckId);
        setDeck(loadedDeck);
      } catch (error) {
        console.log('Error loading deck: ' + error.message);
      }
    }

    loadDeck();
  }, [deckId]);

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            {deck}
          </li>
        </ol>
      </nav>
    </div>
  );
}

export default Deck;