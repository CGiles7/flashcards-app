import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { readDeck, createCard } from "../utils/api";
import Form from '../Layout/Form';

function AddCard() {
  const { deckId } = useParams();
  const history = useHistory();
  const initialCard = { front: "", back: "" };
  const [deck, setDeck] = useState(null);
  const [card, setCard] = useState(initialCard);

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
    setCard((prevCard) => ({ ...prevCard, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await createCard(deckId, card);
      const updatedDeck = { ...deck, cards: deck.cards + 1 };
      setCard(initialCard); // Clear the form
    } catch (error) {
      console.error(error);
    }
  };

  const handleDone = () => {
    history.push(`/decks/${deckId}`);
  };

  if (!deck) {
    return null;
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Add Card
          </li>
        </ol>
      </nav>
      <h1>Add Card</h1>
      <Form
        card={card}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
        onCancel={handleDone}
      />
    </div>
  );
}

export default AddCard;