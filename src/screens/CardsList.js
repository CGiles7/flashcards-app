import React from "react";
import { Link } from "react-router-dom";

function CardsList({ decks, cards, handleDeleteCard }) {
  // Check if 'cards' is defined, and if not, return null
  if (!cards) {
    return null;
  }

  // Create a map to organize cards by deckId
  const cardsByDeck = cards.reduce((result, card) => {
    const { deckId } = card;
    if (!result[deckId]) {
      result[deckId] = [];
    }
    result[deckId].push(card);
    return result;
  }, {});

  return (
    <div>
      {decks.map((deck) => (
        <div key={deck.id}>
          <h2>{deck.name}</h2>
          <div>
            {cardsByDeck[deck.id] && cardsByDeck[deck.id].length > 0 ? (
              <ul className="list-group">
                {cardsByDeck[deck.id].map((card) => (
                  <li key={card.id} className="list-group-item">
                    <div className="row">
                      <div className="col-6">
                        <strong>Front:</strong> {card.front}
                      </div>
                      <div className="col-6">
                        <strong>Back:</strong> {card.back}
                      </div>
                    </div>
                    <div className="row mt-2">
                      <div className="col-6">
                        <Link
                          to={`/decks/${deck.id}/cards/${card.id}/edit`}
                          className="btn btn-secondary"
                        >
                          Edit
                        </Link>
                      </div>
                      <div className="col-6">
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDeleteCard(card.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No cards available for this deck.</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default CardsList;