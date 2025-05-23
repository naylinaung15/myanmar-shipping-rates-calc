
import React from "react";
import { ShippingRate } from "@/types/shipping";
import { 
  AlertDialog, 
  AlertDialogContent, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel
} from "@/components/ui/alert-dialog";

interface ConfirmationDialogProps {
  showConfirmDialog: boolean;
  setShowConfirmDialog: (value: boolean) => void;
  editingRate: ShippingRate | null;
  editData: Record<string, string>;
  getFieldLabel: (key: string) => string;
  handleSave: () => Promise<void>;
}

const ConfirmationDialog = ({
  showConfirmDialog,
  setShowConfirmDialog,
  editingRate,
  editData,
  getFieldLabel,
  handleSave
}: ConfirmationDialogProps) => {
  return (
    <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>နှုန်းထား ပြင်ဆင်ခြင်းအား အတည်ပြုပါ</AlertDialogTitle>
        </AlertDialogHeader>
        <div className="py-4">
          <p>အောက်ပါနှုန်းထားများကို ပြင်ဆင်ရန် သေချာပါသလား?</p>
          
          {editingRate && (
            <div className="mt-4 p-4 bg-gray-100 rounded-md">
              <div className="font-bold mb-2">
                {editingRate.Kg} Kg - {editingRate.type === "Food" ? "အစားအသောက်" : 
                                      editingRate.type === "Cosmetic" ? "အလှကုန်ပစ္စည်း" : "အီလက်ထရောနစ်"}
              </div>
              
              {Object.entries(editData).map(([key, value]) => {
                if (key === 'type' || key === 'Kg') return null;
                
                // Compare with original value
                const originalValue = (editingRate as any)[key];
                const hasChanged = originalValue !== value;
                
                return (
                  <div key={key} className="grid grid-cols-2 gap-2 mb-2">
                    <div>{getFieldLabel(key)}:</div>
                    <div className={`font-semibold ${hasChanged ? "text-blue-600" : ""}`}>
                      {hasChanged ? (
                        <>
                          <span className="line-through text-gray-400 mr-2">{originalValue}</span>
                          {value}
                        </>
                      ) : value}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>ပယ်ဖျက်မည်</AlertDialogCancel>
          <AlertDialogAction onClick={handleSave}>သေချာပါသည်</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmationDialog;
