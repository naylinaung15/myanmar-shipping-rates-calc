
import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface FilterControlsProps {
  route: string;
  setRoute: (route: string) => void;
  type: string;
  setType: (type: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const FilterControls = ({
  route,
  setRoute,
  type,
  setType,
  searchQuery,
  setSearchQuery
}: FilterControlsProps) => {
  return (
    <>
      {/* Route and type selector */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-white mb-2">လမ်းကြောင်း ရွေးချယ်ရန်</label>
          <select 
            className="w-full p-2 rounded-md bg-white/90"
            value={route}
            onChange={(e) => setRoute(e.target.value)}
          >
            <option value="YGN-BKK">ရန်ကုန် - ဘန်ကောက်</option>
            <option value="MWD-BKK">မြဝတီ - ဘန်ကောက်</option>
            <option value="MDY-BKK">မန္တလေး - ဘန်ကောက်</option>
            <option value="HPA-BKK">ဘားအံ - ဘန်ကောက်</option>
          </select>
        </div>
        <div>
          <label className="block text-white mb-2">ပစ္စည်းအမျိုးအစား ရွေးချယ်ရန်</label>
          <select 
            className="w-full p-2 rounded-md bg-white/90"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="all">အားလုံး</option>
            <option value="Food">အစားအသောက်</option>
            <option value="Cosmetic">အလှကုန်ပစ္စည်း</option>
            <option value="Electronic">အီလက်ထရောနစ်</option>
          </select>
        </div>
      </div>
      
      {/* Search box */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            type="text"
            placeholder="နှုန်းထားများ ရှာရန်..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white/90 border-2 border-transparent transition-all duration-300 focus:bg-white focus:border-primary focus:outline-none shadow"
          />
        </div>
      </div>
    </>
  );
};

export default FilterControls;
