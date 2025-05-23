
import React from "react";
import { ShippingRate } from "@/types/shipping";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from "@/components/ui/table";

interface ShippingRateTableProps {
  loading: boolean;
  displayRates: ShippingRate[];
  handleEditClick: (rate: ShippingRate) => void;
}

const ShippingRateTable = ({ 
  loading, 
  displayRates, 
  handleEditClick 
}: ShippingRateTableProps) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden">
      {loading ? (
        <div className="flex justify-center items-center p-8">
          <div className="w-10 h-10 rounded-full border-4 border-primary/10 border-l-primary animate-spin"></div>
          <span className="ml-4 text-gray-700">ဒေတာများ ရယူနေသည်...</span>
        </div>
      ) : displayRates.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Kg</TableHead>
              <TableHead>အမျိုးအစား</TableHead>
              <TableHead>နှုန်းထား</TableHead>
              <TableHead className="text-right">လုပ်ဆောင်ချက်</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayRates.map((rate, index) => (
              <TableRow key={`${rate.type}-${rate.Kg}-${index}`}>
                <TableCell className="font-medium">{rate.Kg}</TableCell>
                <TableCell>
                  {rate.type === "Food" && "အစားအသောက်"}
                  {rate.type === "Cosmetic" && "အလှကုန်ပစ္စည်း"}
                  {rate.type === "Electronic" && "အီလက်ထရောနစ်"}
                </TableCell>
                <TableCell>
                  {rate.BKK && <div>ဘန်ကောက်: {rate.BKK}</div>}
                  {rate.OtherCity && <div>အခြားမြို့များ: {rate.OtherCity}</div>}
                  {rate.RemoteArea && <div>ဝေးလံဒေသ: {rate.RemoteArea}</div>}
                  {rate.New && <div>အသစ်: {rate.New}</div>}
                  {rate.Used && <div>အသုံးပြုပြီး: {rate.Used}</div>}
                </TableCell>
                <TableCell className="text-right">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex items-center"
                    onClick={() => handleEditClick(rate)}
                  >
                    <Edit size={14} className="mr-1" />
                    ပြင်ဆင်ရန်
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="text-center p-8 text-gray-500">
          ရှာဖွေတွေ့ရှိမှုမရှိပါ
        </div>
      )}
    </div>
  );
};

export default ShippingRateTable;
