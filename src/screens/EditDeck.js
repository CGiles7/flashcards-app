import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api";

function EditDeck() {
  const { deckId } = useParams();
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
      }
    );
  };

  return (
    <div>
      {deck && (
        <div>
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
            <button type="submit">Save</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default EditDeck;