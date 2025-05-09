
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Plus, 
  ArrowUp, 
  CalendarIcon, 
  HelpCircle, 
  Target, 
  TrendingUp 
} from 'lucide-react';
import GoalDialog from '@/components/goals/GoalDialog';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

// Mock data para demonstração
const mockGoals = [
  {
    id: '1',
    name: 'Fundo de Emergência',
    target: 10000,
    current: 7500,
    category: 'Economia',
    deadline: '2025-12-31',
  },
  {
    id: '2',
    name: 'Viagem Europa',
    target: 15000,
    current: 3000,
    category: 'Lazer',
    deadline: '2025-07-15',
  },
  {
    id: '3',
    name: 'Novo Notebook',
    target: 5000,
    current: 4800,
    category: 'Tecnologia',
    deadline: '2025-06-01',
  },
  {
    id: '4',
    name: 'Investimentos',
    target: 20000,
    current: 8000,
    category: 'Financeiro',
    deadline: '2025-12-31',
  },
  {
    id: '5',
    name: 'Nova Casa',
    target: 100000,
    current: 35000,
    category: 'Moradia',
    deadline: '2026-12-31',
  }
];

const Goals = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<any>(null);

  const handleAddDeposit = (goal: any) => {
    setEditingGoal(goal);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setEditingGoal(null);
  };

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

  const calculateProgress = (current: number, target: number) => {
    return Math.min(Math.round((current / target) * 100), 100);
  };

  const calculateDaysRemaining = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getProgressColor = (progress: number) => {
    if (progress < 30) return 'bg-red-500';
    if (progress < 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const calculateMonthlyTarget = (current: number, target: number, deadline: string) => {
    const daysRemaining = calculateDaysRemaining(deadline);
    const monthsRemaining = Math.ceil(daysRemaining / 30);
    const amountNeeded = target - current;
    
    if (monthsRemaining <= 0 || amountNeeded <= 0) return 0;
    return Math.ceil(amountNeeded / monthsRemaining);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Metas Financeiras</h1>
            <p className="text-muted-foreground mt-2">
              Defina e acompanhe objetivos financeiros para realizar seus sonhos
            </p>
          </div>
          <Button onClick={() => setIsDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Nova Meta
          </Button>
        </div>
        
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mb-6">
          <div className="flex items-start space-x-3">
            <Target className="h-6 w-6 text-primary mt-0.5" />
            <div>
              <h3 className="font-medium text-lg">Como funcionam as metas?</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Metas ajudam você a planejar e economizar para objetivos importantes. 
                Defina um valor alvo, prazo e acompanhe seu progresso adicionando depósitos regularmente.
                O sistema calcula quanto você deve economizar mensalmente para atingir sua meta no prazo.
              </p>
            </div>
          </div>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockGoals.map((goal) => {
            const progress = calculateProgress(goal.current, goal.target);
            const daysRemaining = calculateDaysRemaining(goal.deadline);
            const monthlyTarget = calculateMonthlyTarget(goal.current, goal.target, goal.deadline);
            const progressColor = getProgressColor(progress);
            
            return (
              <Card key={goal.id} className="overflow-hidden">
                <div className={`h-1 ${progressColor} w-full`}></div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{goal.name}</CardTitle>
                      <CardDescription className="flex items-center mt-1">
                        <span className="bg-slate-100 text-slate-700 text-xs px-2 py-0.5 rounded-full">
                          {goal.category}
                        </span>
                      </CardDescription>
                    </div>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <HelpCircle className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="w-80 p-4">
                        <div className="space-y-2">
                          <h4 className="font-medium">Sobre esta meta</h4>
                          <p className="text-sm">
                            Para atingir {formatCurrency(goal.target)} até {formatDate(goal.deadline)},
                            você precisa economizar aproximadamente {formatCurrency(monthlyTarget)} por mês.
                          </p>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-muted-foreground">
                        {formatCurrency(goal.current)} de {formatCurrency(goal.target)}
                      </span>
                      <span className="text-sm font-medium">{progress}%</span>
                    </div>
                    <Progress value={progress} className={`h-2 ${progressColor}`} />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="space-y-1">
                      <div className="flex items-center text-muted-foreground">
                        <CalendarIcon className="h-3.5 w-3.5 mr-1 opacity-70" />
                        <span>Prazo</span>
                      </div>
                      <p className="font-medium">{formatDate(goal.deadline)}</p>
                      <p className="text-xs text-muted-foreground">
                        {daysRemaining} dias restantes
                      </p>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex items-center text-muted-foreground">
                        <TrendingUp className="h-3.5 w-3.5 mr-1 opacity-70" />
                        <span>Meta mensal</span>
                      </div>
                      <p className="font-medium">{formatCurrency(monthlyTarget)}</p>
                      <p className="text-xs text-muted-foreground">
                        para atingir no prazo
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={() => handleAddDeposit(goal)}
                  >
                    <ArrowUp className="mr-2 h-4 w-4" /> Adicionar Depósito
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>

      <GoalDialog 
        open={isDialogOpen} 
        onOpenChange={handleDialogClose} 
        goal={editingGoal} 
      />
    </Layout>
  );
};

export default Goals;
