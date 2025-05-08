
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const goals = [
  {
    id: 1,
    name: 'Fundo de Emergência',
    target: 10000,
    current: 7500,
    deadline: '2025-12-31',
  },
  {
    id: 2,
    name: 'Viagem para Europa',
    target: 15000,
    current: 3000,
    deadline: '2025-07-15',
  },
  {
    id: 3,
    name: 'Novo Notebook',
    target: 5000,
    current: 4800,
    deadline: '2025-06-01',
  },
  {
    id: 4,
    name: 'Investimentos',
    target: 20000,
    current: 8000,
    deadline: '2025-12-31',
  },
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('pt-BR').format(date);
};

const getProgressPercentage = (current: number, target: number) => {
  return Math.min(Math.round((current / target) * 100), 100);
};

const calculateDaysRemaining = (deadline: string) => {
  const today = new Date();
  const deadlineDate = new Date(deadline);
  const diffTime = deadlineDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

const FinancialGoals = () => {
  return (
    <Card className="card-hover">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle>Metas Financeiras</CardTitle>
          <a href="/goals" className="text-sm text-primary hover:underline">
            Ver todas
          </a>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {goals.map((goal) => {
            const progressPercentage = getProgressPercentage(goal.current, goal.target);
            const daysRemaining = calculateDaysRemaining(goal.deadline);
            
            return (
              <div key={goal.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{goal.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Meta: {formatCurrency(goal.target)} • {daysRemaining} dias restantes
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{progressPercentage}%</p>
                    <p className="text-xs text-muted-foreground">
                      {formatCurrency(goal.current)}
                    </p>
                  </div>
                </div>
                
                <Progress value={progressPercentage} className="h-2" 
                  color={progressPercentage >= 90 ? 'bg-green-500' : 'bg-blue-500'} />
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancialGoals;
