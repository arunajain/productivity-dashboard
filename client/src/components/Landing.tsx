import React from "react";
import { Link } from "react-router-dom";

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Productivity Dashboard</h1>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        Organize your tasks, track your time, and stay focused — all in one place.
      </p>
      <div className="flex gap-4">
        <Link to="/login" className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">
          Login
        </Link>
        <Link to="/register" className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300">
          Register
        </Link>
      </div>
    </div>
  );
};

export default Landing;