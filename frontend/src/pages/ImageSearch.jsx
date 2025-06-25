import { useState } from 'react';
import axios from 'axios';

function ImageSearch() {
  const [query, setQuery] = useState('moon');
  const [results, setResults] = useState([]);

  const search = () => {
    axios.get(`http://localhost:5000/api/image?q=${query}`).then(res => {
      setResults(res.data.collection.items);
    });
  };

  return (
    <div>
      <h1>NASA Image Library</h1>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <button onClick={search}>Search</button>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {results.map((item, i) => (
          <div key={i}>
            <img src={item.links[0].href} alt="" width="200" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageSearch;
