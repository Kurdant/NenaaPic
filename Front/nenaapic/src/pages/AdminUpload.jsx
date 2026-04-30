import React, { useState, useEffect, useCallback } from 'react';
import { apiUrl } from '../utils/api';
import { authFetch, logout } from '../utils/auth';

const extractDriveId = (url) => {
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
};

const getDriveThumb = (fileId) =>
  `https://drive.google.com/thumbnail?id=${fileId}&sz=w800`;

const categories = [
  { id: 'mariages', label: 'Mariages', icon: '💍' },
  { id: 'portraits', label: 'Portraits', icon: '📸' },
  { id: 'couples', label: 'Couples', icon: '💕' },
  { id: 'entreprise', label: 'Entreprise', icon: '🏢' },
  { id: 'artistique', label: 'Artistique', icon: '🎨' },
  { id: 'grossesse', label: 'Grossesse', icon: '🤰' },
  { id: 'sport', label: 'Sport', icon: '' },
  { id: 'evenement', label: 'Événement', icon: '🎉' },
];

const AdminUpload = () => {
  const [gallery, setGallery] = useState([]);
  const [urlInput, setUrlInput] = useState('');
  const [titleInput, setTitleInput] = useState('');
  const [categoryInput, setCategoryInput] = useState('mariages');
  const [pendingImages, setPendingImages] = useState([]);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [loading, setLoading] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [filterCategory, setFilterCategory] = useState('all');

  const fetchGallery = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(apiUrl('/api/gallery'));
      const data = await res.json();
      if (data.success) setGallery(data.images);
    } catch (err) {
      console.error('Fetch gallery error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchGallery(); }, [fetchGallery]);

  const showMsg = (text, type = 'success') => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => setMessage(''), 4000);
  };

  const handleAddToPending = () => {
    if (!urlInput.trim()) return showMsg('Colle un lien Google Drive', 'error');
    const fileId = extractDriveId(urlInput);
    if (!fileId) return showMsg('Lien invalide — utilise un lien Google Drive /d/...', 'error');
    if (pendingImages.some(p => extractDriveId(p.url) === fileId) ||
        gallery.some(g => g.fileId === fileId)) {
      return showMsg('Image déjà ajoutée', 'error');
    }

    setPendingImages(prev => [...prev, {
      url: urlInput.trim(),
      title: titleInput.trim(),
      category: categoryInput,
      fileId,
      thumbnail: getDriveThumb(fileId),
    }]);
    setUrlInput('');
    setTitleInput('');
    showMsg(`✅ Image ajoutée à la file (${pendingImages.length + 1} en attente)`);
  };

  const handleRemovePending = (fileId) => {
    setPendingImages(prev => prev.filter(p => p.fileId !== fileId));
  };

  const handlePublish = async () => {
    if (pendingImages.length === 0) return showMsg('Rien à publier', 'error');
    setPublishing(true);
    try {
      const res = await authFetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          images: pendingImages.map(p => ({
            url: p.url,
            title: p.title,
            category: p.category,
          })),
        }),
      });
      const data = await res.json();
      if (res.status === 401) {
        showMsg('Session expirée — reconnexion requise', 'error');
        setTimeout(() => logout(), 1500);
        return;
      }
      if (data.success) {
        const addedCount = data.added.filter(a => a.status === 'added').length;
        showMsg(`✅ ${addedCount} image(s) publiée(s) !`);
        setPendingImages([]);
        fetchGallery();
      } else {
        showMsg(`❌ ${data.error}`, 'error');
      }
    } catch (err) {
      showMsg(`❌ ${err.message}`, 'error');
    } finally {
      setPublishing(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Supprimer "${title || 'cette image'}" ?`)) return;
    try {
      const res = await authFetch(`/api/gallery/${id}`, { method: 'DELETE' });
      if (res.status === 401) {
        showMsg('Session expirée — reconnexion requise', 'error');
        setTimeout(() => logout(), 1500);
        return;
      }
      if (res.ok) {
        showMsg('✅ Image supprimée');
        fetchGallery();
      }
    } catch (err) {
      showMsg(`❌ ${err.message}`, 'error');
    }
  };

  return (
    <div className="min-h-screen bg-[#0F1419]" style={{ paddingTop: '100px' }}>
      <div className="max-w-6xl mx-auto px-6 pb-20">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <h1 className="font-heading text-4xl md:text-5xl text-white uppercase">
            Galerie
          </h1>
          <button
            onClick={logout}
            className="px-4 py-2 border border-white/20 text-white/50 font-body text-xs uppercase tracking-wider hover:border-red-400 hover:text-red-400 transition-colors"
          >
            Déconnexion
          </button>
        </div>
        <p className="font-body text-white/50 mb-10 text-sm tracking-wider">
          Ajoute des images depuis Google Drive
        </p>

        {/* Message */}
        {message && (
          <div className={`mb-6 p-4 text-sm font-body border ${
            messageType === 'success'
              ? 'bg-green-500/10 text-green-300 border-green-500/30'
              : 'bg-red-500/10 text-red-300 border-red-500/30'
          }`}>
            {message}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Add form */}
          <div className="lg:col-span-1 space-y-6">
            <div className="border border-white/10 p-6 space-y-5">
              <h2 className="font-heading text-white text-lg uppercase tracking-wider">
                Ajouter une image
              </h2>

              {/* URL input */}
              <div>
                <label className="text-white/50 text-xs uppercase tracking-wider block mb-2 font-body">
                  Lien Google Drive
                </label>
                <input
                  type="text"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddToPending()}
                  placeholder="https://drive.google.com/file/d/..."
                  className="w-full p-3 bg-white/5 text-white border border-white/15 font-body text-sm placeholder-white/20 focus:outline-none focus:border-white/40 transition-colors"
                />
              </div>

              {/* Preview */}
              {urlInput && extractDriveId(urlInput) && (
                <div className="border border-white/10 p-2">
                  <img
                    src={getDriveThumb(extractDriveId(urlInput))}
                    alt="Preview"
                    className="w-full h-32 object-cover opacity-80"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                </div>
              )}

              {/* Title */}
              <div>
                <label className="text-white/50 text-xs uppercase tracking-wider block mb-2 font-body">
                  Titre (optionnel)
                </label>
                <input
                  type="text"
                  value={titleInput}
                  onChange={(e) => setTitleInput(e.target.value)}
                  placeholder="ex: Mariage Julie & Marc"
                  className="w-full p-3 bg-white/5 text-white border border-white/15 font-body text-sm placeholder-white/20 focus:outline-none focus:border-white/40 transition-colors"
                />
              </div>

              {/* Category — clickable buttons */}
              <div>
                <label className="text-white/50 text-xs uppercase tracking-wider block mb-3 font-body">
                  Catégorie
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setCategoryInput(cat.id)}
                      className={`py-2.5 px-3 text-xs font-body uppercase tracking-wider transition-all duration-200 border text-left ${
                        categoryInput === cat.id
                          ? 'bg-white text-[#0F1419] border-white font-semibold'
                          : 'bg-white/5 text-white/60 border-white/10 hover:border-white/30 hover:text-white/90'
                      }`}
                    >
                      <span className="mr-1.5">{cat.icon}</span> {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add button */}
              <button
                onClick={handleAddToPending}
                className="w-full py-3 border border-white/30 text-white font-body text-sm uppercase tracking-wider hover:bg-white/10 transition-colors"
              >
                + AJOUTER À LA FILE
              </button>
            </div>

            {/* Pending queue */}
            {pendingImages.length > 0 && (
              <div className="border border-primary-yellow/30 bg-primary-yellow/5 p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading text-white text-sm uppercase tracking-wider">
                    En attente ({pendingImages.length})
                  </h3>
                </div>

                {pendingImages.map((img) => (
                  <div key={img.fileId} className="flex items-center gap-3 border-b border-white/5 pb-3">
                    <img src={img.thumbnail} alt="" className="w-12 h-12 object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-xs truncate font-body">{img.title || 'Sans titre'}</p>
                      <p className="text-white/40 text-xs font-body">{img.category}</p>
                    </div>
                    <button
                      onClick={() => handleRemovePending(img.fileId)}
                      className="text-red-400 hover:text-red-300 text-xs"
                    >
                      ✕
                    </button>
                  </div>
                ))}

                <button
                  onClick={handlePublish}
                  disabled={publishing}
                  className="w-full py-3 bg-white text-[#0F1419] font-body text-sm uppercase tracking-wider font-semibold hover:bg-white/90 transition-colors disabled:opacity-50"
                >
                  {publishing ? 'PUBLICATION...' : `PUBLIER (${pendingImages.length})`}
                </button>
              </div>
            )}
          </div>

          {/* Right: Current gallery */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading text-white text-lg uppercase tracking-wider">
                Galerie ({gallery.length})
              </h2>
            </div>

            {/* Category filter bar */}
            <div className="flex flex-wrap gap-2 mb-6">
              <button
                onClick={() => setFilterCategory('all')}
                className={`px-4 py-1.5 text-xs font-body uppercase tracking-wider transition-all duration-200 border ${
                  filterCategory === 'all'
                    ? 'bg-white text-[#0F1419] border-white'
                    : 'text-white/50 border-white/10 hover:border-white/30 hover:text-white'
                }`}
              >
                Tous ({gallery.length})
              </button>
              {categories.map((cat) => {
                const count = gallery.filter(g => g.category === cat.id).length;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setFilterCategory(cat.id)}
                    className={`px-4 py-1.5 text-xs font-body uppercase tracking-wider transition-all duration-200 border ${
                      filterCategory === cat.id
                        ? 'bg-white text-[#0F1419] border-white'
                        : 'text-white/50 border-white/10 hover:border-white/30 hover:text-white'
                    }`}
                  >
                    {cat.icon} {cat.label} ({count})
                  </button>
                );
              })}
            </div>

            {(() => {
              const filtered = filterCategory === 'all'
                ? gallery
                : gallery.filter(g => g.category === filterCategory);

              return loading ? (
                <p className="text-white/40 font-body text-sm">Chargement...</p>
              ) : filtered.length === 0 ? (
                <div className="border border-white/10 p-12 text-center">
                  <p className="text-white/30 font-body">
                    {gallery.length === 0
                      ? 'Aucune image dans la galerie'
                      : `Aucune image dans "${filterCategory}"`}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {filtered.map((img) => (
                  <div key={img.id} className="group relative overflow-hidden border border-white/5">
                    <div className="aspect-square">
                      <img
                        src={img.thumbnailUrl || img.directUrl}
                        alt={img.title || ''}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex items-center justify-center">
                      <button
                        onClick={() => handleDelete(img.id, img.title)}
                        className="opacity-0 group-hover:opacity-100 px-4 py-2 border border-red-400 text-red-400 text-xs uppercase tracking-wider hover:bg-red-400 hover:text-white transition-all duration-300 font-body"
                      >
                        Supprimer
                      </button>
                    </div>
                    {/* Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent">
                      <p className="text-white text-xs font-body truncate">{img.title || 'Sans titre'}</p>
                      <p className="text-white/40 text-[10px] font-body uppercase">{img.category}</p>
                    </div>
                  </div>
                ))}
              </div>
              );
            })()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUpload;
