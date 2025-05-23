
import React, { useState, useEffect } from "react";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { useShippingRates, ShippingRate } from "@/context/ShippingRatesContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Edit, Save } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { database } from "@/services/firebase";
import { ref, update } from "firebase/database";
import { toast } from "sonner";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";

const AdminPanel = () => {
  const { logOut } = useAdminAuth();
  const { rates, loading, route, setRoute, type, setType, filteredRates } = useShippingRates();
  const [searchQuery, setSearchQuery] = useState("");
  const [displayRates, setDisplayRates] = useState<ShippingRate[]>([]);
  const [editingRate, setEditingRate] = useState<ShippingRate | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<Record<string, string>>({});

  // Filter rates based on search query
  useEffect(() => {
    if (filteredRates) {
      if (searchQuery) {
        const filtered = filteredRates.filter(rate => 
          rate.Kg.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (rate.type && rate.type.toLowerCase().includes(searchQuery.toLowerCase()))
        );
        setDisplayRates(filtered);
      } else {
        setDisplayRates(filteredRates);
      }
    }
  }, [filteredRates, searchQuery]);

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
    } catch (error) {
      console.error("Error updating rate:", error);
      toast.error("နှုန်းထား အချက်အလက် ပြင်ဆင်မှု မအောင်မြင်ပါ");
    }
  };

  return (
    <div className="glass-effect rounded-xl shadow-lg p-8 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">
          <span className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            နှုန်းထားများ စီမံခန့်ခွဲရန်
          </span>
        </h2>
        <Button 
          variant="destructive"
          onClick={logOut}
          className="flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          အကောင့်ထွက်ရန်
        </Button>
      </div>
      
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
      
      {/* Display rates in a table */}
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
      
      {/* Edit Dialog */}
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
              
              {Object.entries(editData).map(([key, value]) => {
                // Skip type and Kg as they're not editable
                if (key === 'type' || key === 'Kg') return null;
                
                return (
                  <div key={key} className="space-y-2">
                    <label className="block text-sm font-medium">
                      {key === 'BKK' ? 'ဘန်ကောက်' : 
                       key === 'OtherCity' ? 'အခြားမြို့များ' : 
                       key === 'RemoteArea' ? 'ဝေးလံဒေသ' :
                       key === 'New' ? 'အသစ်' :
                       key === 'Used' ? 'အသုံးပြုပြီး' : key}:
                    </label>
                    <Input 
                      type="text" 
                      value={value} 
                      onChange={(e) => handleInputChange(key, e.target.value)} 
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
            <Button onClick={handleSave}>
              <Save size={16} className="mr-2" />
              သိမ်းဆည်းမည်
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AdminPanel;
