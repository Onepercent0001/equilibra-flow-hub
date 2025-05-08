
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

const data = [
  {
    name: 'Jan',
    receitas: 4000,
    despesas: 2400,
  },
  {
    name: 'Fev',
    receitas: 3000,
    despesas: 2800,
  },
  {
    name: 'Mar',
    receitas: 5000,
    despesas: 3200,
  },
  {
    name: 'Abr',
    receitas: 4500,
    despesas: 2900,
  },
  {
    name: 'Mai',
    receitas: 6820,
    despesas: 3450,
  },
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const IncomeExpenseTrend = () => {
  return (
    <Card className="col-span-1 lg:col-span-2 min-h-[400px] card-hover">
      <CardHeader className="pb-2">
        <CardTitle>Tendência de Receitas e Despesas</CardTitle>
      </CardHeader>
      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="name" stroke="#94a3b8" />
            <YAxis 
              stroke="#94a3b8" 
              tickFormatter={formatCurrency}
            />
            <Tooltip 
              formatter={(value: number) => [formatCurrency(value), '']}
              contentStyle={{ borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="receitas" 
              stroke="#10b981" 
              strokeWidth={3} 
              name="Receitas" 
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line 
              type="monotone" 
              dataKey="despesas" 
              stroke="#ef4444" 
              strokeWidth={3} 
              name="Despesas" 
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default IncomeExpenseTrend;
