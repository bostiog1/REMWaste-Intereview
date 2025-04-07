import { Skip } from "../types/skip.types";

export const getCapacityEstimate = (size: number): string => {
  switch (size) {
    case 4:
      return "40-50 black bags";
    case 6:
      return "60-70 black bags";
    case 8:
      return "80-90 black bags";
    case 10:
      return "100-120 black bags";
    case 12:
      return "120-140 black bags";
    case 20:
      return "200+ black bags";
    default:
      return "Capacity information not available";
  }
};

export const getSuitabilityEstimate = (size: number): string => {
  switch (size) {
    case 4:
      return "Small home renovations, garden clearance";
    case 6:
      return "Bathroom renovation, medium garden projects";
    case 8:
      return "Large home renovations, garage clearance";
    case 10:
      return "Commercial projects, large renovations";
    case 12:
      return "Major construction, commercial clearance";
    case 20:
      return "Very large projects, significant waste";
    default:
      return "Suitability information not available";
  }
};

export const getWarnings = (skip: Skip): string[] => {
  const warnings: string[] = [];
  if (!skip.allowed_on_road) {
    warnings.push("Private Property Only");
  }
  if (!skip.allows_heavy_waste && skip.size >= 10) {
    warnings.push("Not Suitable for Heavy Waste");
  }
  return warnings;
};
