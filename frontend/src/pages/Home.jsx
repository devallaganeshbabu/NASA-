import { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
  const [apod, setApod] = useState(null);

  useEffect(() => {
   axios.get(`${process.env.REACT_APP_API_URL}/api/apod`).then(res => setApod(res.data));

  }, []);

  if (!apod) return <p>Loading...</p>;

  return (
    <div>
      <h1>{apod.title}</h1>
      <img src={apod.url} alt={apod.title} style={{ width: '100%' }} />
      <p>{apod.explanation}</p>
    </div>
  );
}

export default Home;
