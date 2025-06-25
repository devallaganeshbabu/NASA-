import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Mars from './pages/MarsRovers';
import ImageSearch from './pages/ImageSearch';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/mars" element={<Mars />} />
      <Route path="/images" element={<ImageSearch />} />
    </Routes>
  );
}

export default App;
