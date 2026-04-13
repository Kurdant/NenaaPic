import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated, verifyToken } from '../utils/auth';

const ProtectedRoute = ({ children }) => {
  const [checking, setChecking] = useState(true);
  const [valid, setValid] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      setChecking(false);
      return;
    }

    verifyToken().then((ok) => {
      setValid(ok);
      setChecking(false);
    });
  }, []);

  if (checking) {
    return (
      <div className="min-h-screen bg-[#0F1419] flex items-center justify-center">
        <p className="text-white/40 font-body text-sm">Vérification...</p>
      </div>
    );
  }

  if (!valid) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
