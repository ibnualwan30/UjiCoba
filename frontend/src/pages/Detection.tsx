// src/pages/Detection.jsx
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import ImageUploader from '../components/ImageUploader';
import ResultCard from '../components/ResultCard';
import { uploadImage } from '../services/api';

const Detection = () => {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const navigate = useNavigate();
  
  const handleImageUpload = (imageFile) => {
    setFile(imageFile);
    // Reset result when new image is uploaded
    setResult(null);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      toast.error('Silakan pilih gambar daun tomat terlebih dahulu');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Create form data
      const formData = new FormData();
      formData.append('image', file);
      
      // Call API
      const response = await uploadImage(formData);
      
      // Process result
      setResult(response.data);
      toast.success('Analisis berhasil!');
    } catch (error) {
      console.error('Error uploading image:', error);
      
      // Handle specific error messages from backend
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Terjadi kesalahan saat menganalisis gambar. Silakan coba lagi.');
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleReset = () => {
    setFile(null);
    setResult(null);
  };
  
  return (
    <div className="py-12 px-4 min-h-screen bg-gray-50">
      <div className="container-custom">
        <div className="mb-8 text-center">
          <h1 className="mb-4">Deteksi Penyakit Daun Tomat</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Unggah gambar daun tomat untuk mendapatkan analisis tentang kondisi dan kemungkinan penyakit yang menyerang
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <form onSubmit={handleSubmit}>
            <ImageUploader 
              onImageUpload={handleImageUpload}
              isLoading={isLoading}
            />
            
            <div className="mt-6 flex justify-center">
              <button 
                type="submit" 
                className="btn btn-primary px-8"
                disabled={!file || isLoading}
              >
                Analisis Gambar
              </button>
            </div>
          </form>
        </div>
        
        {result && (
          <div className="mt-8">
            <ResultCard result={result} onReset={handleReset} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Detection;