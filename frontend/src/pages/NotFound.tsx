// frontend/src/pages/NotFound.jsx
import { Link } from 'react-router-dom';
import { FaExclamationTriangle, FaHome } from 'react-icons/fa';

const NotFound = () => {
  return (
    <div className="py-20 px-4 flex flex-col items-center justify-center min-h-[50vh]">
      <div className="text-yellow-500 mb-6">
        <FaExclamationTriangle className="w-16 h-16" />
      </div>
      <h1 className="text-4xl font-bold mb-4 text-center">Halaman Tidak Ditemukan</h1>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        Maaf, halaman yang Anda cari tidak dapat ditemukan.
      </p>
      <Link 
        to="/" 
        className="btn btn-primary flex items-center gap-2"
      >
        <FaHome />
        <span>Kembali ke Beranda</span>
      </Link>
    </div>
  );
};

export default NotFound;