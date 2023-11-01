import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, deleteDeck, deleteCard } from "../utils/api/index";
import CardsList from "./CardsList";

function Deck() {
  const { deckId } = useParams();
  const history = useHistory();
  const [deck, setDeck] = useState(null);

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

  const handleDeleteDeck = async () => {
    if (window.confirm('Are you sure you want to delete this deck?')) {
      try {
        await deleteDeck(deckId);
        history.push('/');
      } catch (error) {
        console.log('Error deleting deck: ' + error.message);
      }
    }
  };

  const handleDeleteCard = async (cardId) => {
    if (window.confirm('Are you sure you want to delete this card?')) {
      try {
        await deleteCard(cardId);
        setDeck((prevDeck) => {
          const updatedCards = prevDeck.cards.filter((card) => card.id !== cardId);
          return { ...prevDeck, cards: updatedCards };
        });
      } catch (error) {
        console.error('Error deleting card: ' + error.message);
      }
    }
  };

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          {deck && (
            <li className="breadcrumb-item">
              {deck.name}
            </li>
          )}
        </ol>
      </nav>

      {deck && (
        <div className="deck-details">
          <h2>{deck.name}</h2>
          <p>{deck.description}</p>
          <Link to={`/decks/${deck.id}/edit`} className="btn btn-secondary">
            Edit
          </Link>
          <Link to={`/decks/${deck.id}/study`} className="btn btn-primary">
            Study
          </Link>
          <Link to={`/decks/${deck.id}/cards/new`} className="btn btn-primary">
            Add Cards
          </Link>
          <button className="btn btn-danger" onClick={handleDeleteDeck}>
            Delete
          </button>
        </div>
      )}
      <CardsList decks={[deck]} cards={deck.cards} handleDeleteCard={handleDeleteCard} />
    </div>
  );
}

export default Deck;