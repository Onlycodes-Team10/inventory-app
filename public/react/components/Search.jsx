import React, { useState } from 'react';

const SearchComponent = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('all');
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await fetch('/api/search?query=${searchTerm}&category=${category}');
            const text = await response.text();
            console.log('raw response: ', text); //more debugging
            if (!response.ok) {
                throw new Error('Network response not ok');
            }
            const data = await response.json();
            setResults(data);
        } catch (error) {
            console.error('a wild error appeared! ', error);
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
                        <li key={result.id}>(result.name)</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SearchComponent;