
import React from "react";
import { ShippingRate } from "@/types/shipping";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetFooter 
} from "@/components/ui/sheet";
import { Save } from "lucide-react";

interface ShippingRateEditorProps {
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  editingRate: ShippingRate | null;
  editData: Record<string, string>;
  handleInputChange: (key: string, value: string) => void;
  handleSaveClick: () => void;
  getFieldLabel: (key: string) => string;
}

const ShippingRateEditor = ({
  isEditing,
  setIsEditing,
  editingRate,
  editData,
  handleInputChange,
  handleSaveClick,
  getFieldLabel
}: ShippingRateEditorProps) => {
  return (
    <Sheet open={isEditing} onOpenChange={setIsEditing}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>နှုန်းထား ပြင်ဆင်ရန်</SheetTitle>
        </SheetHeader>
        
        {editingRate && (
          <div className="mt-6 space-y-4">
            <div className="flex justify-between items-center mb-4">
              <div className="font-bold">
                {editingRate.Kg} Kg - {editingRate.type === "Food" ? "အစားအသောက်" : 
                                      editingRate.type === "Cosmetic" ? "အလှကုန်ပစ္စည်း" : "အီလက်ထရောနစ်"}
              </div>
            </div>
            
            {/* Edit form with clear Burmese labels */}
            {Object.entries(editData).map(([key, value]) => {
              // Skip type and Kg as they're not editable
              if (key === 'type' || key === 'Kg') return null;
              
              return (
                <div key={key} className="space-y-2">
                  <label className="block text-sm font-medium">
                    {getFieldLabel(key)}:
                  </label>
                  <Input 
                    type="text" 
                    value={value} 
                    onChange={(e) => handleInputChange(key, e.target.value)} 
                    className="bg-white border border-gray-300"
                  />
                </div>
              );
            })}
          </div>
        )}
        
        <SheetFooter className="mt-6">
          <Button variant="outline" onClick={() => setIsEditing(false)}>
            ပိတ်မည်
          </Button>
          <Button onClick={handleSaveClick}>
            <Save size={16} className="mr-2" />
            သိမ်းဆည်းမည်
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default ShippingRateEditor;
