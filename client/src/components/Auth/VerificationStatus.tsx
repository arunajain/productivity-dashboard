import React from "react";

interface VerificationStatusProps {
  title: string;
  message: string;
  seconds?: number;
}
const VerificationStatus: React.FC<VerificationStatusProps> = ({ title, message, seconds=0 }) => {
      return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
        <h1 className="text-2xl font-bold text-green-600 mb-4">{title}</h1>
        <p className="text-gray-600">{message} <strong> {seconds} </strong> seconds..</p>
      </div>
    </div>
    );
};

export default VerificationStatus;