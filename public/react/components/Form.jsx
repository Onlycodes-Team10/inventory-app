import React, {useState, useEffect} from 'react';

const addItemForm = ({setAddItemFormOpen, itemToEdit, setSelectedItem, setItems, items}) => { // TODO pass in object prop of item
    
    const [itemName, setItemName] = useState(itemToEdit ? itemToEdit.name : '');
    const [itemCategory, setItemCategory] = useState(itemToEdit ? itemToEdit.category : '');
    const [itemImage, setItemImage] = useState(itemToEdit ? itemToEdit.image : '');
    const [itemDescription, setItemDescription] = useState(itemToEdit ? itemToEdit.description : '');
    const [itemPrice, setItemPrice] = useState(itemToEdit ? itemToEdit.price : '');
    const [itemPresent, setItemPresent] = useState(itemToEdit ? itemToEdit.present : false);

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
    },[itemToEdit])

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
            const response = await fetch(`http://localhost:3000/api/items/${itemToEdit.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedItem),
            });

            if (response.ok) {
                const result = await response.json();
                setSelectedItem(result)
                const itemPos = items.indexOf(items.find(item => item.id===result.id))
                setItems(items.toSpliced(itemPos,1,result))
                setAddItemFormOpen(false);
            } else {
                console.error('Failed to add item');
            }
          } catch (error) {
            console.error ('A wild error has appeared! ', error);
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
              const response = await fetch('http://localhost:3000/api/items', {
                  method: 'POST', // TODO
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(newItem),
              });

              if (response.ok) {
                  const result = await response.json();
                  console.log('Item added:', result);
              
                  setAddItemFormOpen(false);
              } else {
                  console.error('Failed to add item');
              }
          } catch (error) {
              console.error ('A wild error has appeared! ', error);
          }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Item Name:
              <input
                type="text"
                value={itemName} // TODO
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
          <button type="submit">{itemToEdit ? "Edit item" : "Add item"}</button>
          <button onClick={handleBack} type="button">Back to List</button>
        </form>
        
      );
};

export default addItemForm;