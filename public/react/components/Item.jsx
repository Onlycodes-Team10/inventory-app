import React from 'react';

export const Item = (props) => {

  const handleEdit = () => {
    // TODO: implement edit
    console.log("Edit button clicked");
  }

  const handleRemoveFromCart = () => {
    // TODO: implement remove
    console.log("Remove button clicked");
  }

  const handleAddToCart = () => {
    // TODO: implement add
    console.log("Add button clicked");
  }

  const handleDelete = () => {
    // TODO: implement delete
    console.log("Delete button clicked");
  }

  return <>
    <h3>{props.Item.name}</h3>
    <h4>{props.Item.category}</h4>
    <img src={props.Item.image} alt={props.Item.name} />
    <p>{props.Item.description}</p>
    <p>Price: ${props.Item.price}</p>
    <button onClick={handleEdit}>Edit</button>
    <button onClick={handleRemoveFromCart}>Remove from Cart</button>
    <button onClick={handleAddToCart}>Add to Cart</button>
    <button onClick={handleDelete}>Delete Item</button>
  </>
} 