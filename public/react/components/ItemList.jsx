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
					<div key ={item.id} className='item'>
					<p className="name" onClick={() => handleItemClick(item)}>{item.name}</p>
					<h4 className="category">{item.category}</h4>
					<img src={item.image} />
					<p className='description'>{item.description}</p>
					<p className='price'>Price: ${item.price}</p>
					</div>
				))
			)}
		</div>
	);
};
