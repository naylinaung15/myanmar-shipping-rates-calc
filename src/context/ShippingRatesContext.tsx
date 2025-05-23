
import { createContext, useContext, ReactNode } from "react";
import { ShippingRatesContextType, ShippingRate } from "@/types/shipping";
import { useShippingRatesData } from "@/hooks/useShippingRatesData";

// Export the type definitions for use in other files
export type { ShippingRate };

const ShippingRatesContext = createContext<ShippingRatesContextType | null>(null);

export const ShippingRatesProvider = ({ children }: { children: ReactNode }) => {
  const shippingRatesData = useShippingRatesData();

  return (
    <ShippingRatesContext.Provider value={shippingRatesData}>
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
