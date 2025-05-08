// src/components/Header.jsx
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaLeaf, FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container-custom flex justify-between items-center py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-primary-500 text-white p-2 rounded-full">
            <FaLeaf className="w-5 h-5" />
          </div>
          <span className="font-bold text-xl text-gray-800">Mantoma</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              isActive ? "text-primary-600 font-medium" : "text-gray-600 hover:text-primary-600 transition-colors"
            }
          >
            Beranda
          </NavLink>
          <NavLink 
            to="/detection" 
            className={({ isActive }) => 
              isActive ? "text-primary-600 font-medium" : "text-gray-600 hover:text-primary-600 transition-colors"
            }
          >
            Deteksi
          </NavLink>
          <NavLink 
            to="/about" 
            className={({ isActive }) => 
              isActive ? "text-primary-600 font-medium" : "text-gray-600 hover:text-primary-600 transition-colors"
            }
          >
            Tentang
          </NavLink>
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-600 focus:outline-none"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Tutup menu" : "Buka menu"}
        >
          {isMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container-custom py-4 flex flex-col space-y-4">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `${isActive ? "text-primary-600 font-medium" : "text-gray-600"} block py-2`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Beranda
            </NavLink>
            <NavLink 
              to="/detection" 
              className={({ isActive }) => 
                `${isActive ? "text-primary-600 font-medium" : "text-gray-600"} block py-2`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Deteksi
            </NavLink>
            <NavLink 
              to="/about" 
              className={({ isActive }) => 
                `${isActive ? "text-primary-600 font-medium" : "text-gray-600"} block py-2`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Tentang
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;