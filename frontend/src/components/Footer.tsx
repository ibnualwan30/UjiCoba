// src/components/Footer.jsx
import { Link } from 'react-router-dom';
import { FaLeaf, FaGithub } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-800 text-white pt-12 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo and Description */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-primary-500 text-white p-1.5 rounded-full">
                <FaLeaf className="w-4 h-4" />
              </div>
              <span className="font-bold text-lg">Mantoma</span>
            </div>
            <p className="text-gray-400 mb-4">
              Sistem deteksi dini penyakit daun tomat berbasis Convolutional Neural Network
            </p>
            <p className="text-gray-400 text-sm">
              © {currentYear} Tim Mantoma. Semua hak dilindungi.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Navigasi Cepat</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link to="/" className="hover:text-primary-400 transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link to="/detection" className="hover:text-primary-400 transition-colors">
                  Deteksi
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary-400 transition-colors">
                  Tentang Kami
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Tim Pengembang</h3>
            <p className="text-gray-400 mb-2">
              Coding Camp 2025 - Team ID: CC25-CF052
            </p>
            <div className="flex items-center gap-4">
              <a 
                href="https://github.com/mantoma-team" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaGithub className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-6">
          <p className="text-center text-gray-500 text-sm">
            Dibuat dengan ❤️ oleh tim Mantoma untuk Coding Camp 2025
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;