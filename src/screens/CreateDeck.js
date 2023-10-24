import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createDeck } from "../utils/api";

function CreateDeck() {
  const history = useHistory();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    createDeck({ name, description }).then((newDeck) => {
      // Handle the newly created deck, e.g., navigate to its view page
      history.push(`/decks/${newDeck.id}`);
    });
  };

  return (
    <div>
      <h2>Create Deck</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreateDeck;