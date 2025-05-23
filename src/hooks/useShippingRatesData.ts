
import { useState, useEffect } from "react";
import { database } from "@/services/firebase";
import { ref, get } from "firebase/database";
import { toast } from "sonner";
import { ShippingRate, ShippingRatesData } from "@/types/shipping";
import { defaultRates } from "@/data/defaultRates";

export const useShippingRatesData = () => {
  const [rates, setRates] = useState<ShippingRatesData>(defaultRates);
  const [loading, setLoading] = useState<boolean>(true);
  const [route, setRoute] = useState<string>("YGN-BKK");
  const [type, setType] = useState<string>("all");
  const [weightSearch, setWeightSearch] = useState<string>("");
  const [filteredRates, setFilteredRates] = useState<ShippingRate[]>([]);

  // Fetch rates from Firebase
  useEffect(() => {
    const fetchRates = async () => {
      setLoading(true);
      try {
        const shippingRatesRef = ref(database, 'shippingRates');
        const snapshot = await get(shippingRatesRef);
        
        if (snapshot.exists()) {
          const firebaseRates = snapshot.val();
          setRates(firebaseRates);
          toast.success("Firebase ဒေတာများ ရယူပြီးပါပြီ");
        } else {
          console.log("No data available in Firebase, using default rates");
          // Using default rates which are already set in the initial state
        }
      } catch (error) {
        console.error("Error fetching rates:", error);
        toast.error("Firebase ဒေတာများ ရယူရာတွင် အမှားရှိနေပါသည်");
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, []);

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
          const typeRates = routeData[type as keyof typeof routeData];
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

  return {
    rates,
    loading,
    filteredRates,
    route,
    setRoute,
    type,
    setType,
    weightSearch,
    setWeightSearch
  };
};
