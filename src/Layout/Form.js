import React from 'react';

function Form({ card, onInputChange, onSubmit, onCancel }) {
  return (
    <form onSubmit={onSubmit}>
      <div className="mb-3">
        <label htmlFor="front" className="form-label">
          Front
        </label>
        <textarea
          className="form-control"
          id="front"
          name="front"
          value={card.front}
          placeholder="Front side of card"
          onChange={onInputChange}
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
          value={card.back}
          placeholder="Back side of card"
          onChange={onInputChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Save
      </button>
      <button type="button" className="btn btn-secondary ml-2" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
}

export default Form;