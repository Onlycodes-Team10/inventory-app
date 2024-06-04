import React from 'react';
import apiURL from '../api'

export const Item = (props) => {

  const {setSelectedItem} = props

  const handleItemClick = (item) => {
		setSelectedItem(props.Item);
	};

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

  const handleDelete = async (e) => {
    // TODO: implement delete
    e.preventDefault()
    console.log(props.Item)
    const res = await fetch(`${apiURL}/items/${props.Item.id}`,{
        method: "DELETE",
        headers: {
          'Content-type': 'application/json'
        }
    })
    const data = await res.json()
    console.log(data)
  }

  return <>
  <div className="item" >
    <h3 className='name' onClick={handleItemClick}>{props.Item.name}</h3>
    <h4 className='category'>{props.Item.category}</h4>
    <img src={props.Item.image} alt={props.Item.name} />
    <p className='description'>{props.Item.description}</p>
    <p className='price'>Price: ${props.Item.price}</p>
    <button onClick={handleEdit}>Edit</button>
    <button onClick={handleRemoveFromCart}>Remove from Cart</button>
    <button onClick={handleAddToCart}>Add to Cart</button>
    <button onClick={handleDelete}>Delete Item</button>
  </div>
  </>
} 