import React, { useState } from "react";

function PlantCard({ plant, onDeletePlant, onUpdatePlant }) {
  const { id, name, image, price } = plant
  const [inStock, setInStock] = useState(true)
  const [updatedPrice, setUpdatedPrice] = useState(price)


  function handleToggleStock() {
    setInStock(!inStock)
  }
  function handleDeletePlant() {
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "DELETE",
    })
    onDeletePlant(id);
  };

  function handlePriceFormSubmit(e) {
    e.preventDefault()
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ price: updatedPrice })
    })
      .then((res) => res.json())
      .then((updatedPlant) => {
        onUpdatePlant(updatedPlant)
      })
  }
  return (
    <li className="card">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>Price: {price}</p>
      {inStock ? (
        <button onClick={handleToggleStock} className="primary">In Stock</button>
      ) : (
        <button onClick={handleToggleStock}>Out of Stock</button>
      )}
      <button onClick={handleDeletePlant}>Delete</button>
      <form onSubmit={handlePriceFormSubmit}>
        <input
          type="number"
          step="0.01"
          id="price"
          placeholder="New Price..."
          value={updatedPrice}
          onChange={(e) => setUpdatedPrice(parseFloat(e.target.value))}
        />
        <button type="submit">Update Price</button>
      </form>
    </li>
  );
}

export default PlantCard;
