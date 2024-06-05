import React, { useState } from 'react';
import { Item } from './Item';

const SearchComponent = ({ setSelectedItem }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('all');
    const [results, setResults] = useState([]);
    const [noResults, setNoResults] = useState(false);

    const handleSearch = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/search?query=${encodeURIComponent(searchTerm)}&category=${encodeURIComponent(category)}`);
            const text = await response.text();
            console.log('Raw response:', text); // Log the raw response text

            if (response.headers.get('content-type')?.includes('application/json')) {
                const data = JSON.parse(text);
                setResults(Array.isArray(data) ? data : []);
                setNoResults(data.length === 0);
            } else {
                console.error('Expected JSON, got something else');
                setNoResults(true);
            }
        } catch (error) {
            console.error('Error fetching search results:', error);
            setNoResults(true);
        }
    };

    return (
        <div>
            <h1 className='search-title'>Search</h1>
            <div className='search-form'>
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
                {noResults ? (
                    <h1 className='search-title'>No results found, please try again.</h1>
                ) : (
                    <div className='items-list results-list'>
                    {results.map((result) => (
                        <div key={result.id}>
                            <Item Item={result} onItemClick={setSelectedItem} />
                        </div>
                    ))}

                </div>
                )}

            </div>
        </div>
    );
};

export default SearchComponent;
