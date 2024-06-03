import React from 'react';

export const Items = (props) => {

  return <>
    <h3>Name: {props.item.name}</h3>
    <img src={props.item.image} alt={props.item.name} />
    <p>Description: {props.item.description}</p>
    <p>Category: {props.item.category}</p>
    <p>Price: £{props.item.price}</p>
    <button>Edit item</button>
    <button>Delete item</button>
  </>
} 
	