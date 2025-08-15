import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyEmail } from '../../api/authService';
import VerificationStatus from "./VerificationStatus";

const testCode = (code: string) : boolean => /^\d{0,6}$/.test(code);

interface FormData {
  email: string;
  code: string;
}

const VerifyEmail: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    email: location.state?.email || localStorage.getItem("pendingEmail"),
    code: ''
  });
  const [showVerification, setShowVerfication] = useState<Boolean>(false);
  const [seconds, setSeconds] = useState(5);
  const [error, setError] = useState("");
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    testCode(e.target.value) ? setFormData(prev => ({...prev, code: e.target.value})) :  setError("Code must be 6 digits.");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.code) {
      setError("Code is required.");
      return;
    }
    if (formData.code.length !== 6) {
      setError("Code must be 6 digits.");
      return;
    }

    if (!testCode(formData.code)) {
      setError("Code must be 6 digits.");
      return
    }
    setError("");
    try {
      const res = await verifyEmail(formData);
      console.log(res);
      if (res.status === 200) {
        setShowVerfication(true);
        localStorage.removeItem("pendingEmail");
      }  
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    }
  };

  useEffect(() => {
    if (!showVerification) return; 

    if (seconds > 0) {
      const timer = setTimeout(() => setSeconds(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      navigate("/login");
    }
  }, [seconds, showVerification, navigate]);

  return(
    <>
    {!showVerification ? (
    
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {/* Header */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Please verify your email
        </h2>

        {/* Paragraphs */}
        <p className="text-center text-gray-600 mb-1">
          You are almost there! We sent an email to:
        </p>
        <p className="text-center font-medium text-gray-800 mb-4">
          {formData.email}
        </p>
        <p className="text-center text-gray-600 mb-6">
          Check the code and enter into the input box below, then hit submit
          to verify your email.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="code"
            placeholder="Enter 6-digit code"
            value={formData.code}
            onChange={handleChange}
            maxLength={6}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Verify Email
          </button>
        </form>
      </div>
    </div>
    ) : (
     <VerificationStatus
            title="Email Verification"
            message={`Your Email has been verified successfully. Redirecting to login in `} seconds={seconds}
          />
          )}
  </>
  );
}

export default VerifyEmail;