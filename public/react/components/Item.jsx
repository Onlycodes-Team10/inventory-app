import React from 'react';

export const Item = (props) => {

  return <>
    <h3>{props.Item.name}</h3>
    <h4>{props.Item.category}</h4>
    <img src={props.Item.image} alt={props.Item.name} />
    <p>{props.Item.description}</p>
    <p>Price: ${props.Item.price}</p>
    <button onClick={}>Edit</button> // TODO 
    <button onClick={}>Remove from Cart</button> // TODO add a button to remove from cart
    <button onClick={}>Add to Cart</button> // TODO add a button to add to cart
  </>
} 