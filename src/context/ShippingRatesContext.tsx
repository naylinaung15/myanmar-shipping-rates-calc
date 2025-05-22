
import { createContext, useContext, useState, ReactNode, useEffect } from "react";

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

type ShippingRatesContextType = {
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

// Define our default rates data
const defaultRates: ShippingRatesData = {
  "YGN-BKK": {
    "Food": [
      {"Kg": "1", "BKK": "75", "OtherCity": "85", "RemoteArea": "90", "type": "Food"},
      {"Kg": "2", "BKK": "140", "OtherCity": "160", "RemoteArea": "170", "type": "Food"},
      {"Kg": "3", "BKK": "210", "OtherCity": "240", "RemoteArea": "255", "type": "Food"},
      {"Kg": "4", "BKK": "280", "OtherCity": "320", "RemoteArea": "340", "type": "Food"},
      {"Kg": "5", "BKK": "350", "OtherCity": "400", "RemoteArea": "425", "type": "Food"},
      {"Kg": "10", "BKK": "700", "OtherCity": "800", "RemoteArea": "850", "type": "Food"},
      {"Kg": "20", "BKK": "1240", "OtherCity": "1440", "RemoteArea": "1540", "type": "Food"},
      {"Kg": "30", "BKK": "1500", "OtherCity": "1800", "RemoteArea": "1950", "type": "Food"},
      {"Kg": "30-40", "BKK": "45/kg", "OtherCity": "55/kg", "RemoteArea": "60/kg", "type": "Food"},
      {"Kg": "40-50", "BKK": "43/kg", "OtherCity": "53/kg", "RemoteArea": "58/kg", "type": "Food"},
      {"Kg": "50-70", "BKK": "40/kg", "OtherCity": "50/kg", "RemoteArea": "55/kg", "type": "Food"},
      {"Kg": "70-100", "BKK": "35/kg", "OtherCity": "45/kg", "RemoteArea": "50/kg", "type": "Food"},
      {"Kg": "100", "BKK": "33/kg", "OtherCity": "43/kg", "RemoteArea": "48/kg", "type": "Food"}
    ],
    "Cosmetic": [
      {"Kg": "1", "BKK": "70", "OtherCity": "80", "RemoteArea": "85", "type": "Cosmetic"},
      {"Kg": "2", "BKK": "160", "OtherCity": "180", "RemoteArea": "190", "type": "Cosmetic"},
      {"Kg": "3", "BKK": "240", "OtherCity": "270", "RemoteArea": "285", "type": "Cosmetic"},
      {"Kg": "4", "BKK": "320", "OtherCity": "360", "RemoteArea": "380", "type": "Cosmetic"},
      {"Kg": "5", "BKK": "400", "OtherCity": "450", "RemoteArea": "475", "type": "Cosmetic"},
      {"Kg": "10", "BKK": "800", "OtherCity": "900", "RemoteArea": "950", "type": "Cosmetic"},
      {"Kg": "20", "BKK": "1600", "OtherCity": "1800", "RemoteArea": "1900", "type": "Cosmetic"},
      {"Kg": "30", "BKK": "2700", "OtherCity": "3000", "RemoteArea": "3150", "type": "Cosmetic"},
      {"Kg": "30-50", "BKK": "75/kg", "OtherCity": "85/kg", "RemoteArea": "90/kg", "type": "Cosmetic"},
      {"Kg": "50-100", "BKK": "70/kg", "OtherCity": "80/kg", "RemoteArea": "85/kg", "type": "Cosmetic"},
      {"Kg": "100", "BKK": "65/kg", "OtherCity": "75/kg", "RemoteArea": "80/kg", "type": "Cosmetic"}
    ],
    "Electronic": [
      {"Kg": "1", "BKK": "800", "Used": "500", "type": "Electronic"},
      {"Kg": "2", "BKK": "900", "Used": "700", "type": "Electronic"},
      {"Kg": "3", "BKK": "1800", "Used": "1400", "type": "Electronic"},
      {"Kg": "4", "BKK": "2000", "Used": "1600", "type": "Electronic"},
      {"Kg": "5", "BKK": "2500", "Used": "2000", "type": "Electronic"},
      {"Kg": "5-10", "BKK": "3800", "Used": "3200", "type": "Electronic"}
    ]
  },
  "MWD-BKK": {
    "Food": [
      {"Kg": "1", "BKK": "75", "OtherCity": "85", "RemoteArea": "90", "type": "Food"},
      {"Kg": "5", "BKK": "298", "OtherCity": "348", "RemoteArea": "373", "type": "Food"},
      {"Kg": "10", "BKK": "595", "OtherCity": "695", "RemoteArea": "745", "type": "Food"},
      {"Kg": "30", "BKK": "1275", "OtherCity": "1575", "RemoteArea": "1725", "type": "Food"},
      {"Kg": "30 - 40", "BKK": "38/kg", "OtherCity": "48/kg", "RemoteArea": "53/kg", "type": "Food"}
    ],
    "Cosmetic": [
      {"Kg": "1", "BKK": "70", "OtherCity": "80", "RemoteArea": "85", "type": "Cosmetic"},
      {"Kg": "5", "BKK": "340", "OtherCity": "390", "RemoteArea": "415", "type": "Cosmetic"},
      {"Kg": "10", "BKK": "680", "OtherCity": "780", "RemoteArea": "830", "type": "Cosmetic"},
      {"Kg": "30", "BKK": "2295", "OtherCity": "2595", "RemoteArea": "2745", "type": "Cosmetic"},
      {"Kg": "30 - 50", "BKK": "64/kg", "OtherCity": "74/kg", "RemoteArea": "79/kg", "type": "Cosmetic"}
    ],
    "Electronic": [
      {"Kg": "1", "BKK": "680", "Used": "425", "type": "Electronic"},
      {"Kg": "5", "BKK": "2125", "Used": "1700", "type": "Electronic"}
    ]
  },
  "MDY-BKK": {
    "Food": [
      {"Kg": "1", "BKK": "85", "OtherCity": "95", "RemoteArea": "100", "type": "Food"},
      {"Kg": "5", "BKK": "400", "OtherCity": "450", "RemoteArea": "475", "type": "Food"},
      {"Kg": "10", "BKK": "800", "OtherCity": "900", "RemoteArea": "950", "type": "Food"},
      {"Kg": "30", "BKK": "1800", "OtherCity": "2100", "RemoteArea": "2250", "type": "Food"},
      {"Kg": "30-40", "BKK": "55/kg", "OtherCity": "65/kg", "RemoteArea": "70/kg", "type": "Food"}
    ],
    "Cosmetic": [
      {"Kg": "1", "BKK": "80", "OtherCity": "90", "RemoteArea": "95", "type": "Cosmetic"},
      {"Kg": "5", "BKK": "450", "OtherCity": "500", "RemoteArea": "525", "type": "Cosmetic"},
      {"Kg": "10", "BKK": "900", "OtherCity": "1000", "RemoteArea": "1050", "type": "Cosmetic"},
      {"Kg": "30", "BKK": "3000", "OtherCity": "3300", "RemoteArea": "3450", "type": "Cosmetic"},
      {"Kg": "30-50", "BKK": "85/kg", "OtherCity": "95/kg", "RemoteArea": "100/kg", "type": "Cosmetic"}
    ],
    "Electronic": [
      {"Kg": "1", "BKK": "880", "Used": "550", "type": "Electronic"},
      {"Kg": "5", "BKK": "2750", "Used": "2200", "type": "Electronic"}
    ]
  },
  "HPA-BKK": {
    "Food": [
      {"Kg": "1", "BKK": "75", "OtherCity": "85", "RemoteArea": "90", "type": "Food"},
      {"Kg": "5", "BKK": "315", "OtherCity": "365", "RemoteArea": "390", "type": "Food"},
      {"Kg": "10", "BKK": "630", "OtherCity": "730", "RemoteArea": "780", "type": "Food"},
      {"Kg": "30", "BKK": "1350", "OtherCity": "1650", "RemoteArea": "1800", "type": "Food"},
      {"Kg": "30 - 40", "BKK": "41/kg", "OtherCity": "51/kg", "RemoteArea": "56/kg", "type": "Food"}
    ],
    "Cosmetic": [
      {"Kg": "1", "BKK": "70", "OtherCity": "80", "RemoteArea": "85", "type": "Cosmetic"},
      {"Kg": "5", "BKK": "360", "OtherCity": "410", "RemoteArea": "435", "type": "Cosmetic"},
      {"Kg": "10", "BKK": "720", "OtherCity": "820", "RemoteArea": "870", "type": "Cosmetic"},
      {"Kg": "30", "BKK": "2430", "OtherCity": "2730", "RemoteArea": "2880", "type": "Cosmetic"},
      {"Kg": "30-50", "BKK": "68/kg", "OtherCity": "78/kg", "RemoteArea": "83/kg", "type": "Cosmetic"}
    ],
    "Electronic": [
      {"Kg": "1", "New": "720", "Used": "450", "type": "Electronic"},
      {"Kg": "5", "New": "2250", "Used": "1800", "type": "Electronic"}
    ]
  }
};

const ShippingRatesContext = createContext<ShippingRatesContextType | null>(null);

export const ShippingRatesProvider = ({ children }: { children: ReactNode }) => {
  const [rates, setRates] = useState<ShippingRatesData>(defaultRates);
  const [loading, setLoading] = useState<boolean>(false);
  const [route, setRoute] = useState<string>("YGN-BKK");
  const [type, setType] = useState<string>("all");
  const [weightSearch, setWeightSearch] = useState<string>("");
  const [filteredRates, setFilteredRates] = useState<ShippingRate[]>([]);

  // Filter rates based on route, type, and weight search
  useEffect(() => {
    setLoading(true);
    
    let results: ShippingRate[] = [];
    
    try {
      const routeData = rates[route];
      
      if (routeData) {
        if (type === "all") {
          // Include all types
          Object.values(routeData).forEach(typeRates => {
            results = [...results, ...typeRates];
          });
        } else {
          // Filter by specific type
          const typeRates = routeData[type as keyof ShippingRouteData];
          if (typeRates) {
            results = [...typeRates];
          }
        }
        
        // Filter by weight if search term provided
        if (weightSearch) {
          results = results.filter(rate => {
            return rate.Kg.toLowerCase().includes(weightSearch.toLowerCase());
          });
        }
      }
    } catch (error) {
      console.error("Error filtering rates:", error);
    }
    
    setFilteredRates(results);
    setLoading(false);
  }, [rates, route, type, weightSearch]);

  return (
    <ShippingRatesContext.Provider
      value={{
        rates,
        loading,
        filteredRates,
        route,
        setRoute,
        type,
        setType,
        weightSearch,
        setWeightSearch
      }}
    >
      {children}
    </ShippingRatesContext.Provider>
  );
};

export const useShippingRates = () => {
  const context = useContext(ShippingRatesContext);
  if (!context) {
    throw new Error("useShippingRates must be used within a ShippingRatesProvider");
  }
  return context;
};
