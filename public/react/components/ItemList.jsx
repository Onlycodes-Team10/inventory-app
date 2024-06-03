import React, { useState } from 'react';
import { Item } from './Item'; 

export const ItemList = ({items}) => {
	const [selectedItem, setSelectedItem] = useState(null);

	const handleItemClick = (item) => {
		setSelectedItem(item);
	};

	const handleBack = () => {
		setSelectedItem(null);
	};

	return (
		<div>
			{selectedItem ? (
				<div>
					<button onClick={handleBack}>Back to List</button>
					<Item Item={selectedItem} />
				</div>
			) : (
				items.map((item) => (
					<div key ={item.id}>
					<a class = "name" onClick={() => handleItemClick(item)}>{item.name}</a>
					<h4>{item.category}</h4>
					<img src={item.image} />
					<p>{item.description}</p>
					<p>Price: ${item.price}</p>
					</div>
				))
			)}
		</div>
	);
};
