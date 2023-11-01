import React from "react";

function CardsList({ decks, cards }) {
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
              <ul>
                {cardsByDeck[deck.id].map((card) => (
                  <li key={card.id}>
                    <strong>Front:</strong> {card.front}
                    <br />
                    <strong>Back:</strong> {card.back}
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
