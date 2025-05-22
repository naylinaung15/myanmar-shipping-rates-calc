
import { useShippingRates } from "@/context/ShippingRatesContext";

const SearchFilters = () => {
  const { route, setRoute, type, setType, weightSearch, setWeightSearch } = useShippingRates();

  return (
    <div className="glass-effect rounded-xl shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-bold mb-6 section-title text-white">
        <span className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          စစ်ထုတ်ကြည့်ရှုရန်
        </span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-white mb-2 font-medium" htmlFor="route-select">လမ်းကြောင်း</label>
          <select 
            id="route-select" 
            className="w-full p-3 rounded-lg bg-white/90 border-2 border-transparent transition-all duration-300 focus:bg-white focus:border-primary focus:outline-none shadow" 
            onChange={(e) => setRoute(e.target.value)}
            value={route}
          >
            <option value="YGN-BKK">ရန်ကုန် - ဘန်ကောက်</option>
            <option value="MWD-BKK">မြဝတီ - ဘန်ကောက်</option>
            <option value="MDY-BKK">မန္တလေး - ဘန်ကောက်</option>
            <option value="HPA-BKK">ဘားအံ - ဘန်ကောက်</option>
          </select>
        </div>
        
        <div>
          <label className="block text-white mb-2 font-medium" htmlFor="type-select">ပစ္စည်းအမျိုးအစား</label>
          <select 
            id="type-select" 
            className="w-full p-3 rounded-lg bg-white/90 border-2 border-transparent transition-all duration-300 focus:bg-white focus:border-primary focus:outline-none shadow"
            onChange={(e) => setType(e.target.value)}
            value={type}
          >
            <option value="all">အားလုံး</option>
            <option value="Food">အစားအသောက်</option>
            <option value="Cosmetic">အလှကုန်ပစ္စည်း</option>
            <option value="Electronic">အီလက်ထရောနစ်</option>
          </select>
        </div>
        
        <div>
          <label className="block text-white mb-2 font-medium" htmlFor="weight-search">အလေးချိန်ရှာဖွေရန်</label>
          <input 
            type="text" 
            id="weight-search" 
            placeholder="အလေးချိန် ရိုက်ထည့်ပါ..." 
            className="w-full p-3 rounded-lg bg-white/90 border-2 border-transparent transition-all duration-300 focus:bg-white focus:border-primary focus:outline-none shadow"
            onChange={(e) => setWeightSearch(e.target.value)}
            value={weightSearch}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
