// src/pages/Home.jsx
import { Link } from 'react-router-dom';
import { FaLeaf, FaMicroscope, FaSeedling } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-500 to-secondary-500 text-white py-20">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Mantoma
              </h1>
              <p className="text-xl md:text-2xl mb-6">
                Sistem Deteksi Dini Penyakit Daun Tomat Berbasis Convolutional Neural Network
              </p>
              <p className="mb-8 text-white/80">
                Deteksi penyakit daun tomat secara cepat dan akurat dengan teknologi machine learning, 
                membantu petani mengambil tindakan preventif sedini mungkin
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/detection" className="btn bg-white text-primary-600 hover:bg-gray-100 font-semibold text-center">
                  Mulai Deteksi
                </Link>
                <Link to="/about" className="btn btn-outline text-white border-white hover:bg-white/10 text-center">
                  Tentang Kami
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="bg-white p-5 rounded-lg shadow-lg">
                <img 
                  src="/src/assets/tomato-plant.jpg" 
                  alt="Tanaman Tomat Sehat" 
                  className="rounded-md w-full h-auto"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/600x400?text=Tanaman+Tomat';
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fitur Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-center mb-12">Fitur Utama</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card text-center hover:shadow-lg transition-shadow">
              <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-primary-100 text-primary-600 mb-4 mx-auto">
                <FaMicroscope className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Deteksi Akurat</h3>
              <p className="text-gray-600">
                Menggunakan teknologi CNN dengan akurasi tinggi untuk mengidentifikasi berbagai jenis penyakit daun tomat
              </p>
            </div>

            <div className="card text-center hover:shadow-lg transition-shadow">
              <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-secondary-100 text-secondary-600 mb-4 mx-auto">
                <FaSeedling className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Respon Cepat</h3>
              <p className="text-gray-600">
                Dapatkan hasil deteksi dalam hitungan detik tanpa perlu registrasi atau proses yang rumit
              </p>
            </div>

            <div className="card text-center hover:shadow-lg transition-shadow">
              <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-primary-100 text-primary-600 mb-4 mx-auto">
                <FaLeaf className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Solusi Tepat</h3>
              <p className="text-gray-600">
                Dapatkan rekomendasi penanganan awal berdasarkan jenis penyakit yang terdeteksi
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cara Kerja Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-center mb-12">Cara Kerja Mantoma</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold mb-4">
                1
              </div>
              <h3 className="text-lg font-semibold mb-2 text-center">Ambil Foto</h3>
              <p className="text-gray-600 text-center">
                Ambil foto daun tomat yang ingin Anda periksa menggunakan kamera atau pilih dari galeri
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold mb-4">
                2
              </div>
              <h3 className="text-lg font-semibold mb-2 text-center">Unggah Foto</h3>
              <p className="text-gray-600 text-center">
                Unggah foto ke sistem Mantoma dan tunggu beberapa saat untuk proses analisis
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold mb-4">
                3
              </div>
              <h3 className="text-lg font-semibold mb-2 text-center">Dapatkan Hasil</h3>
              <p className="text-gray-600 text-center">
                Terima hasil diagnosis dan rekomendasi penanganan untuk penyakit yang terdeteksi
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link to="/detection" className="btn btn-primary">
              Deteksi Sekarang
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-50">
        <div className="container-custom text-center">
          <h2 className="mb-6">Siap Melindungi Tanaman Tomat Anda?</h2>
          <p className="max-w-2xl mx-auto mb-8 text-gray-600">
            Gunakan Mantoma untuk mendeteksi penyakit daun tomat sejak dini dan dapatkan saran penanganan yang tepat
          </p>
          <Link to="/detection" className="btn btn-primary text-lg px-8 py-3">
            Mulai Deteksi
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;