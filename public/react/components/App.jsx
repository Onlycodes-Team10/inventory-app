import React, {useState, useEffect} from 'react';
import {ItemList} from './ItemList';
import {Item} from './Item';

// import and prepend the api url to any fetch calls
import apiURL from '../api';
import Form from "./Form";

export const App = () => {

    const [items, setItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [addItemFormOpen, setAddItemFormOpen] = useState(false);
	// const [itemToEdit, setItemToEdit] = useState(undefined);

    const handleBack = () => {
        setSelectedItem(null);
    };

    async function fetchItems() {
        try {
            const response = await fetch(`${apiURL}/items`);
            const itemsData = await response.json();

            setItems(itemsData);
            //console.log(items)
        } catch (err) {
            console.log("Oh no an error! ", err)
        }
    }

    useEffect(() => {
        fetchItems();
    }, []);

    // useEffect(() => {
    //     fetchItems();
    // }, [addItemFormOpen]);

    return (
        <main>
            <h1>My Amazing Inventory App</h1>
            {
                addItemFormOpen ? <Form setAddItemFormOpen={setAddItemFormOpen} itemToEdit={selectedItem}/>

                    : selectedItem && !addItemFormOpen ?
                        <div className='one-item'>
                            <Item Item={selectedItem} setSelectedItem={setSelectedItem} setItemEditFormOpen={setAddItemFormOpen} selectedItem={selectedItem}/>
                            <button onClick={handleBack}>Back to List</button>
                        </div>

                        :

                        <div className='items-list'>
                            <h2>Items:</h2>
                            <ItemList items={items} setSelectedItem={setSelectedItem} setItemEditFormOpen={setAddItemFormOpen} selectedItem={selectedItem}/>
                            <div>
                                <button onClick={() => setAddItemFormOpen(true)}>Add item</button>
                            </div>
                        </div>
            }

        </main>
    )}
