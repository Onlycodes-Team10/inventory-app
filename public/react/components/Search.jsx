import React, { useState } from 'react';
import { Item } from './Item';

const SearchComponent = ({ setSelectedItem }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('all');
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/search?query=${encodeURIComponent(searchTerm)}&category=${encodeURIComponent(category)}`);
            const text = await response.text();
            console.log('Raw response:', text); // Log the raw response text

            if (response.headers.get('content-type')?.includes('application/json')) {
                const data = JSON.parse(text);
                setResults(data);
            } else {
                console.error('Expected JSON, got something else');
            }
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    return (
        <div>
            <h1>Search</h1>
            <div>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search..."
                />
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="all">All</option>
                    <option value="name">Name</option>
                    <option value="category">Category</option>
                    <option value="description">Description</option>
                    <option value="price">Price</option>
                </select>
                <button onClick={handleSearch}>Search</button>
            </div>
            <div>
                <h2>Results</h2>
                <ul>
                    {results.map((result) => (
                        <li key={result.id}>
                            <Item Item={result} onItemClick={setSelectedItem} />
                        </li>
                    ))}

                </ul>
            </div>
        </div>
    );
};

export default SearchComponent;
