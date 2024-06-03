import React from 'react';

export const Items = (props) => {

  return <>
    <h3>{props.items.name}</h3>
    <img src={props.items.image} alt={props.items.name} />
  </>
} 
	