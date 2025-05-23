
import React, { useState, useEffect } from "react";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { useShippingRates } from "@/context/ShippingRatesContext";
import { ShippingRate } from "@/types/shipping";
import { Button } from "@/components/ui/button";
import { useRateEditor } from "@/hooks/useRateEditor";
import FilterControls from "@/components/admin/FilterControls";
import ShippingRateTable from "@/components/admin/ShippingRateTable";
import ShippingRateEditor from "@/components/admin/ShippingRateEditor";
import ConfirmationDialog from "@/components/admin/ConfirmationDialog";

const AdminPanel = () => {
  const { logOut } = useAdminAuth();
  const { rates, loading, route, setRoute, type, setType, filteredRates } = useShippingRates();
  const [searchQuery, setSearchQuery] = useState("");
  const [displayRates, setDisplayRates] = useState<ShippingRate[]>([]);
  
  const {
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
  } = useRateEditor();

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
      
      <FilterControls 
        route={route} 
        setRoute={setRoute}
        type={type}
        setType={setType}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      
      <ShippingRateTable 
        loading={loading} 
        displayRates={displayRates} 
        handleEditClick={handleEditClick} 
      />
      
      <ShippingRateEditor 
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        editingRate={editingRate}
        editData={editData}
        handleInputChange={handleInputChange}
        handleSaveClick={handleSaveClick}
        getFieldLabel={getFieldLabel}
      />

      <ConfirmationDialog
        showConfirmDialog={showConfirmDialog}
        setShowConfirmDialog={setShowConfirmDialog}
        editingRate={editingRate}
        editData={editData}
        getFieldLabel={getFieldLabel}
        handleSave={handleSave}
      />
    </div>
  );
};

export default AdminPanel;
