import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readCard, updateCard } from "../utils/api";
import Form from '../Layout/Form';

function EditCard() {
  const { deckId, cardId } = useParams();
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
      <Form
        card={card}
        onInputChange={(event) => {
          const { name, value } = event.target;
          setCard((prevCard) => ({ ...prevCard, [name]: value }));
        }}
        onSubmit={handleSave}
        onCancel={handleCancel}
      />
    </div>
  );
}

export default EditCard;