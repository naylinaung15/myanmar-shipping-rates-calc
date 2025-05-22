
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User
} from "firebase/auth";
import { auth } from "@/services/firebase";
import { useToast } from "@/components/ui/use-toast";

interface AdminAuthContextType {
  currentUser: User | null;
  isAdmin: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  logOut: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
};

interface AdminAuthProviderProps {
  children: ReactNode;
}

export const AdminAuthProvider = ({ children }: AdminAuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsAdmin(!!user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: "အကောင့်ဝင်ရောက်မှု အောင်မြင်ပါသည်",
        description: "စီမံခန့်ခွဲသူအနေဖြင့် အကောင့်ဝင်ရောက်ပြီးဖြစ်သည်",
      });
    } catch (error) {
      toast({
        title: "အကောင့်ဝင်ရောက်မှု မအောင်မြင်ပါ",
        description: "အီးမေးလ် သို့မဟုတ် စကားဝှက် မှားယွင်းနေပါသည်",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      toast({
        title: "အကောင့်ထွက်ပြီးပါပြီ",
        description: "စီမံခန့်ခွဲသူအနေဖြင့် အကောင့်ထွက်ပြီးဖြစ်သည်",
      });
    } catch (error) {
      toast({
        title: "အကောင့်ထွက်ရန် မအောင်မြင်ပါ",
        description: "ကျေးဇူးပြု၍ ထပ်မံကြိုးစားကြည့်ပါ",
        variant: "destructive",
      });
    }
  };

  const value = {
    currentUser,
    isAdmin,
    loading,
    signIn,
    logOut,
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};
