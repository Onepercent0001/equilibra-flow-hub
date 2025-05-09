
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ArrowUp, ArrowDown, WalletIcon, ChartBarIcon, CalendarIcon } from 'lucide-react';

const DashboardSummary = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="card-hover border-l-4 border-l-equilibra-primary">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Saldo Total</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold">R$ 4.250,00</span>
            <WalletIcon className="h-5 w-5 text-equilibra-primary" />
          </div>
          <div className="flex items-center mt-2 text-xs">
            <div className="flex items-center text-emerald-600">
              <ArrowUp className="h-3 w-3 mr-1" />
              <span>2,5%</span>
            </div>
            <span className="text-muted-foreground ml-2">
              em relação ao mês anterior
            </span>
          </div>
        </CardContent>
      </Card>

      <Card className="card-hover border-l-4 border-l-equilibra-secondary">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Receitas (Maio)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-equilibra-secondary">R$ 6.820,00</span>
            <ArrowUp className="h-5 w-5 text-equilibra-secondary" />
          </div>
          <div className="flex items-center justify-between mt-2 text-xs">
            <div className="flex items-center text-equilibra-secondary">
              <ArrowUp className="h-3 w-3 mr-1" />
              <span>12%</span>
            </div>
            <span className="text-muted-foreground">
              Previsão: R$ 7.100,00
            </span>
          </div>
        </CardContent>
      </Card>

      <Card className="card-hover border-l-4 border-l-destructive">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Despesas (Maio)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-destructive">R$ 3.450,00</span>
            <ArrowDown className="h-5 w-5 text-destructive" />
          </div>
          <div className="flex items-center justify-between mt-2 text-xs">
            <div className="flex items-center text-amber-600">
              <ArrowUp className="h-3 w-3 mr-1" />
              <span>8%</span>
            </div>
            <span className="text-muted-foreground">
              R$ 1.120,00 em custos fixos
            </span>
          </div>
        </CardContent>
      </Card>

      <Card className="card-hover border-l-4 border-l-equilibra-accent">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Próximas Faturas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold">R$ 950,00</span>
            <CalendarIcon className="h-5 w-5 text-equilibra-accent" />
          </div>
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>3 faturas em 7 dias</span>
            <span className="font-medium text-amber-600">Ver detalhes</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardSummary;
