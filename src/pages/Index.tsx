
import { ShippingRatesProvider } from "@/context/ShippingRatesContext";
import Header from "@/components/Header";
import SearchFilters from "@/components/SearchFilters";
import ResultsDisplay from "@/components/ResultsDisplay";

const Index = () => {
  return (
    <div className="min-h-screen pb-10 bg-gradient">
      <ShippingRatesProvider>
        <div className="container mx-auto px-4">
          <Header />
          
          <SearchFilters />
          
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-6 section-title text-white">
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                နှုန်းထားများ
              </span>
            </h2>
          </div>
          
          <ResultsDisplay />
        </div>
      </ShippingRatesProvider>
    </div>
  );
};

export default Index;
