// src/pages/RegisterPage.tsx
import React, { useState } from "react";
import RegisterForm from "../components/RegisterForm";

const RegisterPage: React.FC = () => {
  const [message, setMessage] = useState<string>("");

  const handleSuccess = (message: string) => {
    setMessage(message);
  };

  const handleError = (message: string) => {
    setMessage(message);
  };

  return (
    <div>
      <RegisterForm onSuccess={handleSuccess} onError={handleError} />
      {message && (
        <div className="mt-4 text-center text-red-500">{message}</div>
      )}
    </div>
  );
};

export default RegisterPage;
