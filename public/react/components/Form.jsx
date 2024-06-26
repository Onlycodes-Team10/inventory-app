import React, {useState, useEffect} from 'react';
import apiURL from '../api';

const addItemForm = ({setAddItemFormOpen, itemToEdit, setSelectedItem, setItems, items}) => {

    const [itemName, setItemName] = useState(itemToEdit ? itemToEdit.name : '');
    const [itemCategory, setItemCategory] = useState(itemToEdit ? itemToEdit.category : '');
    const [itemImage, setItemImage] = useState(itemToEdit ? itemToEdit.image : '');
    const [itemDescription, setItemDescription] = useState(itemToEdit ? itemToEdit.description : '');
    const [itemPrice, setItemPrice] = useState(itemToEdit ? itemToEdit.price : '');
    const [itemPresent, setItemPresent] = useState(itemToEdit ? itemToEdit.present : false);
    
    const [failFlag, setFailFlag] = useState(false);

    useEffect(() => {
        // console.log('use effect')
        console.log(itemToEdit)
        if (itemToEdit !== null) {
            // console.log("item present");
            setItemPresent(true);
            setItemName(itemToEdit.name);
            setItemCategory(itemToEdit.category);
            setItemImage(itemToEdit.image);
            setItemDescription(itemToEdit.description);
            setItemPrice(itemToEdit.price);
        } else {
            // console.log('no item present');
            setItemPresent(false);
        }
    }, [itemToEdit])

    const handleBack = () => {
        setSelectedItem(null);
        setAddItemFormOpen(false)
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (itemPresent) {

            const updatedItem = {
                name: itemName,
                category: itemCategory,
                image: itemImage,
                description: itemDescription,
                price: parseFloat(itemPrice),
            };

            try {
                const response = await fetch(`${apiURL}/items/${itemToEdit.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedItem),
                });

                if (response.ok) {
                    const result = await response.json();
                    setSelectedItem(result)
                    const itemPos = items.indexOf(items.find(item => item.id === result.id))
                    setItems(items.toSpliced(itemPos, 1, result))
                    setAddItemFormOpen(false);
                    setFailFlag(false);
                } else {
                    console.error('Failed to add item');
                    // I want to show something in the UI to let the user know that the item was not updated
                    setFailFlag(true);
                }
            } catch (error) {
                console.error('A wild error has appeared! ', error);
            }

        } else {
            const newItem = {
                name: itemName,
                category: itemCategory,
                image: itemImage,
                description: itemDescription,
                price: parseFloat(itemPrice),
            };

            try {
                const response = await fetch(`${apiURL}/items`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newItem),
                });

                if (response.ok) {
                    const result = await response.json();
                    console.log('Item added:', result);
                    setFailFlag(false);
                    setAddItemFormOpen(false);
                } else {
                    console.error('Failed to add item');
                    setFailFlag(true);
                }
            } catch (error) {
                console.error('A wild error has appeared! ', error);
            }
        }
    };

    return (
        failFlag ? <div style={{color: 'red'}}>Item not added</div> :
        
        <form onSubmit={handleSubmit}>

            <div className='form-label'>
                <label>
                    Item Name: </label>
                <input
                    type="text"
                    value={itemName} 
                    onChange={(e) => setItemName(e.target.value)}
                    required
                />

            </div>

            <div className='form-label'>
                <label>
                    Category:</label>
                <input
                    type="text"
                    value={itemCategory}
                    onChange={(e) => setItemCategory(e.target.value)}
                    required
                />

            </div>

            <div className='form-label'>
                <label>
                    Image Link: </label>
                <input
                    type="text"
                    value={itemImage}
                    onChange={(e) => setItemImage(e.target.value)}
                    required
                />

            </div>

            <div className='form-label'>
                <label>
                    Description:
                </label>
                <textarea
                    type="text"
                    name="description"
                    value={itemDescription}
                    onChange={(e) => setItemDescription(e.target.value)}
                    required
                />
            </div>

            <div className='form-label'>
                <label>
                    Price: </label>
                <input
                    type="number"
                    step="0.01"
                    value={itemPrice}
                    onChange={(e) => setItemPrice(e.target.value)}
                    required
                />

            </div>
            <div className='form-btns'>
                <button type="submit">{itemToEdit ? "Edit item" : "Add item"}</button>
                <button onClick={handleBack} type="button">Back to List</button>
            </div>

        </form>

    );
};

export default addItemForm;