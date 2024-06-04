import React from 'react';
import apiURL from '../api'

export const Item = (props) => {

  const {setSelectedItem, setItemEditFormOpen, selectedItem} = props

  const handleItemClick = (item) => {
		setSelectedItem(props.Item);
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
    // TODO: implement delete
    e.preventDefault()
    const res = await fetch(`${apiURL}/items/${props.Item.id}`,{
        method: "DELETE",
        headers: {
          'Content-type': 'application/json'
        }
    })
    await res.json()
    if (res.ok){
      const itemPos = props.items.indexOf(props.items.find(item => item.id === props.Item.id))
      props.setItems(props.items.toSpliced(itemPos,1))
    }

  }

  return <>
    <div className="item" >
      <h3 className='name' onClick={handleItemClick}>{props.Item.name}</h3>
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
  </>
} 