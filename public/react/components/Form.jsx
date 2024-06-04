import React, { useState } from 'react';

const addItemForm = ({setAddItemFormOpen}) => {
    const [itemName, setItemName] = useState('');
    const [itemCategory, setItemCategory] = useState('');
    const [itemImage, setItemImage] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [itemPrice, setItemPrice] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const newItem = {
            name: itemName,
            category: itemCategory,
            image: itemImage,
            description: itemDescription,
            price: parseFloat(itemPrice),
        };

        try {
            const response = await fetch('http://localhost:3000/api/items', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newItem),
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Item added:', result);

                setItemName('');
                setItemCategory('');
                setItemImage('');
                setItemDescription('');
                setItemPrice('');

                setAddItemFormOpen(false);
            } else {
                console.error('Failed to add item');
            }
        } catch (error) {
            console.error ('A wild error has appeared! ', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Item Name:
              <input
                type="text"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Category:
              <input
                type="text"
                value={itemCategory}
                onChange={(e) => setItemCategory(e.target.value)}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Image Link:
              <input
                type="text"
                value={itemImage}
                onChange={(e) => setItemImage(e.target.value)}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Description:
              <textarea
                value={itemDescription}
                onChange={(e) => setItemDescription(e.target.value)}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Price:
              <input
                type="number"
                step="0.01"
                value={itemPrice}
                onChange={(e) => setItemPrice(e.target.value)}
                required
              />
            </label>
          </div>
          <button type="submit">Add Item</button>
        </form>
      );
};

export default addItemForm;