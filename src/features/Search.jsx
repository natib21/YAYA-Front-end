import React, { useState, useEffect } from 'react';

const Search = ({ onSearchResults }) => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    
    if (query.length > 0) {
      setIsLoading(true);
      setError(null);

      const fetchData = async () => {
        try {
          const response = await fetch(`http://localhost:3333/transactions/search`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query: query }),
          });

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const data = await response.json();
          onSearchResults(data);
            console.log(data);
        } catch (err) {
          setError(err.message);
        } finally {
          
          setIsLoading(false);
        }
      };

     
      fetchData();
    } else {
      
      onSearchResults([]);
    }

  }, [query, onSearchResults]); 

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };
  
  return (
    <div className="flex flex-col items-center p-4">
      <input
        className="w-full max-w-lg h-10 border border-gray-300 text-sm rounded-full py-3 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
        type="text"
        placeholder="Search by name, id, sender"
        value={query}
        onChange={handleInputChange}
      />
      {isLoading && (
        <div className="mt-2 text-gray-500">
          Loading...
        </div>
      )}
      {error && (
        <div className="mt-2 text-red-500">
          Error: {error}
        </div>
      )}
    </div>
  );
};

export default Search;
