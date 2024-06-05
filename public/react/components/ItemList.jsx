import React from 'react';
import { Item } from './Item'; 

export const ItemList = ({items, setSelectedItem, setItemEditFormOpen, selectedItem}) => {

	return (
		<div className='items-list'>
			{
				items.map((item, idx) => (
					<Item Item={item} key={idx} setSelectedItem={setSelectedItem} setItemEditFormOpen={setItemEditFormOpen} selectedItem={selectedItem}/>
				))
			}
		</div>
	);
};
