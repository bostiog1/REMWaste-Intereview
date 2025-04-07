export interface Skip {
  id: number;
  size: number;
  price: string;
  hirePeriod: number;
  capacity: string;
  suitableFor: string;
  warnings: string[];
  allowed_on_road: boolean;
  allows_heavy_waste: boolean;
  price_before_vat?: number;
  vat?: number;
}
