import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Register from './components/Auth/Register';
import VerifyEmail from './components/Auth/VerifyEmail';
import Login from './components/Auth/Login';
import Dashboard from "./components/Dashboard";
import Landing from "./components/Landing";
function App() {
  function Home(){
    const token = localStorage.getItem("token");
    return token ? <Dashboard /> : <Landing />;
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"  element={Home()} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/login" element={<Login />} />
        {/* You can add more routes here later */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;