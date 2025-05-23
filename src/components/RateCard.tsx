
import { ShippingRate } from "@/types/shipping";

interface RateCardProps {
  rate: ShippingRate;
  route: string;
}

const RateCard = ({ rate, route }: RateCardProps) => {
  const routeMap: Record<string, string> = {
    "YGN-BKK": "ရန်ကုန် - ဘန်ကောက်",
    "MWD-BKK": "မြဝတီ - ဘန်ကောက်",
    "MDY-BKK": "မန္တလေး - ဘန်ကောက်",
    "HPA-BKK": "ဘားအံ - ဘန်ကောက်"
  };

  const typeMap: Record<string, string> = {
    "Food": "အစားအသောက်",
    "Cosmetic": "အလှကုန်ပစ္စည်း",
    "Electronic": "အီလက်ထရောနစ်"
  };

  return (
    <div className="rate-card rounded-xl shadow-md p-5 hover:shadow-xl">
      <div className="flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <span className="font-bold text-2xl">{rate.Kg} {rate.type !== "Electronic" ? "Kg" : ""}</span>
          <div className="flex space-x-2">
            <span className="route-badge">{routeMap[route] || route}</span>
            {rate.type && <span className="type-badge">{typeMap[rate.type] || rate.type}</span>}
          </div>
        </div>
        
        {/* Regular rate information */}
        {rate.BKK && (
          <div className="grid grid-cols-2 gap-2 mb-2">
            <div className="text-gray-600">ဘန်ကောက်:</div>
            <div className="font-semibold text-right price-badge">{rate.BKK}</div>
          </div>
        )}
        
        {rate.OtherCity && (
          <div className="grid grid-cols-2 gap-2 mb-2">
            <div className="text-gray-600">အခြားမြို့များ:</div>
            <div className="font-semibold text-right text-amber-600">{rate.OtherCity}</div>
          </div>
        )}
        
        {rate.RemoteArea && (
          <div className="grid grid-cols-2 gap-2 mb-2">
            <div className="text-gray-600">ဝေးလံဒေသ:</div>
            <div className="font-semibold text-right text-red-500">{rate.RemoteArea}</div>
          </div>
        )}
        
        {/* Electronics rate information */}
        {rate.New && (
          <div className="grid grid-cols-2 gap-2 mb-2">
            <div className="text-gray-600">အသစ်:</div>
            <div className="font-semibold text-right price-badge">{rate.New}</div>
          </div>
        )}
        
        {rate.Used && (
          <div className="grid grid-cols-2 gap-2 mb-2">
            <div className="text-gray-600">အသုံးပြုပြီး:</div>
            <div className="font-semibold text-right text-amber-600">{rate.Used}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RateCard;
