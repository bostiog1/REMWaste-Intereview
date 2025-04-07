import { useState, useEffect } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import useFetchSkips from "../hooks/useFetchSkips";
import SkipCard from "./SkipCard";
import { Skip } from "../types/skip.types";
import LoadingState from "./Loading";
import ErrorState from "./Error";

const SKIP_API_URL =
  "https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft";

function SkipSizeSelector() {
  const { data: skipsFromApi, loading, error } = useFetchSkips(SKIP_API_URL);
  const [selectedSkip, setSelectedSkip] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [isHeaderSticky, setIsHeaderSticky] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsHeaderSticky(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredSkips = (skips: Skip[] | null): Skip[] => {
    if (!skips) return [];
    return skips.filter((skip) => {
      if (filter === "all") return true;
      if (filter === "home" && skip.size <= 6) return true;
      if (filter === "garden" && skip.size <= 8) return true;
      if (filter === "construction" && skip.size >= 8) return true;
      if (filter === "commercial" && skip.size >= 10) return true;
      return false;
    });
  };

  const selectedSkipDetails = skipsFromApi?.find(
    (skip) => skip.id === selectedSkip
  );

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  const filterOptions = [
    { id: "all", label: "All Sizes" },
    { id: "home", label: "Home Renovation" },
    { id: "garden", label: "Garden Waste" },
    { id: "construction", label: "Construction" },
    { id: "commercial", label: "Commercial" },
  ];

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-6xl mb-8">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
              1
            </div>
            <div className="ml-3">
              <p className="font-semibold text-lg">Skip Size</p>
              <p className="text-sm text-gray-400">Choose your skip</p>
            </div>
          </div>
          <div className="hidden md:block h-1 flex-1 mx-4 bg-gray-700 relative">
            <div className="h-full w-1/4 bg-blue-600 absolute left-0 top-0 rounded-full"></div>
          </div>
          <div className="flex items-center mb-4 md:mb-0 opacity-50">
            <div className="w-10 h-10 rounded-full bg-gray-700 text-white flex items-center justify-center font-bold">
              2
            </div>
            <div className="ml-3">
              <p className="font-semibold text-lg">Delivery</p>
              <p className="text-sm text-gray-400">Schedule delivery</p>
            </div>
          </div>
          <div className="hidden md:block h-1 flex-1 mx-4 bg-gray-700"></div>
          <div className="flex items-center opacity-50">
            <div className="w-10 h-10 rounded-full bg-gray-700 text-white flex items-center justify-center font-bold">
              3
            </div>
            <div className="ml-3">
              <p className="font-semibold text-lg">Payment</p>
              <p className="text-sm text-gray-400">Complete order</p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
          Choose Your Skip Size
        </h1>
        <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
          Select the perfect skip size for your project. Our range of skip sizes
          ensures you'll find the right fit for your waste removal needs.
        </p>

        <div className="flex flex-wrap justify-center gap-3 mt-6">
          {filterOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => setFilter(option.id)}
              className={`cursor-pointer px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                filter === option.id
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                  : "bg-gray-800 hover:bg-gray-700 text-gray-300 hover:shadow-md"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {isHeaderSticky && selectedSkipDetails && (
        <div className="fixed top-0 left-0 right-0 bg-gray-900/95 backdrop-blur-sm z-50 shadow-lg transition-all duration-300 border-b border-gray-800 transform">
          <div className="container mx-auto px-4 py-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
            <div className="flex flex-col sm:flex-row sm:items-center">
              <span className="font-bold mr-2 text-blue-400">Selected:</span>
              <span className="text-white font-medium">
                {selectedSkipDetails.size} Yard Skip
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center">
              <span className="text-blue-500 font-bold text-lg sm:text-xl sm:mr-4">
                <span className="text-gray-300">Total: </span>£
                {selectedSkipDetails?.price}
              </span>
              <button className="mt-2 sm:mt-0 px-5 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 flex items-center text-sm font-medium">
                Continue to Delivery <ArrowRight size={16} className="ml-2" />
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {filteredSkips(skipsFromApi).map((skip) => (
          <SkipCard
            key={skip.id}
            skip={skip}
            isSelected={selectedSkip === skip.id}
            onSelect={setSelectedSkip}
          />
        ))}
      </div>

      <div className="w-full max-w-6xl mt-4 mb-6 text-sm text-gray-400">
        Showing {filteredSkips(skipsFromApi).length} skip{" "}
        {filteredSkips(skipsFromApi).length === 1 ? "option" : "options"}
      </div>

      <div className="w-full max-w-6xl mt-6 mb-12 flex items-center justify-between">
        <button className="px-6 py-3 rounded-md bg-gray-800 text-white hover:bg-gray-700 flex items-center transition-all duration-200">
          <ChevronLeft size={18} className="mr-2" /> Back
        </button>
        <button
          className={`px-6 py-3 rounded-md flex items-center group font-medium transition-all duration-200 ${
            selectedSkip
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-700 text-gray-300 cursor-not-allowed"
          }`}
          disabled={!selectedSkip}
        >
          Continue to Delivery
          <ChevronRight
            size={18}
            className="ml-2 group-hover:translate-x-1 transition-transform"
          />
        </button>
      </div>
    </div>
  );
}

export default SkipSizeSelector;
