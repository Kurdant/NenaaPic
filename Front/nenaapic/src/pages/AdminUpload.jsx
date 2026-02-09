import React, { useState, useEffect } from 'react';

const AdminUpload = () => {
  const [selectedCategory, setSelectedCategory] = useState('portfolio/mariages');
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [uploadedImages, setUploadedImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' ou 'error'

  const API_URL = process.env.REACT_APP_API_URL || 'http://api.nenaa-pic.kurdant.fr';

  // Catégories disponibles
  const categories = [
    { id: 'portfolio/mariages', label: 'Portfolio - Mariages' },
    { id: 'portfolio/portraits', label: 'Portfolio - Portraits' },
    { id: 'portfolio/couples', label: 'Portfolio - Couples' },
    { id: 'portfolio/entreprise', label: 'Portfolio - Entreprise' },
    { id: 'services', label: 'Services' },
    { id: 'header', label: 'Header' },
    { id: 'footer', label: 'Footer' },
  ];

  // Charger les images existantes
  useEffect(() => {
    fetchUploadedImages();
  }, [selectedCategory]);

  const fetchUploadedImages = async () => {
    try {
      const response = await fetch(`${API_URL}/api/uploads/${selectedCategory}`, {
        headers: {
          'x-api-password': 'nenaapic1234',
        }
      });
      if (response.ok) {
        const images = await response.json();
        setUploadedImages(images);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des images:', error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFileName(file.name.split('.')[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage('Sélectionne une image d\'abord!');
      setMessageType('error');
      return;
    }

    if (!fileName.trim()) {
      setMessage('Entre un nom de fichier!');
      setMessageType('error');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('category', selectedCategory);
    formData.append('filename', fileName);

    try {
      const response = await fetch(`${API_URL}/api/upload`, {
        method: 'POST',
        headers: {
          'x-api-password': 'nenaapic1234',
        },
        body: formData,
      });

      if (response.ok) {
        setMessage('✅ Image uploadée avec succès!');
        setMessageType('success');
        setSelectedFile(null);
        setFileName('');
        document.querySelector('input[type="file"]').value = '';
        setTimeout(fetchUploadedImages, 500);
      } else {
        const error = await response.json();
        setMessage(`❌ Erreur: ${error.message}`);
        setMessageType('error');
      }
    } catch (error) {
      setMessage(`❌ Erreur: ${error.message}`);
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (imageName) => {
    if (!window.confirm(`Supprimer ${imageName}?`)) return;

    try {
      const response = await fetch(`${API_URL}/api/delete`, {
        method: 'DELETE',
        headers: { 
          'Content-Type': 'application/json',
          'x-api-password': 'nenaapic1234',
        },
        body: JSON.stringify({
          category: selectedCategory,
          filename: imageName,
        }),
      });

      if (response.ok) {
        setMessage(`✅ ${imageName} supprimée!`);
        setMessageType('success');
        setTimeout(fetchUploadedImages, 500);
      } else {
        setMessage('❌ Erreur lors de la suppression');
        setMessageType('error');
      }
    } catch (error) {
      setMessage(`❌ Erreur: ${error.message}`);
      setMessageType('error');
    }
  };

  return (
    <div
      className="min-h-screen"
      style={{
        background: 'linear-gradient(135deg, rgb(42, 45, 58) 0%, rgb(61, 65, 88) 50%, rgb(47, 50, 65) 100%)', paddingTop: '10%',
      }}
    >
      <div className="max-w-6xl mx-auto p-8">
        <h1
          className="text-4xl font-bold text-white mb-2"
          style={{ textShadow: 'rgba(0, 0, 0, 0.3) 0px 2px 10px' }}
        >
          Admin - Gestion des Images
        </h1>
        <p
          className="text-white/70 mb-8"
          style={{ textShadow: 'rgba(0, 0, 0, 0.2) 0px 1px 4px' }}
        >
          Upload, organise et gère toutes les images du site
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulaire d'upload */}
          <div
            className="lg:col-span-1 p-6 rounded-2xl"
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
            }}
          >
            <h2 className="text-2xl font-bold text-white mb-4">Upload Image</h2>

            {/* Sélecteur de catégorie */}
            <div className="mb-6">
              <label className="text-white/80 font-light text-sm mb-2 block">
                Catégorie:
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-3 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:border-white/40"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id} className="bg-gray-800">
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Input fichier */}
            <div className="mb-6">
              <label className="text-white/80 font-light text-sm mb-2 block">
                Sélectionne une image:
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full p-3 rounded-lg bg-white/10 text-white border border-white/20 file:bg-white/20 file:border-0 file:rounded file:px-3 file:py-1 file:text-white cursor-pointer"
              />
            </div>

            {/* Nom du fichier */}
            <div className="mb-6">
              <label className="text-white/80 font-light text-sm mb-2 block">
                Nom du fichier:
              </label>
              <input
                type="text"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                placeholder="ex: mariage-sarah-thomas"
                className="w-full p-3 rounded-lg bg-white/10 text-white border border-white/20 placeholder-white/30 focus:outline-none focus:border-white/40"
              />
            </div>

            {/* Message */}
            {message && (
              <div
                className={`mb-6 p-4 rounded-lg text-sm font-light ${
                  messageType === 'success'
                    ? 'bg-green-500/20 text-green-100 border border-green-500/30'
                    : 'bg-red-500/20 text-red-100 border border-red-500/30'
                }`}
              >
                {message}
              </div>
            )}

            {/* Bouton upload */}
            <button
              onClick={handleUpload}
              disabled={loading}
              className="w-full py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 disabled:opacity-50"
              style={{
                background: loading ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.2)',
                color: '#fff',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                textShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 4px',
              }}
            >
              {loading ? 'Upload en cours...' : 'UPLOAD'}
            </button>
          </div>

          {/* Galerie des images existantes */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-4">
              Images - {categories.find((c) => c.id === selectedCategory)?.label}
            </h2>

            {uploadedImages.length === 0 ? (
              <p
                className="text-white/60 text-center py-8"
                style={{ textShadow: 'rgba(0, 0, 0, 0.2) 0px 1px 4px' }}
              >
                Aucune image dans cette catégorie
              </p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {uploadedImages.map((image) => (
                  <div
                    key={image}
                    className="relative group overflow-hidden rounded-xl"
                    style={{
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      aspectRatio: '1',
                    }}
                  >
                    <img
                      src={`${API_URL}/api/uploads/${selectedCategory}/${image}`}
                      alt={image}
                      className="w-full h-full object-cover"
                    />

                    {/* Overlay au hover */}
                    <div
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                      style={{
                        background: 'rgba(0, 0, 0, 0.7)',
                      }}
                    >
                      <button
                        onClick={() => handleDelete(image)}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors"
                      >
                        Supprimer
                      </button>
                    </div>

                    {/* Nom du fichier */}
                    <div
                      className="absolute bottom-0 left-0 right-0 p-2 text-white text-xs font-light"
                      style={{
                        background: 'rgba(0, 0, 0, 0.5)',
                        textShadow: 'rgba(0, 0, 0, 0.3) 0px 1px 2px',
                      }}
                    >
                      {image}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUpload;
