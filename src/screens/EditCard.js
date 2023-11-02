import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readCard, updateCard } from "../utils/api";

function EditCard() {
  const { deckId } = useParams();
  const { cardId } = useParams();
  const [deck, setDeck] = useState();
  const history = useHistory();
  const [card, setCard] = useState({ front: "", back: "" });
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

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
      await updateCard({ ...card, id: cardId });
      history.push(`/decks/${deckId}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    history.push(`/decks/${deckId}`);
  };  

  const handleDeleteCard = () => {
    // Implement deletion of the last card added to the deck
    // This is a basic example and may need to be adjusted based on your data structure
    if (deckId && deckId !== "") {
      // Replace this logic with your actual data manipulation
      const updatedDeck = { ...deck, cards: deck.cards - 1 };
      setDeck(updatedDeck);
    }

    // Redirect the user to the AddCard screen
    history.push(`/decks/${deckId}/cards/new`);
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

      {showDeleteConfirmation && (
        <div className="modal">
          <div className="modal-content">
            <p>Are you sure you want to cancel editing this card?</p>
            <button className="btn btn-danger" onClick={handleDeleteCard}>
              Yes, Cancel
            </button>
            <button className="btn btn-secondary" onClick={() => setShowDeleteConfirmation(false)}>
              No, Continue Editing
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditCard;