
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowUp, ArrowDown } from 'lucide-react';

const transactions = [
  {
    id: 1,
    description: 'Supermercado Exemplo',
    amount: -325.42,
    date: '2025-05-07',
    category: 'Alimentação',
    account: 'Nubank'
  },
  {
    id: 2,
    description: 'Salário',
    amount: 5200.00,
    date: '2025-05-05',
    category: 'Renda',
    account: 'Bradesco'
  },
  {
    id: 3,
    description: 'Academia',
    amount: -99.90,
    date: '2025-05-03',
    category: 'Saúde',
    account: 'Itaú'
  },
  {
    id: 4,
    description: 'Freelance Design',
    amount: 1250.00,
    date: '2025-05-02',
    category: 'Renda Extra',
    account: 'Nubank'
  },
  {
    id: 5,
    description: 'Aluguel',
    amount: -1400.00,
    date: '2025-05-01',
    category: 'Moradia',
    account: 'Bradesco'
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

const RecentTransactions = () => {
  return (
    <Card className="mt-6 card-hover">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle>Transações Recentes</CardTitle>
          <a href="/transactions" className="text-sm text-primary hover:underline">
            Ver todas
          </a>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-md transition-colors">
              <div className="flex items-center gap-4">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                  transaction.amount > 0 ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  {transaction.amount > 0 ? (
                    <ArrowUp className="h-5 w-5 text-equilibra-secondary" />
                  ) : (
                    <ArrowDown className="h-5 w-5 text-destructive" />
                  )}
                </div>
                <div>
                  <p className="font-medium">{transaction.description}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{formatDate(transaction.date)}</span>
                    <Badge variant="outline" className="font-normal">
                      {transaction.category}
                    </Badge>
                    <span>{transaction.account}</span>
                  </div>
                </div>
              </div>
              <span className={`font-medium ${
                transaction.amount > 0 ? 'text-equilibra-secondary' : 'text-destructive'
              }`}>
                {formatCurrency(transaction.amount)}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentTransactions;
