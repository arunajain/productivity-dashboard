import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './components/Auth/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        {/* You can add more routes here later */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;