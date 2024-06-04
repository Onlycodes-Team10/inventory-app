import React, { useState } from 'react';
import { Item } from './Item'; 

export const ItemList = ({items, setSelectedItem, setItemEditFormOpen}) => {

	return (
		<div>
			{
				items.map((item, idx) => (
					<Item Item={item} key={idx} setSelectedItem={setSelectedItem} setItemEditFormOpen={setItemEditFormOpen} />
				))
			}
		</div>
	);
};
