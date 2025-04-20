
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
    <Layout>
      <div className="bg-gradient-to-b from-semar-blue/10 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Lokasi Makanan Sehat dan Terjangkau
            </h1>
            <p className="mt-3 text-lg text-gray-600">
              Temukan lokasi penjual makanan sehat dan terjangkau di sekitar Anda.
            </p>
          </div>
          
          {!mapLoaded && (
            <div className="mb-6 bg-white p-4 rounded-lg shadow">
              <p className="mb-2 font-medium">Untuk menggunakan fitur peta, Anda memerlukan Mapbox token.</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={mapboxTokenInput}
                  onChange={(e) => setMapboxTokenInput(e.target.value)}
                  placeholder="Masukkan Mapbox token Anda"
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-semar-blue focus:ring-semar-blue sm:text-sm"
                />
                <button
                  onClick={() => initializeMap(mapboxTokenInput)}
                  className="px-4 py-2 bg-semar-blue text-white rounded-md hover:bg-semar-blue/90"
                >
                  Muat Peta
                </button>
              </div>
              <p className="mt-2 text-xs text-gray-500">
                Dapatkan token gratis di <a href="https://www.mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-semar-blue hover:underline">mapbox.com</a>
              </p>
              {mapError && <p className="mt-2 text-xs text-red-500">{mapError}</p>}
            </div>
          )}
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <div className="mb-4">
                  <div className="relative">
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Cari lokasi..."
                      className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-semar-blue focus:ring-semar-blue sm:text-sm"
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Search className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Jenis Makanan</h3>
                  <div className="space-y-1">
                    {FOOD_TYPE_OPTIONS.map(option => (
                      <div key={option.value} className="flex items-center">
                        <input
                          id={`food-type-${option.value}`}
                          type="checkbox"
                          checked={selectedFoodTypes.includes(option.value)}
                          onChange={() => handleFoodTypeChange(option.value)}
                          className="h-4 w-4 text-semar-green focus:ring-semar-green border-gray-300 rounded"
                        />
                        <label htmlFor={`food-type-${option.value}`} className="ml-2 text-sm text-gray-700">
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Kisaran Harga</h3>
                  <div className="space-y-1">
                    {PRICE_RANGE_OPTIONS.map(option => (
                      <div key={option.value} className="flex items-center">
                        <input
                          id={`price-range-${option.value}`}
                          type="radio"
                          checked={selectedPriceRange === option.value}
                          onChange={() => setSelectedPriceRange(option.value === selectedPriceRange ? "" : option.value)}
                          className="h-4 w-4 text-semar-green focus:ring-semar-green border-gray-300"
                        />
                        <label htmlFor={`price-range-${option.value}`} className="ml-2 text-sm text-gray-700">
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <button
                  onClick={getUserLocation}
                  className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-semar-blue hover:bg-semar-blue/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-semar-blue"
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  Gunakan Lokasi Saya
                </button>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="font-medium text-gray-900 mb-3">Lokasi ({filteredLocations.length})</h3>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {filteredLocations.length > 0 ? (
                    filteredLocations.map(location => (
                      <div 
                        key={location.id} 
                        className={`p-3 rounded-lg cursor-pointer border ${selectedLocation?.id === location.id ? 'border-semar-green bg-semar-green/5' : 'border-gray-200 hover:bg-gray-50'}`}
                        onClick={() => {
                          setSelectedLocation(location);
                          if (map.current) {
                            map.current.flyTo({
                              center: location.coordinates,
                              zoom: 15
                            });
                          }
                        }}
                      >
                        <h4 className="font-medium text-gray-900">{location.name}</h4>
                        <p className="text-sm text-gray-600 mt-1">{location.address}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {location.foodTypes.map(type => {
                            const option = FOOD_TYPE_OPTIONS.find(opt => opt.value === type);
                            return (
                              <span 
                                key={type}
                                className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-semar-green/10 text-semar-green"
                              >
                                {option?.label || type}
                              </span>
                            );
                          })}
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-semar-blue/10 text-semar-blue">
                            {PRICE_RANGE_OPTIONS.find(opt => opt.value === location.priceRange)?.label || location.priceRange}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4 text-gray-500">
                      Tidak ada lokasi yang ditemukan
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-2">
              <div className="bg-white p-4 rounded-lg shadow-md h-[600px]">
                {mapLoaded ? (
                  <div ref={mapContainer} className="w-full h-full rounded-lg" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
                    <div className="text-center">
                      <MapPin className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600">Untuk melihat peta, masukkan Mapbox token</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FoodFinder;
