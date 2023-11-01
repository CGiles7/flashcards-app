import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
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

  const handleCancel = () => {
    // Redirect the user to the home page
    history.push("/");
  };

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Create Deck
          </li>
        </ol>
      </nav>
      <h2>Create Deck</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" placeholder="Deck Name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            placeholder="Brief description of the deck"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button className="btn btn-primary" type="submit">Submit</button>
        <button className="btn btn-secondary" type="button" onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  );
}

export default CreateDeck;