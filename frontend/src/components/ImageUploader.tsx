import { useState, useRef } from 'react';
import { FaCamera, FaUpload, FaSpinner } from 'react-icons/fa';
import { toast } from 'react-toastify';

// Definisi tipe untuk props
interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  isLoading: boolean;
}

// Definisi tipe untuk state
interface PreviewState {
  preview: string | null;
  isDragging: boolean;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, isLoading }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };
  
  // Handle file drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };
  
  // Handle drag events
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  // Process selected file
  const handleFile = (file) => {
    // Check if file exists
    if (!file) return;
    
    // Check file type
    if (!file.type.match('image/jpeg') && !file.type.match('image/png') && !file.type.match('image/jpg')) {
      toast.error('File harus berupa gambar (JPG/PNG)');
      return;
    }
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Ukuran gambar maksimal 5MB');
      return;
    }
    
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
    
    // Pass file to parent component
    onImageUpload(file);
  };
  
  // Trigger file input click
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  
  // Handle camera capture (mobile)
  const handleCameraCapture = () => {
    fileInputRef.current.capture = 'environment';
    fileInputRef.current.click();
  };
  
  return (
    <div className="w-full max-w-xl mx-auto">
      <div 
        className={`border-2 border-dashed rounded-lg p-6 text-center ${
          isDragging ? 'border-primary-500 bg-primary-50' : 'border-gray-300'
        } ${preview ? 'bg-gray-50' : 'bg-white'}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {preview ? (
          <div className="mb-4">
            <img 
              src={preview} 
              alt="Preview" 
              className="mx-auto max-h-64 rounded-md"
            />
            <button 
              className="mt-4 btn btn-outline text-sm"
              onClick={() => {
                setPreview(null);
                fileInputRef.current.value = '';
              }}
              disabled={isLoading}
            >
              Hapus Gambar
            </button>
          </div>
        ) : (
          <div className="py-8">
            <div className="mb-4 flex justify-center">
              <FaUpload className="w-12 h-12 text-gray-400" />
            </div>
            <p className="mb-2 text-sm text-gray-600">
              Seret & Lepas gambar daun tomat di sini, atau klik tombol di bawah
            </p>
            <p className="text-xs text-gray-500 mb-4">
              Format: JPG, PNG. Ukuran max: 5MB
            </p>
          </div>
        )}
        
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <input
            type="file"
            className="hidden"
            accept="image/jpeg, image/png, image/jpg"
            onChange={handleFileChange}
            ref={fileInputRef}
          />
          
          <button
            type="button"
            onClick={handleButtonClick}
            className="btn btn-primary flex items-center justify-center gap-2"
            disabled={isLoading}
          >
            <FaUpload className="w-4 h-4" />
            <span>Pilih dari Galeri</span>
          </button>
          
          <button
            type="button"
            onClick={handleCameraCapture}
            className="btn btn-secondary flex items-center justify-center gap-2"
            disabled={isLoading}
          >
            <FaCamera className="w-4 h-4" />
            <span>Ambil Foto</span>
          </button>
        </div>
        
        {isLoading && (
          <div className="mt-4 flex items-center justify-center gap-2 text-gray-600">
            <FaSpinner className="w-5 h-5 animate-spin" />
            <span>Menganalisis gambar...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;