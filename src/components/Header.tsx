
import { useAdminAuth } from "@/context/AdminAuthContext";

const Header = () => {
  const { isAdmin } = useAdminAuth();

  return (
    <header className="glass-effect shadow-lg mb-8">
      <div className="container mx-auto px-6 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-2">သယ်ယူပို့ဆောင်ရေး နှုန်းထား တွက်ချက်ခြင်း</h1>
          <p className="text-white text-lg opacity-90">မြန်မာ - ထိုင်း တင်ပို့မှု နှုန်းထားများ (Firebase ဒေတာဘေ့စ်မှ)</p>
          {isAdmin && (
            <div className="mt-2 inline-block px-4 py-2 bg-green-600 text-white rounded-full text-sm font-medium">
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                စီမံခန့်ခွဲသူ အနေဖြင့် လက်ရှိ အကောင့်ဝင်ထားသည်
              </span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
