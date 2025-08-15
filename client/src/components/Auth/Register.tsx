import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { ChangeEvent } from "react";
import type { FormEvent } from "react";
import logo from "../../assets/productivity_logo.jpeg"; // adjust path
import { registerUser } from '../../api/authService';


interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const matchPasswords = (password: string, confirmPassword:string) => password === confirmPassword 

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState<string>("");
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // Simple validation
    if (!formData.name || !formData.email || !formData.password) {
      setError("All fields are required.");
      return;
    }

    if(!matchPasswords(formData.password, formData.confirmPassword)){
      setError("Passwords do not match");
      return
    }
    
    try {
      setError(""); 
      const {confirmPassword, ...payload} = formData;
      const res = await registerUser(payload);
      console.log(res);
      if (res.status === 201) {
        localStorage.setItem("pendingEmail", formData.email);
        navigate("/verify-email", { state: { email: formData.email } });
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        
        {/* Logo & Title */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <img src={logo} alt="Logo" className="w-12 h-12" />
          <h1 className="text-2xl font-bold text-gray-800">
            Productivity Dashboard
          </h1>
        </div>

        <h2 className="text-xl font-semibold mb-4 text-center text-gray-700">
          Register
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

           <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;