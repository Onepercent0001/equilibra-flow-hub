
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from './AuthContext';
import { Account, Category, Transaction } from '@/types/database.types';

interface DataContextType {
  accounts: Account[];
  categories: Category[];
  recentTransactions: Transaction[];
  loadingData: boolean;
  refreshData: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);
  const [loadingData, setLoadingData] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  // Carregar dados quando o usuário estiver autenticado
  useEffect(() => {
    if (user) {
      refreshData();
    }
  }, [user]);

  const refreshData = async () => {
    if (!user) return;
    
    setLoadingData(true);
    try {
      // Buscar contas
      const { data: accountsData, error: accountsError } = await supabase
        .from('accounts')
        .select('*')
        .order('name', { ascending: true });
      
      if (accountsError) throw accountsError;
      setAccounts(accountsData || []);

      // Buscar categorias
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('categories')
        .select('*')
        .order('name', { ascending: true });
      
      if (categoriesError) throw categoriesError;
      setCategories(categoriesData || []);

      // Buscar transações recentes
      const { data: transactionsData, error: transactionsError } = await supabase
        .from('transactions')
        .select('*')
        .order('date', { ascending: false })
        .limit(10);
      
      if (transactionsError) throw transactionsError;
      setRecentTransactions(transactionsData || []);
    } catch (error: any) {
      console.error('Erro ao carregar dados:', error);
      toast({
        title: 'Erro ao carregar dados',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoadingData(false);
    }
  };

  const value = {
    accounts,
    categories,
    recentTransactions,
    loadingData,
    refreshData
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData deve ser usado dentro de um DataProvider');
  }
  return context;
};
