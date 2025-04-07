import { ArrowRight, AlertTriangle, Check, Info } from "lucide-react";
import Image from "../assets/REMWaste.jpg";
import { Skip } from "../types/skip.types";

interface SkipCardProps {
  skip: Skip;
  isSelected: boolean;
  onSelect: (id: number) => void;
}

const SkipCard: React.FC<SkipCardProps> = ({ skip, isSelected, onSelect }) => {
  const isHeavyWasteWarning = skip.warnings.includes(
    "Not Suitable for Heavy Waste"
  );

  const handleCardClick = () => {
    if (!isHeavyWasteWarning) {
      onSelect(skip.id);
    }
  };

  // Create color-coding for skip sizes
  const getSizeColor = (size: number) => {
    if (size <= 4) return "bg-green-600";
    if (size <= 8) return "bg-blue-600";
    return "bg-purple-600";
  };

  return (
    <div
      className={`rounded-lg overflow-hidden border transition-all duration-300 ${
        isSelected
          ? "border-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.4)] transform scale-102"
          : "border-gray-700 hover:border-gray-500 hover:shadow-lg"
      } ${
        isHeavyWasteWarning
          ? "opacity-60 cursor-not-allowed bg-gray-800/80"
          : "cursor-pointer bg-gray-800"
      }`}
      tabIndex={isHeavyWasteWarning ? -1 : 0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          if (!isHeavyWasteWarning) {
            onSelect(skip.id);
            e.preventDefault();
          }
        }
      }}
      onClick={handleCardClick}
      aria-disabled={isHeavyWasteWarning}
    >
      <div className="relative">
        {/* Skip image */}
        <img
          src={Image}
          alt={`${skip.size} Yard Skip`}
          className={`w-full h-48 object-cover transition-all duration-300 ${
            isSelected ? "brightness-110" : "brightness-100"
          }`}
          width={400}
          height={200}
        />

        {/* Size badge */}
        <div
          className={`absolute top-3 right-3 ${getSizeColor(
            skip.size
          )} text-white px-3 py-1 rounded-md font-medium shadow-lg`}
        >
          {skip.size} Yards
        </div>

        {/* Selected badge */}
        {isSelected && (
          <div className="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1 rounded-md font-medium flex items-center shadow-lg">
            <Check size={16} className="mr-1" /> Selected
          </div>
        )}

        {/* Capacity visualization */}
        <div className="absolute bottom-3 left-3 right-3 bg-gray-900/70 backdrop-blur-sm p-2 rounded-md">
          <div className="flex justify-between text-xs text-white mb-1">
            <span>Capacity</span>
            <span>{skip.capacity}</span>
          </div>
          <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 rounded-full"
              style={{ width: `${Math.min(skip.size * 10, 100)}%` }}
            ></div>
          </div>
        </div>

        {/* Warnings */}
        {skip.warnings.length > 0 && (
          <div className="absolute -bottom-1 left-0 w-full bg-amber-950/80 backdrop-blur-sm p-2 rounded-t-md border-t border-x border-amber-900/60 text-white text-xs">
            {skip.warnings.map((warning, index) => (
              <div key={index} className="flex items-center mb-1 last:mb-0">
                <AlertTriangle
                  size={14}
                  className="mr-1 flex-shrink-0 text-amber-400"
                />
                <span
                  className={
                    warning === "Not Suitable for Heavy Waste"
                      ? "text-red-400 font-medium"
                      : warning === "Private Property Only"
                      ? "text-amber-400 font-medium"
                      : "text-white"
                  }
                >
                  {warning}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-5">
        <h3 className="text-xl font-bold flex items-center">
          {skip.size} Yard Skip
          {skip.allows_heavy_waste && (
            <span className="ml-2 bg-green-900/60 text-green-400 text-xs px-2 py-1 rounded-full">
              Heavy Waste
            </span>
          )}
        </h3>

        {/* Features list */}
        <div className="mt-3 text-gray-300 text-sm grid gap-2">
          <div className="flex items-start">
            <Info
              size={16}
              className="mr-2 text-blue-400 mt-0.5 flex-shrink-0"
            />
            <p>
              <span className="text-gray-200 font-medium">Suitable for: </span>
              {skip.suitableFor}
            </p>
          </div>
          <div className="flex items-center">
            <span className="w-4 h-4 flex items-center justify-center rounded-full bg-blue-900/50 text-blue-400 mr-2 flex-shrink-0">
              <Check size={12} />
            </span>
            <span>{skip.hirePeriod} day hire period</span>
          </div>
          {skip.allowed_on_road && (
            <div className="flex items-center">
              <span className="w-4 h-4 flex items-center justify-center rounded-full bg-blue-900/50 text-blue-400 mr-2 flex-shrink-0">
                <Check size={12} />
              </span>
              <span>Allowed on road</span>
            </div>
          )}
        </div>

        {/* Pricing */}
        <div className="mt-4 flex justify-between items-end">
          <div>
            <span className="text-blue-500 text-2xl font-bold">
              £{((parseFloat(skip.price) / skip.hirePeriod) * 7).toFixed(2)}
            </span>
            <span className="text-gray-400 text-sm ml-1">per week</span>
          </div>
          <div className="text-right">
            <span className="text-gray-400 text-xs block">Total</span>
            <span className="text-white font-semibold">£{skip.price}</span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (!isHeavyWasteWarning) {
              onSelect(skip.id);
            }
          }}
          className={`w-full mt-4 py-3 rounded-md flex items-center justify-center font-medium transition-all duration-200 ${
            isSelected
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-700 text-white hover:bg-gray-600"
          } ${isHeavyWasteWarning ? "cursor-not-allowed" : ""}`}
          disabled={isHeavyWasteWarning}
        >
          {isSelected ? (
            <>
              <Check size={18} className="mr-2" /> Selected
            </>
          ) : (
            <>
              Select This Skip <ArrowRight size={18} className="ml-2" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default SkipCard;
