// frontend/src/pages/About.jsx
import { FaLeaf, FaUsers, FaGithub } from 'react-icons/fa';

const About = () => {
  return (
    <div className="py-12 px-4 min-h-screen bg-gray-50">
      <div className="container-custom">
        <div className="mb-8 text-center">
          <h1 className="mb-4">Tentang Mantoma</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Mantoma adalah sistem deteksi dini penyakit daun tomat berbasis teknologi Convolutional Neural Network (CNN)
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="mb-6">Visi & Misi</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3>Visi</h3>
              <p className="text-gray-600">
                Menjadi solusi praktis dan andal dalam upaya meningkatkan produktivitas petani tomat melalui deteksi dini penyakit tanaman berbasis teknologi AI.
              </p>
            </div>
            <div>
              <h3>Misi</h3>
              <ul className="text-gray-600 list-disc list-inside space-y-2">
                <li>Membantu petani mengenali penyakit daun tomat secara cepat dan akurat</li>
                <li>Memberikan rekomendasi penanganan yang tepat dan efektif</li>
                <li>Mendorong penggunaan teknologi dalam sektor pertanian</li>
                <li>Berkontribusi dalam peningkatan ketahanan pangan lokal</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="mb-6 flex items-center gap-2">
            <FaLeaf className="text-primary-500" />
            <span>Tentang Proyek</span>
          </h2>
          <p className="text-gray-600 mb-4">
            Mantoma merupakan proyek capstone yang dikembangkan dalam rangka program Coding Camp 2025. Proyek ini berangkat dari permasalahan petani tomat yang sering mengalami kesulitan dalam mendeteksi penyakit daun sejak dini, yang mengakibatkan penanganan yang terlambat atau tidak tepat.
          </p>
          <p className="text-gray-600 mb-4">
            Menggunakan teknologi Machine Learning, khususnya Convolutional Neural Network (CNN), Mantoma mampu mengidentifikasi dan mengklasifikasikan berbagai jenis penyakit daun tomat seperti Early Blight, Late Blight, Leaf Mold, dan Septoria Leaf Spot.
          </p>
          <p className="text-gray-600">
            Sistem ini menyediakan antarmuka pengguna yang sederhana dan mudah digunakan, di mana pengguna hanya perlu mengunggah gambar daun tomat dan mendapatkan hasil analisis beserta rekomendasi penanganan dalam hitungan detik.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="mb-6 flex items-center gap-2">
            <FaUsers className="text-primary-500" />
            <span>Tim Kami</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center p-4 border border-gray-100 rounded-lg hover:shadow-md transition-shadow">
              <h3 className="mb-1">Sandy Sanjaya</h3>
              <p className="text-gray-500 text-sm mb-2">ML Engineer</p>
              <div className="flex justify-center gap-3">
                <a href="https://github.com/sandysanjaya" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary-600">
                  <FaGithub />
                </a>
              </div>
            </div>
            
            <div className="text-center p-4 border border-gray-100 rounded-lg hover:shadow-md transition-shadow">
              <h3 className="mb-1">Dimas Sukmana</h3>
              <p className="text-gray-500 text-sm mb-2">ML Engineer</p>
              <div className="flex justify-center gap-3">
                <a href="https://github.com/dimassukmana" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary-600">
                  <FaGithub />
                </a>
              </div>
            </div>
            
            <div className="text-center p-4 border border-gray-100 rounded-lg hover:shadow-md transition-shadow">
              <h3 className="mb-1">Afwa Hamzah Al Rasyid</h3>
              <p className="text-gray-500 text-sm mb-2">ML Engineer</p>
              <div className="flex justify-center gap-3">
                <a href="https://github.com/afwarasyid" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary-600">
                  <FaGithub />
                </a>
              </div>
            </div>
            
            <div className="text-center p-4 border border-gray-100 rounded-lg hover:shadow-md transition-shadow">
              <h3 className="mb-1">Reizka Fathia</h3>
              <p className="text-gray-500 text-sm mb-2">Frontend Developer</p>
              <div className="flex justify-center gap-3">
                <a href="https://github.com/reizkafathia" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary-600">
                  <FaGithub />
                </a>
              </div>
            </div>
            
            <div className="text-center p-4 border border-gray-100 rounded-lg hover:shadow-md transition-shadow">
              <h3 className="mb-1">Muhammad Ibnu Alwan</h3>
              <p className="text-gray-500 text-sm mb-2">Backend Developer</p>
              <div className="flex justify-center gap-3">
                <a href="https://github.com/mibnualwan" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary-600">
                  <FaGithub />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;