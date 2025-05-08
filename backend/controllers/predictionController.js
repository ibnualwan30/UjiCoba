// backend/controllers/predictionController.js
const fs = require('fs');
const path = require('path');
const mlService = require('../services/mlService');

// Database of diseases (in real app, this would come from a database)
const diseases = [
  {
    id: 'early_blight',
    name: 'Early Blight (Alternaria solani)',
    description: 'Penyakit Early Blight disebabkan oleh jamur Alternaria solani yang menyerang daun, batang, dan buah tomat. Biasanya dimulai dengan bercak coklat pada daun yang lebih tua dengan pola lingkaran konsentris.',
    severity: 'Sedang',
    recommendations: [
      'Gunakan fungisida berbahan dasar tembaga atau sulfur sesuai petunjuk kemasan',
      'Buang dan bakar daun yang terinfeksi untuk mencegah penyebaran',
      'Pastikan ada sirkulasi udara yang baik antar tanaman',
      'Lakukan rotasi tanaman setiap musim tanam',
      'Hindari menyiram tanaman di sore hari untuk mencegah kelembaban berlebih di malam hari'
    ]
  },
  {
    id: 'late_blight',
    name: 'Late Blight (Phytophthora infestans)',
    description: 'Late Blight disebabkan oleh patogen Phytophthora infestans yang menyerang daun, batang, dan buah tomat. Penyakit ini menyebar dengan cepat dalam kondisi lembab dan dapat menghancurkan seluruh tanaman dalam waktu singkat.',
    severity: 'Tinggi',
    recommendations: [
      'Aplikasikan fungisida preventif berbahan aktif mankozeb atau klorotalonil secara rutin',
      'Segera buang dan bakar tanaman yang terinfeksi untuk mencegah penyebaran',
      'Pantau tanaman secara rutin, terutama saat musim hujan',
      'Hindari penyiraman di sore/malam hari',
      'Gunakan varietas tomat yang tahan terhadap Late Blight untuk penanaman berikutnya'
    ]
  },
  {
    id: 'leaf_mold',
    name: 'Leaf Mold (Passalora fulva)',
    description: 'Leaf Mold adalah penyakit jamur yang disebabkan oleh Passalora fulva (dahulu Fulvia fulva atau Cladosporium fulvum). Penyakit ini menyebabkan bercak kuning di bagian atas daun dan lapisan jamur berwarna hijau zaitun hingga coklat di bagian bawah daun.',
    severity: 'Sedang',
    recommendations: [
      'Kurangi kelembaban di sekitar tanaman dengan meningkatkan sirkulasi udara',
      'Gunakan fungisida berbahan dasar tembaga atau klorotalonil sesuai petunjuk',
      'Buang daun yang terinfeksi dengan hati-hati',
      'Hindari menyiram bagian daun tanaman',
      'Jaga jarak tanam yang cukup untuk ventilasi yang baik'
    ]
  },
  {
    id: 'septoria_leaf_spot',
    name: 'Septoria Leaf Spot (Septoria lycopersici)',
    description: 'Septoria Leaf Spot disebabkan oleh jamur Septoria lycopersici. Penyakit ini menyerang daun tomat dengan ciri khas bercak bundar kecil berwarna cokelat dengan tepian gelap dan pusat terang, biasanya muncul pada daun bagian bawah.',
    severity: 'Sedang',
    recommendations: [
      'Gunakan fungisida berbahan dasar tembaga, mankozeb, atau klorotalonil sesuai petunjuk',
      'Buang daun yang terinfeksi dan jangan kompos',
      'Jaga kebersihan kebun dengan menyingkirkan sisa-sisa tanaman di akhir musim',
      'Lakukan rotasi tanaman minimal 2 tahun',
      'Hindari menyiram dari atas agar daun tetap kering'
    ]
  },
  {
    id: 'healthy',
    name: 'Daun Sehat',
    description: 'Daun tomat dalam kondisi sehat tanpa tanda-tanda penyakit atau hama. Daun memiliki warna hijau cerah dan struktur yang normal.',
    severity: 'Rendah',
    recommendations: [
      'Lanjutkan praktik pertanian yang baik seperti penyiraman secara teratur',
      'Berikan pupuk seimbang sesuai fase pertumbuhan tanaman',
      'Pantau tanaman secara rutin untuk deteksi dini masalah',
      'Jaga sanitasi kebun untuk mencegah penyakit',
      'Lakukan pemangkasan rutin untuk sirkulasi udara yang baik'
    ]
  }
];

/**
 * Process image and predict disease
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const predictDisease = async (req, res) => {
  try {
    // File is already uploaded by middleware
    const file = req.file;
    
    if (!file) {
      return res.status(400).json({
        status: 'error',
        message: 'Tidak ada file yang diunggah',
      });
    }
    
    // Call ML service for prediction
    const prediction = await mlService.predictImage(file.path);
    
    // Find disease info from "database"
    const diseaseInfo = diseases.find(d => d.id === prediction.class) || {
      id: prediction.class,
      name: prediction.class,
      description: 'Informasi tidak tersedia',
      severity: 'Tidak diketahui',
      recommendations: ['Konsultasikan dengan ahli pertanian untuk diagnosis lebih lanjut']
    };
    
    // Construct server url for image
    const host = req.get('host');
    const protocol = req.protocol;
    const imageUrl = `${protocol}://${host}/uploads/${file.filename}`;
    
    // Return prediction result with disease info
    res.status(200).json({
      status: 'success',
      message: 'Analisis berhasil',
      data: {
        disease_id: prediction.class,
        disease_name: diseaseInfo.name,
        confidence: prediction.confidence,
        severity: diseaseInfo.severity,
        description: diseaseInfo.description,
        recommendations: diseaseInfo.recommendations,
        image_url: imageUrl,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Error predicting disease:', error);
    res.status(500).json({
      status: 'error',
      message: error.message || 'Terjadi kesalahan saat memproses gambar',
    });
  }
};

/**
 * Get all supported diseases
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getAllDiseases = (req, res) => {
  try {
    res.status(200).json({
      status: 'success',
      count: diseases.length,
      data: diseases.map(d => ({
        id: d.id,
        name: d.name,
        severity: d.severity
      }))
    });
  } catch (error) {
    console.error('Error getting diseases:', error);
    res.status(500).json({
      status: 'error',
      message: 'Terjadi kesalahan saat mengambil data penyakit',
    });
  }
};

/**
 * Get disease by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getDiseaseById = (req, res) => {
  try {
    const diseaseId = req.params.id;
    const disease = diseases.find(d => d.id === diseaseId);
    
    if (!disease) {
      return res.status(404).json({
        status: 'error',
        message: 'Penyakit tidak ditemukan',
      });
    }
    
    res.status(200).json({
      status: 'success',
      data: disease
    });
  } catch (error) {
    console.error('Error getting disease:', error);
    res.status(500).json({
      status: 'error',
      message: 'Terjadi kesalahan saat mengambil data penyakit',
    });
  }
};

module.exports = {
  predictDisease,
  getAllDiseases,
  getDiseaseById,
};