import { useEffect, useState, useRef } from "react";
import Layout from "../components/layout/Layout";
import { MapPin, Search } from "lucide-react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

// This is a placeholder. In a real application, you would use your own Mapbox token
// For this demo, we'll use a temporary setup for demonstration purposes
const MAPBOX_TOKEN = "YOUR_MAPBOX_TOKEN";

// Type for food location

// Mock data for food locations
const MOCK_FOOD_LOCATIONS: FoodLocation[] = [
  {
    id: 1,
    name: "Pasar Tradisional Cibubur",
    type: "traditional_market",
    address: "Jl. Raya Cibubur, Jakarta Timur",
    coordinates: [106.8845, -6.3543],
    foodTypes: ["vegetables", "fruits", "protein"],
    priceRange: "affordable"
  },
  {
    id: 2,
    name: "Sayur Box",
    type: "grocery_store",
    address: "Jl. Margonda Raya No. 45, Depok",
    coordinates: [106.8317, -6.3823],
    foodTypes: ["vegetables", "fruits"],
    priceRange: "affordable"
  },
  {
    id: 3,
    name: "Toko Buah Makmur",
    type: "fruit_shop",
    address: "Jl. Fatmawati No. 23, Jakarta Selatan",
    coordinates: [106.8123, -6.2694],
    foodTypes: ["fruits"],
    priceRange: "moderate"
  },
  {
    id: 4,
    name: "Pasar Ikan Modern",
    type: "fish_market",
    address: "Jl. Muara Karang, Jakarta Utara",
    coordinates: [106.7772, -6.1233],
    foodTypes: ["protein"],
    priceRange: "affordable"
  },
  {
    id: 5,
    name: "Toko Sehat Organik",
    type: "organic_shop",
    address: "Jl. Kemang Raya No. 10, Jakarta Selatan",
    coordinates: [106.8132, -6.2589],
    foodTypes: ["vegetables", "fruits", "protein"],
    priceRange: "premium"
  }
];

// Food type options for filter
const FOOD_TYPE_OPTIONS = [
  { value: "vegetables", label: "Sayuran" },
  { value: "fruits", label: "Buah-buahan" },
  { value: "protein", label: "Sumber Protein" },
  { value: "dairy", label: "Produk Susu" },
  { value: "grains", label: "Biji-bijian" }
];

// Price range options for filter
const PRICE_RANGE_OPTIONS = [
  { value: "affordable", label: "Terjangkau" },
  { value: "moderate", label: "Menengah" },
  { value: "premium", label: "Premium" }
];

// Type for food location
type FoodLocation = {
  id: number;
  name: string;
  type: string;
  address: string;
  coordinates: [number, number];
  foodTypes: string[];
  priceRange: string;
};

const FoodFinder = () => {
  
  // New Section
  useEffect(() => {
    const detectLocationButton = document.getElementById("detect-location");
    const locationInfoDiv = document.getElementById("location-info");

    if (detectLocationButton && locationInfoDiv) {
      detectLocationButton.addEventListener("click", () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const latitude = position.coords.latitude;
              const longitude = position.coords.longitude;

              locationInfoDiv.textContent = `Latitude: ${latitude}, Longitude: ${longitude}`;

              const searchQuery = `rekomendasi makanan sehat di dekat ${latitude},${longitude}`;
              window.open(`https://www.google.com/search?q=${searchQuery}`, "_blank");
            },
            (error) => {
              locationInfoDiv.textContent = "Unable to retrieve your location.";
              console.error("Error getting location:", error);
            }
          );
        } else {
          locationInfoDiv.textContent = "Geolocation is not supported by your browser.";
        }
      });
    }
  }, []);
  
  // Existing Content
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxTokenInput, setMapboxTokenInput] = useState("");
  const [mapLoaded, setMapLoaded] = useState(false);
  const [locations, setLocations] = useState<FoodLocation[]>(MOCK_FOOD_LOCATIONS);
  const [filteredLocations, setFilteredLocations] = useState<FoodLocation[]>(MOCK_FOOD_LOCATIONS);
  const [selectedLocation, setSelectedLocation] = useState<FoodLocation | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFoodTypes, setSelectedFoodTypes] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("");
  const [mapError, setMapError] = useState("");
  const [userCoordinates, setUserCoordinates] = useState<[number, number] | null>(null);

  // Function to initialize map
  const initializeMap = (token: string) => {
    if (!mapContainer.current) return;

    try {
      mapboxgl.accessToken = token;

      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [106.8456, -6.2088], // Jakarta, Indonesia
        zoom: 10
      });

      map.current.addControl(new mapboxgl.NavigationControl(), "top-right");
      
      map.current.on("load", () => {
        setMapLoaded(true);
        if (userCoordinates) {
          map.current?.setCenter(userCoordinates);
          addUserMarker(userCoordinates);
        }
        addLocationMarkers(filteredLocations);
      });

      setMapError("");
    } catch (error) {
      console.error("Error initializing map:", error);
      setMapError("Error loading map. Please check your Mapbox token.");
    }
  };

  // Get user location
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coordinates: [number, number] = [position.coords.longitude, position.coords.latitude];
          setUserCoordinates(coordinates);
          
          if (map.current && mapLoaded) {
            map.current.setCenter(coordinates);
            map.current.setZoom(13);
            addUserMarker(coordinates);
          }
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  // Add user location marker
  const addUserMarker = (coordinates: [number, number]) => {
    if (!map.current || !mapLoaded) return;

    // Remove existing user marker if any
    const existingMarker = document.getElementById("user-marker");
    if (existingMarker) {
      existingMarker.remove();
    }

    // Create custom marker element
    const markerElement = document.createElement("div");
    markerElement.id = "user-marker";
    markerElement.className = "w-8 h-8 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center";
    markerElement.innerHTML = '<div class="w-3 h-3 bg-white rounded-full"></div>';

    // Add marker to map
    new mapboxgl.Marker(markerElement)
      .setLngLat(coordinates)
      .addTo(map.current);
  };

  // Add location markers to map
  const addLocationMarkers = (locations: FoodLocation[]) => {
    if (!map.current || !mapLoaded) return;

    // Remove existing markers
    const existingMarkers = document.querySelectorAll(".location-marker");
    existingMarkers.forEach(marker => marker.remove());

    // Add markers for each location
    locations.forEach(location => {
      // Create marker element
      const markerElement = document.createElement("div");
      markerElement.className = "location-marker w-8 h-8 rounded-full bg-semar-green border-2 border-white flex items-center justify-center cursor-pointer";
      markerElement.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>';
      
      // Add click event
      markerElement.addEventListener("click", () => {
        setSelectedLocation(location);
      });

      // Create popup
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
        `<div class="p-2">
          <strong>${location.name}</strong>
          <p class="text-xs">${location.address}</p>
        </div>`
      );

      // Add marker to map
      new mapboxgl.Marker(markerElement)
        .setLngLat(location.coordinates)
        .setPopup(popup)
        .addTo(map.current!);
    });
  };

  // Handle food type filter change
  const handleFoodTypeChange = (type: string) => {
    if (selectedFoodTypes.includes(type)) {
      setSelectedFoodTypes(selectedFoodTypes.filter(t => t !== type));
    } else {
      setSelectedFoodTypes([...selectedFoodTypes, type]);
    }
  };

  // Apply filters
  useEffect(() => {
    let filtered = [...locations];
    
    // Apply search term filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(location => 
        location.name.toLowerCase().includes(term) || 
        location.address.toLowerCase().includes(term)
      );
    }
    
    // Apply food type filter
    if (selectedFoodTypes.length > 0) {
      filtered = filtered.filter(location => 
        selectedFoodTypes.some(type => location.foodTypes.includes(type))
      );
    }
    
    // Apply price range filter
    if (selectedPriceRange) {
      filtered = filtered.filter(location => location.priceRange === selectedPriceRange);
    }
    
    setFilteredLocations(filtered);
    
    // Update markers if map is loaded
    if (mapLoaded && map.current) {
      addLocationMarkers(filtered);
    }
  }, [searchTerm, selectedFoodTypes, selectedPriceRange, locations, mapLoaded]);
  
  return (
    <Layout> {/* Removed className */}
      {/* Added structure similar to StuntingAssessment.tsx */}
      <div className="bg-gradient-to-b from-semar-green/10 to-white">
        <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          {/* Added Title/Subtitle Block */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Lokasi Makanan Sehat
            </h1>
            <p className="mt-3 text-lg text-gray-600">
              Temukan rekomendasi tempat makan sehat di sekitar Anda.
            </p>
          </div>

          {/* Original Content Starts Here */}
          <section id="food-recommendation-section" className="bg-white p-6 rounded-lg shadow-md mb-6" style={{ display: "block" }}> {/* Removed mt-8 */}
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Rekomendasi Makanan</h2>
            <p className="text-gray-600 mb-4">Klik tombol di bawah untuk mendapatkan rekomendasi makanan sehat di sekitar Anda berdasarkan lokasi Anda saat ini.</p>
        <button id="detect-location" className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-semar-green hover:bg-semar-green/90">
          Dapatkan Lokasi
        </button>
        <div id="location-info" className="mt-4 text-gray-700"></div>
        <div id="city-name" className="text-gray-700"></div>
        <div id="food-recommendation" className="text-gray-700"></div>
      </section>

      {/* Informasi Makanan Sehat */}
      <section className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Pentingnya Makanan Sehat untuk Anak</h2>
        <p className="text-gray-700 mb-4">
          Makanan sehat sangat penting untuk pertumbuhan dan perkembangan anak. Nutrisi yang cukup membantu mencegah stunting dan meningkatkan kesehatan anak secara keseluruhan.
        </p>
        <ul className="list-disc list-inside text-gray-700">
          <li>Mendukung pertumbuhan fisik dan perkembangan otak</li>
          <li>Meningkatkan sistem kekebalan tubuh</li>
          <li>Mencegah penyakit kronis di kemudian hari</li>
        </ul>
      </section>

      {/* Tips Makanan Sehat */}
      <section className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Tips untuk Orang Tua: Menyediakan Makanan Sehat untuk Anak</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>Sajikan makanan yang bervariasi dari semua kelompok makanan</li>
          <li>Batasi makanan olahan, tinggi gula, dan garam</li>
          <li>Ajak anak untuk terlibat dalam memilih dan menyiapkan makanan</li>
          <li>Berikan contoh yang baik dengan mengonsumsi makanan sehat</li>
        </ul>
      </section>

      {/* Pencegahan Stunting */}
      <section className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Stunting dan Pencegahannya</h2>
        <p className="text-gray-700 mb-4">
          Stunting adalah kondisi gagal tumbuh pada anak akibat kekurangan gizi kronis. Mencegah stunting sangat penting untuk memastikan anak tumbuh sehat dan optimal.
        </p>
        <ul className="list-disc list-inside text-gray-700">
          <li>Berikan ASI eksklusif selama 6 bulan pertama</li>
          <li>Berikan makanan pendamping ASI (MPASI) yang bergizi seimbang</li>
          <li>Pantau pertumbuhan anak secara berkala</li>
          <li>Konsultasikan dengan dokter atau ahli gizi</li>
        </ul>
      </section>
        </div> {/* Close max-w-4xl div */}
      </div> {/* Close bg-gradient div */}
    </Layout>
  );
};

export default FoodFinder;
