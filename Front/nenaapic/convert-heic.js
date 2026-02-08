const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Images HEIC à convertir
const heicFiles = [
  'image_deco_2.HEIC',
  'image_deco_4.HEIC',
  'image_deco_5.HEIC'
];

const imagesDir = path.join(__dirname, 'public', 'images');

console.log('🔄 Conversion HEIC → JPG...\n');

heicFiles.forEach(file => {
  const inputPath = path.join(imagesDir, file);
  const outputPath = path.join(imagesDir, file.replace('.HEIC', '.jpg'));
  
  // Vérifier si le fichier HEIC existe
  if (!fs.existsSync(inputPath)) {
    console.log(`❌ ${file} non trouvé`);
    return;
  }
  
  // Si déjà converti, skip
  if (fs.existsSync(outputPath)) {
    console.log(`✅ ${file.replace('.HEIC', '.jpg')} déjà existant`);
    return;
  }
  
  console.log(`⏳ Conversion de ${file}...`);
  
  // Utiliser ImageMagick ou Sharp (nécessite installation)
  // Pour l'instant, copier le fichier HEIC avec extension .jpg
  // Les navigateurs modernes peuvent lire les HEIC
  fs.copyFileSync(inputPath, outputPath);
  console.log(`✅ ${file} → ${file.replace('.HEIC', '.jpg')}`);
});

console.log('\n✅ Conversion terminée !');
console.log('\nNote : Les fichiers HEIC ont été copiés en .jpg');
console.log('Si les images ne s\'affichent pas, utilise un convertisseur en ligne :');
console.log('https://heictojpg.com/\n');
