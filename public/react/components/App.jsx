import React, { useState, useEffect } from 'react';
import { ItemList } from './ItemList';
import { Item } from './Item';

// import and prepend the api url to any fetch calls
import apiURL from '../api';

export const App = () => {

	const [items, setItems] = useState([]); 
	const [selectedItem, setSelectedItem] = useState(null);

	const handleBack = () => {
		setSelectedItem(null);
	};
	
	async function fetchItems(){
		try {
			const response = await fetch(`${apiURL}/items`);
			const itemsData = await response.json();
			
			setItems(itemsData);
			console.log(items)
		} catch (err) {
			console.log("Oh no an error! ", err)
		}
	}

	useEffect(() => {
		fetchItems();
	}, []);
	

	return (
		<main>	
      		<h1>My Amazing Inventory App</h1>
			{selectedItem ?
				<div className='one-item'>
					<Item Item={selectedItem} setSelectedItem={setSelectedItem} items={items} setItems={setItems} />
					<button onClick={handleBack}>Back to List</button>	
				</div>
			:
			<div className='items-list'>	
				<h2>Items:</h2>
				<ItemList items={items} setSelectedItem={setSelectedItem} setItems={setItems}/>
				<div>
					{/* TODO: place add component here */}
					<button onClick={() => console.log("Add item button clicked")}>Add item</button>
				</div>			
			</div>
			}

		</main>
	)
}