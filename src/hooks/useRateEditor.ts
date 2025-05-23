
import { useState } from "react";
import { ShippingRate } from "@/types/shipping";
import { useShippingRates } from "@/context/ShippingRatesContext";
import { database } from "@/services/firebase";
import { ref, update } from "firebase/database";
import { toast } from "sonner";

export const useRateEditor = () => {
  const { rates, route } = useShippingRates();
  const [editingRate, setEditingRate] = useState<ShippingRate | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<Record<string, string>>({});
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  // Field label translations
  const getFieldLabel = (key: string) => {
    switch (key) {
      case 'BKK': return 'ဘန်ကောက်';
      case 'OtherCity': return 'အခြားမြို့များ';
      case 'RemoteArea': return 'ဝေးလံဒေသ';
      case 'New': return 'အသစ်';
      case 'Used': return 'အသုံးပြုပြီး';
      default: return key;
    }
  };

  const handleEditClick = (rate: ShippingRate) => {
    const initialData: Record<string, string> = {};
    
    // Add all properties to the edit data
    Object.entries(rate).forEach(([key, value]) => {
      if (typeof value === 'string') {
        initialData[key] = value;
      }
    });
    
    setEditData(initialData);
    setEditingRate(rate);
    setIsEditing(true);
  };

  const handleInputChange = (key: string, value: string) => {
    setEditData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSaveClick = () => {
    // Show confirmation dialog
    setShowConfirmDialog(true);
  };

  const handleSave = async () => {
    if (!editingRate || !route) return;
    
    try {
      const updatedRate = { ...editingRate };
      
      // Update each key in the rate with the edited values
      Object.keys(editData).forEach(key => {
        if (key !== 'type' && key !== 'Kg') { // Don't modify type and Kg keys
          (updatedRate as any)[key] = editData[key];
        }
      });
      
      // Find the rate in the original rates data
      const routeData = rates[route];
      if (!routeData) return;
      
      const typeData = routeData[editingRate.type as keyof typeof routeData];
      if (!Array.isArray(typeData)) return;
      
      // Find the index of the rate in the array
      const rateIndex = typeData.findIndex(r => r.Kg === editingRate.Kg && r.type === editingRate.type);
      if (rateIndex === -1) return;
      
      // Update the rate in Firebase
      const updatePath = `shippingRates/${route}/${editingRate.type}/${rateIndex}`;
      const updates: Record<string, any> = {};
      updates[updatePath] = updatedRate;
      
      await update(ref(database), updates);
      toast.success("နှုန်းထား အချက်အလက် ပြင်ဆင်မှု အောင်မြင်ပါသည်", {
        description: `${route} - ${editingRate.type} - ${editingRate.Kg} တန်ဖိုးပြင်ဆင်ပြီးပါပြီ`
      });
      
      setIsEditing(false);
      setEditingRate(null);
      setShowConfirmDialog(false);
    } catch (error) {
      console.error("Error updating rate:", error);
      toast.error("နှုန်းထား အချက်အလက် ပြင်ဆင်မှု မအောင်မြင်ပါ");
    }
  };

  return {
    editingRate,
    isEditing,
    setIsEditing,
    editData,
    showConfirmDialog,
    setShowConfirmDialog,
    getFieldLabel,
    handleEditClick,
    handleInputChange,
    handleSaveClick,
    handleSave
  };
};
