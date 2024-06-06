import React from 'react';
import apiURL from '../api'

export const Item = (props) => {

  const {setSelectedItem, setItemEditFormOpen, selectedItem, items, setItems, onItemClick } = props

  const handleBack = () => {
    setSelectedItem(null);
  };

  const handleItemClick = (item) => {
		if (onItemClick) {
      onItemClick(props.Item);
    } else {
      setSelectedItem(props.Item);
    }
	};

  const handleEdit = () => {
    setItemEditFormOpen(true);
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
    e.preventDefault()
    const res = await fetch(`${apiURL}/items/${props.Item.id}`,{
        method: "DELETE",
        headers: {
          'Content-type': 'application/json'
        }
    })
    await res.json()
    console.log(items)
    if (res.ok){
      const itemPos = items.indexOf(items.find(item => item.id === props.Item.id))
      setItems(items.toSpliced(itemPos,1))
      setSelectedItem(null)
    }

  }

  return (
    <div className="item" onClick={handleItemClick} >
      <h3 className='name' >{props.Item.name}</h3>
      <h4 className='category'>{props.Item.category}</h4>
      <img src={props.Item.image} alt={props.Item.name} />
      <p className='description'>{props.Item.description}</p>
      <p className='price'>Price: ${props.Item.price}</p>
      {selectedItem ? 
        <button onClick={handleEdit}>Edit Item</button>            
        : ""}
        <button onClick={handleAddToCart}>Add to Cart</button>
        <button onClick={handleRemoveFromCart}>Remove from Cart</button>
        {selectedItem ? 
        <button onClick={handleDelete}>Delete Item</button>            
        : ""}
    </div>
  )
} 