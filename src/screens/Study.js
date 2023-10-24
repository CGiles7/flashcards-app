import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { readDeck } from '../utils/api';
import CardsList from './CardsList';

function Study() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState(null);
  const [cards, setCards] = useState([]);

  // Load the deck and its cards
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

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            {deck ? (
              <Link to={`/decks/${deck.id}/study`}>{deck.name}</Link>
            ) : (
              'Deck'
            )}
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Study
          </li>
        </ol>
      </nav>

      {deck ? <h2>{`Study: ${deck.name}`}</h2> : null}

      <CardsList decks={deck ? [deck] : []} cards={cards} />
      {/* Additional study components */}
    </div>
  );
}

export default Study;