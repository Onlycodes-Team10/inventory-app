import React, { useState } from 'react';
import { Item } from './Item'; 

export const ItemList = ({items, setSelectedItem, setItems}) => {

	return (
		<div>
			{
				items.map((item, idx) => (
					<Item Item={item} key={idx} setSelectedItem={setSelectedItem} items={items} setItems={setItems}/>
				))
			}
		</div>
	);
};
