import React, { useState, useEffect } from 'react';

const AdminUpload = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState([]);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL || 'http://nenaa-pic.kurdant.fr:5000';

  // Authenticate with password
  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'nenaapic1234') {
      setAuthenticated(true);
      setPassword('');
      loadImages();
    } else {
      setError('Mot de passe incorrect');
      setTimeout(() => setError(null), 3000);
    }
  };

  // Load images
  const loadImages = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/images`, {
        headers: { 'x-api-password': 'nenaapic1234' }
      });
      const data = await response.json();
      if (data.success) {
        setImages(data.images || []);
      }
    } catch (err) {
      console.error('Error loading images:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle file upload
  const handleFileUpload = async (e) => {
    e.preventDefault();
    const fileInput = e.target.querySelector('input[type="file"]');
    const file = fileInput.files[0];

    if (!file) {
      setError('Veuillez sélectionner une image');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);
    formData.append('password', 'nenaapic1234');

    try {
      setUploading(true);
      setError(null);
      setUploadedImage(null);

      const response = await fetch(`${API_URL}/api/upload`, {
        method: 'POST',
        headers: { 'x-api-password': 'nenaapic1234' },
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setUploadedImage(data);
        fileInput.value = '';
        loadImages();
      } else {
        setError(data.error || 'Erreur lors de l\'upload');
      }
    } catch (err) {
      setError(`Erreur: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  // Delete image
  const handleDeleteImage = async (filename) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette image ?')) return;

    try {
      const response = await fetch(`${API_URL}/api/images/${filename}`, {
        method: 'DELETE',
        headers: { 'x-api-password': 'nenaapic1234' }
      });

      const data = await response.json();
      if (data.success) {
        loadImages();
      } else {
        setError(data.error || 'Erreur lors de la suppression');
      }
    } catch (err) {
      setError(`Erreur: ${err.message}`);
    }
  };

  if (!authenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-center text-pink-600 mb-8">
            Admin - NenaaPic
          </h1>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mot de passe
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Entrez le mot de passe"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>

            {error && (
              <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2 bg-pink-600 text-white font-semibold rounded-lg hover:bg-pink-700 transition"
            >
              Se connecter
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-pink-600">📸 Gestion des photos</h1>
          <button
            onClick={() => setAuthenticated(false)}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Déconnexion
          </button>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Uploader une photo</h2>

          <form onSubmit={handleFileUpload} className="space-y-4">
            <div className="border-2 border-dashed border-pink-300 rounded-lg p-6 text-center hover:border-pink-500 transition cursor-pointer">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="fileInput"
              />
              <label htmlFor="fileInput" className="block cursor-pointer">
                <div className="text-5xl mb-2">📁</div>
                <p className="text-gray-600">
                  Glissez une photo ou cliquez pour parcourir
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  JPEG, PNG, WebP, GIF - Max 50MB
                </p>
              </label>
            </div>

            {error && (
              <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}

            {uploadedImage && (
              <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                <p className="font-semibold mb-2">✅ Upload réussi !</p>
                <p className="text-sm mb-2">
                  <strong>URL:</strong> <code className="bg-white px-2 py-1 rounded">{uploadedImage.url}</code>
                </p>
                <p className="text-sm">
                  <strong>Fichier:</strong> <code className="bg-white px-2 py-1 rounded">{uploadedImage.filename}</code>
                </p>
                <p className="text-sm">
                  <strong>Taille:</strong> {(uploadedImage.size / 1024).toFixed(2)} KB
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={uploading}
              className="w-full py-3 bg-pink-600 text-white font-semibold rounded-lg hover:bg-pink-700 transition disabled:opacity-50"
            >
              {uploading ? '⏳ Upload en cours...' : '🚀 Uploader la photo'}
            </button>
          </form>
        </div>

        {/* Gallery Section */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Mes photos ({images.length})
          </h2>

          {loading ? (
            <p className="text-center text-gray-600">Chargement...</p>
          ) : images.length === 0 ? (
            <p className="text-center text-gray-600">Aucune photo uploadée pour l'instant</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {images.map((image) => (
                <div key={image.filename} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition">
                  <img
                    src={`${API_URL}${image.url}`}
                    alt={image.filename}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <p className="text-sm text-gray-600 font-mono break-all mb-2">
                      {image.filename}
                    </p>
                    <p className="text-xs text-gray-400 mb-3">
                      {new Date(image.uploadedAt).toLocaleDateString('fr-FR')}
                    </p>
                    <button
                      onClick={() => handleDeleteImage(image.filename)}
                      className="w-full py-2 bg-red-500 text-white rounded hover:bg-red-600 transition text-sm"
                    >
                      🗑️ Supprimer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminUpload;
