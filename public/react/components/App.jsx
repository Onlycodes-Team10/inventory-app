import React, { useState, useEffect } from 'react';
import { ItemList } from './ItemList';

// import and prepend the api url to any fetch calls
import apiURL from '../api';

export const App = () => {

	const [items, setItems] = useState([]); 
	
	
	
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
			<h2>Items:</h2>
			<ItemList items={items} />
			<div>
				{/* TODO: place add component here */}
				<button onClick={() => console.log("Add item button clicked")} />
			</div>
		</main>
	)
}