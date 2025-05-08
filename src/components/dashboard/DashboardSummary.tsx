
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ArrowUp, ArrowDown, WalletIcon, ChartBarIcon } from 'lucide-react';

const DashboardSummary = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="card-hover">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Saldo Atual</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold">R$ 4.250,00</span>
            <WalletIcon className="h-5 w-5 text-equilibra-primary" />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Atualizado há 5 minutos
          </p>
        </CardContent>
      </Card>

      <Card className="card-hover">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Receitas (Mês)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-equilibra-secondary">R$ 6.820,00</span>
            <ArrowUp className="h-5 w-5 text-equilibra-secondary" />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            <span className="text-equilibra-secondary">+12%</span> em relação ao mês anterior
          </p>
        </CardContent>
      </Card>

      <Card className="card-hover">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Despesas (Mês)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-destructive">R$ 3.450,00</span>
            <ArrowDown className="h-5 w-5 text-destructive" />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            <span className="text-destructive">+8%</span> em relação ao mês anterior
          </p>
        </CardContent>
      </Card>

      <Card className="card-hover">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Metas Atingidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold">2/4</span>
            <ChartBarIcon className="h-5 w-5 text-equilibra-accent" />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            <span className="text-equilibra-accent">50%</span> das metas completadas
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardSummary;
