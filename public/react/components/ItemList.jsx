import React from 'react';
import { Item } from './Item'; 

export const ItemList = ({Items}) => {
	return <>
		{
			Items.map((item, idx) => {
				return <Item Item={item} key={idx} />
			})
		}
	</>
} 
