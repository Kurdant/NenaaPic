import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../utils/auth';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password) {
      setError('Remplis les deux champs');
      return;
    }

    setLoading(true);
    setError('');

    const result = await login(username.trim(), password);

    if (result.success) {
      navigate('/admin');
    } else {
      setError(result.error || 'Connexion échouée');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0F1419] flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        {/* Logo / Title */}
        <div className="text-center mb-10">
          <h1 className="font-heading text-3xl text-white uppercase tracking-wider">
            NenaaPic
          </h1>
          <p className="font-body text-white/40 text-sm mt-2 tracking-wider">
            ESPACE ADMINISTRATION
          </p>
        </div>

        {/* Login form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-300 text-sm font-body">
              {error}
            </div>
          )}

          <div>
            <label className="text-white/50 text-xs uppercase tracking-wider block mb-2 font-body">
              Identifiant
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              autoFocus
              className="w-full p-3 bg-white/5 text-white border border-white/15 font-body text-sm placeholder-white/20 focus:outline-none focus:border-white/40 transition-colors"
              placeholder="admin"
            />
          </div>

          <div>
            <label className="text-white/50 text-xs uppercase tracking-wider block mb-2 font-body">
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              className="w-full p-3 bg-white/5 text-white border border-white/15 font-body text-sm placeholder-white/20 focus:outline-none focus:border-white/40 transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-white text-[#0F1419] font-body text-sm uppercase tracking-wider font-semibold hover:bg-white/90 transition-colors disabled:opacity-50 mt-2"
          >
            {loading ? 'CONNEXION...' : 'SE CONNECTER'}
          </button>
        </form>

        <p className="text-center text-white/20 text-xs font-body mt-8">
          Accès réservé à l'administrateur
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
