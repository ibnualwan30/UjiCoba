// src/components/ResultCard.jsx
import { FaCheckCircle, FaExclamationTriangle, FaSeedling, FaLeaf, FaInfoCircle } from 'react-icons/fa';

const ResultCard = ({ result, onReset }) => {
  // Extract data from result
  const { 
    disease_name,
    confidence,
    severity,
    description,
    recommendations,
    image_url
  } = result;
  
  // Function to determine severity level color and icon
  const getSeverityInfo = (severityLevel) => {
    switch(severityLevel?.toLowerCase()) {
      case 'tinggi':
        return {
          color: 'text-red-600',
          bgColor: 'bg-red-100',
          icon: <FaExclamationTriangle className="w-5 h-5" />
        };
      case 'sedang':
        return {
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-100',
          icon: <FaExclamationTriangle className="w-5 h-5" />
        };
      case 'rendah':
        return {
          color: 'text-green-600',
          bgColor: 'bg-green-100',
          icon: <FaCheckCircle className="w-5 h-5" />
        };
      default:
        return {
          color: 'text-blue-600',
          bgColor: 'bg-blue-100',
          icon: <FaInfoCircle className="w-5 h-5" />
        };
    }
  };
  
  // Get severity info
  const severityInfo = getSeverityInfo(severity);
  
  // Format confidence percentage
  const confidencePercent = Math.round(confidence * 100);
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-primary-600 p-4 text-white">
        <h3 className="font-semibold text-xl flex items-center gap-2">
          <FaLeaf />
          <span>Hasil Analisis</span>
        </h3>
      </div>
      
      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Column - Image */}
          <div className="md:w-1/3">
            {image_url ? (
              <img 
                src={image_url} 
                alt={`Daun tomat dengan ${disease_name}`} 
                className="w-full h-auto rounded-lg border border-gray-200"
              />
            ) : (
              <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">Gambar tidak tersedia</span>
              </div>
            )}
          </div>
          
          {/* Right Column - Results */}
          <div className="md:w-2/3">
            <div className="mb-6">
              <h4 className="text-xl font-bold mb-2">{disease_name || 'Tidak terdeteksi'}</h4>
              
              <div className="flex items-center gap-4 mb-4">
                {/* Confidence Percentage */}
                <div className="bg-blue-50 text-blue-700 rounded-full px-3 py-1 text-sm font-medium">
                  Akurasi: {confidencePercent}%
                </div>
                
                {/* Severity */}
                {severity && (
                  <div className={`${severityInfo.bgColor} ${severityInfo.color} rounded-full px-3 py-1 text-sm font-medium flex items-center gap-1`}>
                    {severityInfo.icon}
                    <span>Tingkat Keparahan: {severity}</span>
                  </div>
                )}
              </div>
              
              {/* Description */}
              <div className="mb-4">
                <h5 className="font-semibold mb-1 flex items-center gap-1">
                  <FaInfoCircle className="text-gray-500" />
                  Deskripsi
                </h5>
                <p className="text-gray-700">{description || 'Tidak ada informasi'}</p>
              </div>
              
              {/* Recommendations */}
              <div>
                <h5 className="font-semibold mb-1 flex items-center gap-1">
                  <FaSeedling className="text-green-500" />
                  Rekomendasi Penanganan
                </h5>
                {recommendations && recommendations.length > 0 ? (
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {recommendations.map((rec, index) => (
                      <li key={index}>{rec}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-700">Tidak ada rekomendasi</p>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onReset}
            className="btn btn-outline"
          >
            Scan Gambar Lain
          </button>
          <button 
            onClick={() => window.print()}
            className="btn btn-primary"
          >
            Simpan Hasil
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;