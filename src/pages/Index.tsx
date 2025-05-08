
import React from 'react';
import Layout from '@/components/layout/Layout';
import DashboardSummary from '@/components/dashboard/DashboardSummary';
import RecentTransactions from '@/components/dashboard/RecentTransactions';
import ExpensesByCategory from '@/components/dashboard/ExpensesByCategory';
import IncomeExpenseTrend from '@/components/dashboard/IncomeExpenseTrend';
import FinancialGoals from '@/components/dashboard/FinancialGoals';

const Index = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <div className="space-x-2">
              <span className="text-muted-foreground">Hoje, </span>
              <span className="font-medium">{new Date().toLocaleDateString('pt-BR')}</span>
            </div>
          </div>
          
          <p className="text-muted-foreground">
            Bem-vindo ao Equilibra. Aqui está um resumo das suas finanças.
          </p>
        </div>
        
        <DashboardSummary />
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <IncomeExpenseTrend />
          <ExpensesByCategory />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RecentTransactions />
          </div>
          <div className="col-span-1">
            <FinancialGoals />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
