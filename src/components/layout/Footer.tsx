
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-semar-green mb-4">SEMAR</h3>
            <p className="text-sm text-gray-600">
              Sistem Edukasi dan Anak Rentan - Platform edukasi untuk mencegah stunting dan 
              meningkatkan kesehatan anak Indonesia.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-semar-green mb-4">Tautan</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-gray-600 hover:text-semar-green">
                  Beranda
                </Link>
              </li>
              <li>
                <Link to="/stunting-assessment" className="text-sm text-gray-600 hover:text-semar-green">
                  Penilaian Risiko Stunting
                </Link>
              </li>
              <li>
                <Link to="/food-finder" className="text-sm text-gray-600 hover:text-semar-green">
                  Lokasi Makanan Sehat
                </Link>
              </li>
              <li>
                <Link to="/child-health" className="text-sm text-gray-600 hover:text-semar-green">
                  Kesehatan Anak
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Kontak section removed */}
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-center text-gray-500">
            &copy; {new Date().getFullYear()} SEMAR - Sistem Edukasi dan Anak Rentan. Semua hak dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
