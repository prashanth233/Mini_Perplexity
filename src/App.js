import React, { useState } from 'react';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [answer, setAnswer] = useState('');
  const [sources, setSources] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const cache = new Map();

  const handleSearch = async () => {
    try {
      // Check if query is empty
      if (!query) {
        throw new Error("Query cannot be empty.");
      }

      // Check for cached results
      if (cache.has(query)) {
        const cachedResult = cache.get(query);
        setAnswer(cachedResult.answer);
        setSources(cachedResult.sources);
        return;
      }

      // Set loading state and reset error message
      setLoading(true);
      setErrorMessage('');

      // Fetch Google search results
      const results = await fetchGoogleSearch(query);
      if (results.length === 0) {
        throw new Error("No results found. Please try a different query.");
      }

      // Generate answer using Hugging Face
      const generatedAnswer = await fetchHuggingFaceAnswer(results);
      if (!generatedAnswer) {
        throw new Error("Sorry, I couldn't generate an answer.");
      }

      // Update state with answer and sources
      setAnswer(generatedAnswer.answer);
      setSources(generatedAnswer.sources);

      // Cache the results
      cache.set(query, generatedAnswer);
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
      setAnswer('');
      setSources([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch Google search results from the API
  const fetchGoogleSearch = async (query) => {
    const response = await fetch(`https://www.googleapis.com/customsearch/v1?key=${process.env.REACT_APP_GOOGLE_API_KEY}&cx=${process.env.REACT_APP_SEARCH_ENGINE_ID}&q=${encodeURIComponent(query)}`);
    const data = await response.json();
    return data.items || [];
  };

  // Generate an answer using Hugging Face API
  const fetchHuggingFaceAnswer = async (results) => {
    const hfApiKey = process.env.REACT_APP_HUGGINGFACE_API_KEY;

    // Combine snippets from search results into a single input
    let textInputs = results.map(result => result.snippet).join(' ');
    if (textInputs.length > 1000) {
      textInputs = textInputs.substring(0, 1000);
    }

    const response = await fetch('https://api-inference.huggingface.co/models/facebook/bart-large-cnn', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${hfApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ inputs: textInputs })
    });

    // Handle response and return answer with sources
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error fetching from Hugging Face:', response.statusText, errorText);
      return null;
    }

    const result = await response.json();
    return {
      answer: result[0]?.summary_text || "No summary generated",
      sources: results.map(result => result.link) 
    };
  };

  return (
    <div className="App">
      <h1 className="title">Mini Perplexity System</h1>
      <div className="search-container">
        <input 
          type="text" 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
          placeholder="Type your question here..." 
          className="query-input"
        />
        <button onClick={handleSearch} className="search-button">Search</button>
      </div>
      {loading && <div className="loading">Loading...</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <div className="result-container">
        <h2 className="result-title">Answer:</h2>
        {loading ? (
          <div className="skeleton-loader"></div>
        ) : (
          <div className="answer">{answer}</div>
        )}
        <h3 className="sources-title">Sources:</h3>
        <ul className="sources-list">
          {sources.length > 0 ? (
            sources.map((source, index) => (
              <li key={index} className="source-item">
                <a href={source} target="_blank" rel="noopener noreferrer">{source}</a>
              </li>
            ))
          ) : (
            <li></li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;
