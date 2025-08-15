import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { loginUser } from '../../api/authService';

interface LoginData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  // const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginData>({ email: "", password: "" });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  // const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("Both fields are required.");
      return;
    }

    setError("");
    setMessage("");
    // setLoading(true);

    try {
      const res = await loginUser(formData);
      console.log(res);
      if (res.status === 200) {
        console.log('heree')
        localStorage.removeItem("pendingEmail");
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong");
      return
    } 
    finally {
      // setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Login
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Enter your email and password to log in to your account.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {message && <p className="text-green-500 text-sm">{message}</p>}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;