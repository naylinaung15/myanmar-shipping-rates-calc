
import React, { useState } from "react";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const { signIn, loading } = useAdminAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    
    try {
      await signIn(email, password);
    } catch (error) {
      setLoginError("အီးမေးလ် သို့မဟုတ် စကားဝှက် မှားယွင်းနေပါသည်");
    }
  };

  return (
    <div className="max-w-md mx-auto glass-effect rounded-xl shadow-xl p-8 mb-8">
      <h2 className="text-2xl font-bold mb-6 text-center text-white">
        <span className="flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          စီမံခန့်ခွဲသူ အကောင့်ဝင်ရန်
        </span>
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label className="block text-white mb-2 font-medium" htmlFor="email">အီးမေးလ်</Label>
          <Input 
            id="email"
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="w-full p-3 rounded-lg"
            placeholder="အီးမေးလ် ထည့်သွင်းပါ"
            required
          />
        </div>
        <div>
          <Label className="block text-white mb-2 font-medium" htmlFor="password">စကားဝှက်</Label>
          <Input 
            id="password"
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="w-full p-3 rounded-lg"
            placeholder="စကားဝှက် ထည့်သွင်းပါ"
            required
          />
        </div>
        <Button 
          type="submit" 
          className="w-full py-6 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              အကောင့်ဝင်နေသည်...
            </span>
          ) : (
            <span className="flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              အကောင့်ဝင်ရန်
            </span>
          )}
        </Button>
        {loginError && <p className="text-red-300 text-center">{loginError}</p>}
      </form>
    </div>
  );
};

export default AdminLogin;
