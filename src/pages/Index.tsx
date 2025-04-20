
import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { motion } from "framer-motion";
import { ArrowRight, BarChart3, MapPin, BookOpen } from "lucide-react";

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-semar-green/10 to-white">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl">
                  <span className="block text-semar-green">SEMAR</span>
                  <span className="block mt-2">Sistem Edukasi dan Anak Rentan</span>
                </h1>
                <p className="mt-6 text-lg text-gray-600 max-w-3xl">
                  Platform edukasi dan panduan bagi orang tua serta pengasuh untuk mencegah stunting dan 
                  meningkatkan kesehatan anak Indonesia.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    to="/stunting-assessment"
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-semar-green hover:bg-semar-green/90"
                  >
                    Mulai Penilaian Risiko
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                  <Link
                    to="/child-health"
                    className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 rounded-md shadow-sm text-base font-medium text-semar-green bg-white hover:bg-gray-50"
                  >
                    Pelajari Lebih Lanjut
                  </Link>
                </div>
              </motion.div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-semar-green rounded-full opacity-10 transform scale-110 blur-xl"></div>
                <img
                  src="/public/stunting.jpg"
                  alt="Anak sehat"
                  className="relative rounded-lg shadow-xl max-w-full h-auto object-cover"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Fitur Utama SEMAR
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Kami menyediakan berbagai fitur untuk membantu Anda dalam memantau dan meningkatkan 
              kesehatan anak serta mencegah stunting.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <motion.div 
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <div className="h-12 w-12 bg-semar-green/10 rounded-full flex items-center justify-center mb-6">
                <BarChart3 className="h-6 w-6 text-semar-green" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Penilaian Risiko Stunting</h3>
              <p className="text-gray-600 mb-6">
                Isi data anak Anda dan dapatkan penilaian risiko stunting beserta rekomendasi yang 
                disesuaikan dengan kondisi anak.
              </p>
              <Link 
                to="/stunting-assessment" 
                className="text-semar-green font-medium flex items-center hover:underline"
              >
                Coba Sekarang <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </motion.div>
            
            {/* Feature 2 */}
            <motion.div 
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <div className="h-12 w-12 bg-semar-blue/10 rounded-full flex items-center justify-center mb-6">
                <MapPin className="h-6 w-6 text-semar-blue" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Lokasi Makanan Sehat</h3>
              <p className="text-gray-600 mb-6">
                Temukan lokasi penjual makanan sehat dan terjangkau di sekitar Anda untuk 
                memenuhi kebutuhan gizi anak.
              </p>
              <Link 
                to="/food-finder" 
                className="text-semar-blue font-medium flex items-center hover:underline"
              >
                Temukan Lokasi <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </motion.div>
            
            {/* Feature 3 */}
            <motion.div 
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <div className="h-12 w-12 bg-semar-orange/10 rounded-full flex items-center justify-center mb-6">
                <BookOpen className="h-6 w-6 text-semar-orange" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Informasi Kesehatan Anak</h3>
              <p className="text-gray-600 mb-6">
                Akses berbagai artikel dan informasi tentang kesehatan anak, perkembangan, 
                dan pencegahan stunting.
              </p>
              <Link 
                to="/child-health" 
                className="text-semar-orange font-medium flex items-center hover:underline"
              >
                Baca Artikel <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Mengapa Memilih SEMAR?
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Kami berkomitmen untuk memberikan informasi dan alat terbaik bagi orang tua 
              dalam menjaga kesehatan dan mencegah stunting pada anak.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Reason 1 */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="h-10 w-10 bg-semar-green/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-xl font-bold text-semar-green">1</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Berbasis Bukti Ilmiah</h3>
              <p className="text-gray-600">
                Semua informasi dan penilaian didasarkan pada pedoman dan bukti ilmiah terbaru.
              </p>
            </div>
            
            {/* Reason 2 */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="h-10 w-10 bg-semar-blue/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-xl font-bold text-semar-blue">2</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Mudah Digunakan</h3>
              <p className="text-gray-600">
                Antarmuka yang sederhana dan intuitif, dirancang untuk semua kalangan pengguna.
              </p>
            </div>
            
            {/* Reason 3 */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="h-10 w-10 bg-semar-orange/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-xl font-bold text-semar-orange">3</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Solusi Praktis</h3>
              <p className="text-gray-600">
                Menyediakan rekomendasi dan solusi praktis yang dapat langsung diterapkan.
              </p>
            </div>
            
            {/* Reason 4 */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="h-10 w-10 bg-semar-purple/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-xl font-bold text-semar-purple">4</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Akses Gratis</h3>
              <p className="text-gray-600">
                Semua fitur dapat diakses secara gratis untuk mendukung kesehatan anak Indonesia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-semar-green/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 lg:p-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Mulai Perjalanan Menuju Anak Sehat dan Bebas Stunting
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Cegah stunting sejak dini dengan melakukan penilaian risiko dan mendapatkan rekomendasi 
                  yang sesuai untuk anak Anda.
                </p>
                <Link
                  to="/stunting-assessment"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-semar-green hover:bg-semar-green/90"
                >
                  Lakukan Penilaian Sekarang
                </Link>
              </div>
              <div className="relative h-64 lg:h-auto">
                <img
                  src="/public/stunting2.jpeg"
                  alt="Ibu dan anak"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
