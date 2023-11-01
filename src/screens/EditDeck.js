import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api";

function EditDeck() {
  const { deckId } = useParams();
  const history = useHistory();
  const [deck, setDeck] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");

  useEffect(() => {
    readDeck(deckId).then((fetchedDeck) => {
      setDeck(fetchedDeck);

      // Populate input fields with the current data
      setUpdatedName(fetchedDeck.name);
      setUpdatedDescription(fetchedDeck.description);
    });
  }, [deckId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateDeck({ ...deck, name: updatedName, description: updatedDescription }).then(
      (updatedDeck) => {
        // Handle the updated deck, e.g., navigate to its view page
        history.push(`/decks/${updatedDeck.id}`);
      }
    );
  };

  return (
    <div>
      {deck && (
        <div>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Edit Deck
              </li>
            </ol>
          </nav>
          <h2>Edit Deck</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Name:</label>
              <input
                type="text"
                value={updatedName}
                onChange={(e) => setUpdatedName(e.target.value)}
              />
            </div>
            <div>
              <label>Description:</label>
              <textarea
                value={updatedDescription}
                onChange={(e) => setUpdatedDescription(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
            <Link to={`/decks/${deck.id}`} className="btn btn-secondary">
              Cancel
            </Link>
          </form>
        </div>
      )}
    </div>
  );
}

export default EditDeck;