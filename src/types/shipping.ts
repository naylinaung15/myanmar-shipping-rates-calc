
// Define types for our shipping rate data
export type ShippingRate = {
  Kg: string;
  BKK?: string;
  OtherCity?: string;
  RemoteArea?: string;
  type?: string;
  Used?: string;
  New?: string;
};

export type ShippingRouteData = {
  Food: ShippingRate[];
  Cosmetic: ShippingRate[];
  Electronic?: ShippingRate[];
};

export type ShippingRatesData = {
  [key: string]: ShippingRouteData;
};

export type ShippingRatesContextType = {
  rates: ShippingRatesData;
  loading: boolean;
  filteredRates: ShippingRate[];
  route: string;
  setRoute: (route: string) => void;
  type: string;
  setType: (type: string) => void;
  weightSearch: string;
  setWeightSearch: (weight: string) => void;
};
