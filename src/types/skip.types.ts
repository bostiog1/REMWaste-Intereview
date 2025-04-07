export interface Skip {
  id: number;
  size: number;
  price: string; // Price after VAT
  hirePeriod: number;
  capacity: string;
  suitableFor: string;
  warnings: string[];
  allowed_on_road: boolean;
  allows_heavy_waste: boolean;
  price_before_vat?: number; // Optional, but good to keep if needed
  vat?: number; // Optional, but good to keep if needed
}
