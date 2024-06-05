import React, { useState, useEffect } from 'react';
import { ItemList } from './ItemList';
import { Item } from './Item';
import SearchComponent from './Search';

// import and prepend the api url to any fetch calls
import apiURL from '../api';
import Form from './Form';

export const App = () => {
    const [items, setItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [addItemFormOpen, setAddItemFormOpen] = useState(false);
    const [showSearchPage, setShowSearchPage] = useState(false);

    const handleBack = () => {
        setSelectedItem(null);
    };

    async function fetchItems() {
        try {
            const response = await fetch(`${apiURL}/items`);
            const itemsData = await response.json();
            setItems(itemsData);
        } catch (err) {
            console.log('Oh no an error! ', err);
        }
    }

    useEffect(() => {
        fetchItems();
    }, []);

    const handleSetSelectedItem = (item) => {
        setSelectedItem(item);
        setShowSearchPage(false);
    };

    return (
        <main>
            <h1 className="title">My Amazing Inventory App</h1>
            <button onClick={() => {
                if (addItemFormOpen){
                    setAddItemFormOpen(false)
                    setShowSearchPage(false)
                } else {
                    setShowSearchPage(!showSearchPage)
                }
                } }>
                {showSearchPage || addItemFormOpen ? 'Back to Main Page' : 'Go to Search Page'}
            </button>

            {addItemFormOpen ? (
                <Form
                    setAddItemFormOpen={setAddItemFormOpen}
                    itemToEdit={selectedItem}
                    setSelectedItem={setSelectedItem}
                    setItems={setItems}
                    items={items}
                />
            ) : showSearchPage ? (
                <SearchComponent setSelectedItem={handleSetSelectedItem} />
            ) : selectedItem ? (
                <div className="one-item">
                    <Item
                        Item={selectedItem}
                        setItems={setItems}
                        setSelectedItem={setSelectedItem}
                        setItemEditFormOpen={setAddItemFormOpen}
                        selectedItem={selectedItem}
                        items={items}
                    />
                    <button onClick={handleBack}>Back to List</button>
                </div>
            ) : (
                <div className="main-container">
                    <button onClick={() => setAddItemFormOpen(true)}>Add your item</button>
                    <ItemList
                        items={items}
                        setItems={setItems}
                        setSelectedItem={setSelectedItem}
                        setItemEditFormOpen={setAddItemFormOpen}
                        selectedItem={selectedItem}
                    />
                </div>
            )}
        </main>
    );
};

export default App;
