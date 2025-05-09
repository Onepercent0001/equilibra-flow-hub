
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
import { Plus, ArrowUp, CalendarIcon } from 'lucide-react';
import GoalDialog from '@/components/goals/GoalDialog';

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

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Metas Financeiras</h1>
            <p className="text-muted-foreground mt-2">
              Defina e acompanhe objetivos financeiros
            </p>
          </div>
          <Button onClick={() => setIsDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Nova Meta
          </Button>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockGoals.map((goal) => {
            const progress = calculateProgress(goal.current, goal.target);
            const daysRemaining = calculateDaysRemaining(goal.deadline);
            
            return (
              <Card key={goal.id} className="card-hover">
                <CardHeader className="pb-2">
                  <CardTitle>{goal.name}</CardTitle>
                  <CardDescription>{goal.category}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-muted-foreground">
                      {formatCurrency(goal.current)} de {formatCurrency(goal.target)}
                    </span>
                    <span className="text-sm font-medium">{progress}%</span>
                  </div>
                  <Progress value={progress} className={`h-2 ${getProgressColor(progress)}`} />
                  
                  <div className="flex justify-between text-sm">
                    <div className="flex items-center space-x-1">
                      <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Prazo: {formatDate(goal.deadline)}</span>
                    </div>
                    <span className="text-muted-foreground">
                      {daysRemaining} dias restantes
                    </span>
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
