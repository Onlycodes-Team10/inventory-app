import React from 'react';
import { Sauce } from './Item';

export const SaucesList = ({sauces}) => {
	return <>
		{
			sauces.map((sauce, idx) => {
				return <Sauce sauce={sauce} key={idx} />
			})
		}
	</>
} 
