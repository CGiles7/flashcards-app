import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readCard, updateCard } from "../utils/api";

function EditCard() {
  const { deckId } = useParams();
  const { cardId } = useParams();
  const history = useHistory();
  const [card, setCard] = useState({ front: "", back: "" });

  useEffect(() => {
    async function loadCard() {
      try {
        const loadedCard = await readCard(cardId);
        setCard(loadedCard);
      } catch (error) {
        console.error(error);
      }
    }

    loadCard();
  }, [cardId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCard((prevCard) => ({ ...prevCard, [name]: value }));
  };

  const handleSave = async (event) => {
    event.preventDefault();

    try {
      await updateCard(card);
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
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{`Deck ${deckId}`}</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}/cards/${cardId}`}>{`Card ${cardId}`}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Card
          </li>
        </ol>
      </nav>
      <h1>Edit Card</h1>
      <form onSubmit={handleSave}>
        <div className="mb-3">
          <label htmlFor="front" className="form-label">
            Front
          </label>
          <textarea
            className="form-control"
            id="front"
            name="front"
            value={card.front || ""}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="back" className="form-label">
            Back
          </label>
          <textarea
            className="form-control"
            id="back"
            name="back"
            value={card.back || ""}
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

export default EditCard;