
import React from 'react';
import Layout from '@/components/layout/Layout';
import DashboardSummary from '@/components/dashboard/DashboardSummary';
import RecentTransactions from '@/components/dashboard/RecentTransactions';
import ExpensesByCategory from '@/components/dashboard/ExpensesByCategory';
import IncomeExpenseTrend from '@/components/dashboard/IncomeExpenseTrend';
import FinancialGoals from '@/components/dashboard/FinancialGoals';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, Wallet, Plus, CircleDollarSign, TrendingUp } from 'lucide-react';

const Index = () => {
  // Função para formatar a data em português
  const formatDate = () => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date().toLocaleDateString('pt-BR', options);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Olá, Carlos!</h1>
              <p className="text-muted-foreground mt-1">
                {formatDate()}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                <span>Nova Transação</span>
              </Button>
              <Button className="flex items-center gap-2">
                <Wallet className="h-4 w-4" />
                <span>Ver Contas</span>
              </Button>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-equilibra-primary/10 to-equilibra-secondary/10 p-4 rounded-lg border border-muted">
            <div className="flex items-center gap-3">
              <div className="bg-white p-2 rounded-full">
                <CircleDollarSign className="h-6 w-6 text-equilibra-primary" />
              </div>
              <div>
                <h3 className="font-medium">Dica Financeira</h3>
                <p className="text-sm text-muted-foreground">
                  Reserve ao menos 10% da sua renda para investimentos de longo prazo. 
                  Pequenas economias mensais fazem grande diferença ao longo do tempo.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <DashboardSummary />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle>Evolução Financeira</CardTitle>
                <CardDescription>Comparativo de receitas e despesas dos últimos 6 meses</CardDescription>
              </div>
              <Button variant="ghost" className="flex items-center gap-1 h-8 text-xs">
                Ver mais <ArrowUpRight className="h-3 w-3" />
              </Button>
            </CardHeader>
            <CardContent className="pt-4">
              <IncomeExpenseTrend />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle>Despesas por Categoria</CardTitle>
                <CardDescription>Distribuição do mês atual</CardDescription>
              </div>
              <Button variant="ghost" className="flex items-center gap-1 h-8 text-xs">
                Ver mais <ArrowUpRight className="h-3 w-3" />
              </Button>
            </CardHeader>
            <CardContent className="pt-4">
              <ExpensesByCategory />
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle>Transações Recentes</CardTitle>
                <CardDescription>Últimas 5 transações registradas</CardDescription>
              </div>
              <Button variant="ghost" className="flex items-center gap-1 h-8 text-xs">
                Ver todas <ArrowUpRight className="h-3 w-3" />
              </Button>
            </CardHeader>
            <CardContent className="pt-4">
              <RecentTransactions />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle>Metas Financeiras</CardTitle>
                <CardDescription>Progresso das suas metas</CardDescription>
              </div>
              <Button variant="ghost" className="flex items-center gap-1 h-8 text-xs">
                Ver todas <ArrowUpRight className="h-3 w-3" />
              </Button>
            </CardHeader>
            <CardContent className="pt-4">
              <FinancialGoals />
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
