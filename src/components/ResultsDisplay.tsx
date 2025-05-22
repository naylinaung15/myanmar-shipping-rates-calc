
import { useShippingRates } from "@/context/ShippingRatesContext";
import RateCard from "./RateCard";

const ResultsDisplay = () => {
  const { filteredRates, loading, route } = useShippingRates();

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="w-10 h-10 rounded-full border-4 border-primary/10 border-l-primary animate-spin"></div>
        <span className="ml-4 text-white text-lg">Firebase မှ ဒေတာများ ရယူနေသည်...</span>
      </div>
    );
  }

  if (filteredRates.length === 0) {
    return (
      <div className="glass-effect rounded-xl p-8 text-center text-white">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-xl font-bold mb-2">ရှာဖွေတွေ့ရှိမှုမရှိပါ</h3>
        <p className="text-white/70">သင့်ရှာဖွေမှုနှင့် ကိုက်ညီသော ရလဒ်များ မရှိပါ။ စစ်ထုတ်မှုကို ပြောင်းလဲကြည့်ပါ။</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredRates.map((rate, index) => (
        <RateCard key={`${route}-${rate.type}-${rate.Kg}-${index}`} rate={rate} route={route} />
      ))}
    </div>
  );
};

export default ResultsDisplay;
