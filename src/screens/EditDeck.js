import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api";
import Header from "../Layout/Header";

function EditDeck({ decks, setDecks }) {
  const { deckId } = useParams();
  const history = useHistory();
  const [deck, setDeck] = useState({ name: "", description: "" });

  useEffect(() => {
    const abortController = new AbortController();

    async function loadDeck() {
      try {
        const loadedDeck = await readDeck(deckId, abortController.signal);
        setDeck(loadedDeck);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Request aborted.");
        } else {
          throw error;
        }
      }
    }

    loadDeck();

    return () => abortController.abort();
  }, [deckId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDeck((prevDeck) => ({ ...prevDeck, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const updatedDeck = { ...deck };
      await updateDeck(updatedDeck);
      setDecks((prevDecks) =>
        prevDecks.map((prevDeck) =>
          prevDeck.id === updatedDeck.id ? updatedDeck : prevDeck
        )
      );
      history.push(`/decks/${deckId}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    history.push(`/decks/${deckId}`);
  };

  return (
    <div>
      <Header />
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li className="breadcrumb-item">
            <a href={`/decks/${deckId}`}>{deck.name}</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Deck
          </li>
        </ol>
      </nav>
      <h1>Edit Deck</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={deck.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={deck.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
        <button
          type="button"
          className="btn btn-secondary ml-2"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default EditDeck;
