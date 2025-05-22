
import { ShippingRatesProvider } from "@/context/ShippingRatesContext";
import { AdminAuthProvider } from "@/context/AdminAuthContext";
import Header from "@/components/Header";
import SearchFilters from "@/components/SearchFilters";
import ResultsDisplay from "@/components/ResultsDisplay";
import AdminLogin from "@/components/AdminLogin";
import AdminPanel from "@/components/AdminPanel";
import { useState } from "react";
import { useAdminAuth } from "@/context/AdminAuthContext";

// This component needs to be within the AdminAuthProvider to use useAdminAuth
const AdminSection = () => {
  const { isAdmin } = useAdminAuth();
  return (
    <>
      {isAdmin ? <AdminPanel /> : <AdminLogin />}
    </>
  );
};

const Index = () => {
  const [activeTab, setActiveTab] = useState<'user' | 'admin'>('user');

  return (
    <div className="min-h-screen pb-10 bg-gradient">
      <AdminAuthProvider>
        <ShippingRatesProvider>
          <div className="container mx-auto px-4">
            <Header />
            
            {/* Tabs */}
            <div className="flex justify-center mb-8">
              <div className="glass-effect rounded-lg p-2">
                <button 
                  className={`px-6 py-3 rounded-md transition-all duration-300 mr-2 ${activeTab === 'user' ? 'tab-active' : 'text-white hover:bg-white/10'}`}
                  onClick={() => setActiveTab('user')}
                >
                  <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    အသုံးပြုသူ မြင်ကွင်း
                  </span>
                </button>
                <button 
                  className={`px-6 py-3 rounded-md transition-all duration-300 ${activeTab === 'admin' ? 'tab-active' : 'text-white hover:bg-white/10'}`}
                  onClick={() => setActiveTab('admin')}
                >
                  <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    စီမံခန့်ခွဲသူ စာမျက်နှာ
                  </span>
                </button>
              </div>
            </div>
            
            {activeTab === 'user' ? (
              <>
                <SearchFilters />
                
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-6 section-title text-white">
                    <span className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      Firebase နှုန်းထားများ
                    </span>
                  </h2>
                  <div className="glass-effect rounded-lg p-4 mb-6">
                    <p className="text-white">
                      ဤဒေတာများသည် Firebase ဒေတာဘေ့စ်မှ ရယူထားသော နှုန်းထားများ ဖြစ်ပါသည်။
                    </p>
                  </div>
                </div>
                
                <ResultsDisplay />
              </>
            ) : (
              <AdminSection />
            )}
          </div>
        </ShippingRatesProvider>
      </AdminAuthProvider>
    </div>
  );
};

export default Index;
