import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Register from './components/Auth/Register';
import VerifyEmail from './components/Auth/VerifyEmail';
import Login from './components/Auth/Login';
import Dashboard from "./components/Dashboard";
import Landing from "./components/Landing";
function App() {

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const fetchUser = async () => {
      try {
        const res = await getCurrentUser(); // GET /auth/me
        if (res.status === 200) {
          setUser(res.data.user);
        } else {
          setUser(null);
        }
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/" element={user ? <Navigate to="/dashboard" /> : <Navigate to="/landing" />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={user ? <Dashboard user={user} /> : <Navigate to="/landing" />} />
        <Route path="/landing" element={<Landing />} />
        {/* You can add more routes here later */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;