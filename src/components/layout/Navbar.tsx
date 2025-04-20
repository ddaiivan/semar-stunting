
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-semar-green">SEMAR</span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium text-semar-green hover:bg-semar-green hover:bg-opacity-10">
              Beranda
            </Link>
            <Link to="/stunting-assessment" className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-semar-green hover:bg-opacity-10">
              Penilaian Risiko Stunting
            </Link>
            <Link to="/food-finder" className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-semar-green hover:bg-opacity-10">
              Lokasi Makanan Sehat
            </Link>
            <Link to="/child-health" className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-semar-green hover:bg-opacity-10">
              Kesehatan Anak
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-semar-green hover:bg-semar-green hover:bg-opacity-10">
              Beranda
            </Link>
            <Link to="/stunting-assessment" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-semar-green hover:bg-opacity-10">
              Penilaian Risiko Stunting
            </Link>
            <Link to="/food-finder" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-semar-green hover:bg-opacity-10">
              Lokasi Makanan Sehat
            </Link>
            <Link to="/child-health" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-semar-green hover:bg-opacity-10">
              Kesehatan Anak
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
