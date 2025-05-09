
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from '@/components/ui/input';
import { Plus, Filter, Search } from 'lucide-react';
import TransactionDialog from '@/components/transactions/TransactionDialog';

// Mock data para demonstração
const mockTransactions = [
  {
    id: '1',
    description: 'Salário',
    amount: 5000,
    type: 'income',
    category: 'Renda',
    account: 'Nubank',
    date: '2025-05-01'
  },
  {
    id: '2',
    description: 'Aluguel',
    amount: -1500,
    type: 'expense',
    category: 'Moradia',
    account: 'Itaú',
    date: '2025-05-05'
  },
  {
    id: '3',
    description: 'Supermercado',
    amount: -450,
    type: 'expense',
    category: 'Alimentação',
    account: 'Nubank',
    date: '2025-05-06'
  },
  {
    id: '4',
    description: 'Freela Design',
    amount: 1200,
    type: 'income',
    category: 'Renda Extra',
    account: 'Nubank',
    date: '2025-05-10'
  },
  {
    id: '5',
    description: 'Farmácia',
    amount: -120,
    type: 'expense',
    category: 'Saúde',
    account: 'Bradesco',
    date: '2025-05-12'
  }
];

const Transactions = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [transactionType, setTransactionType] = useState('all');

  const filteredTransactions = mockTransactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = transactionType === 'all' || transaction.type === transactionType;
    return matchesSearch && matchesType;
  });

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

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Transações</h1>
            <p className="text-muted-foreground mt-2">
              Gerencie suas receitas e despesas
            </p>
          </div>
          <Button onClick={() => setIsDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Nova Transação
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between space-y-2 md:space-y-0">
              <CardTitle>Todas as Transações</CardTitle>
              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
                <div className="flex items-center space-x-2">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Buscar transação..." 
                    className="w-full md:w-auto"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <Select value={transactionType} onValueChange={setTransactionType}>
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="Filtrar por tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="income">Receitas</SelectItem>
                      <SelectItem value="expense">Despesas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead className="hidden md:table-cell">Categoria</TableHead>
                  <TableHead className="hidden md:table-cell">Conta</TableHead>
                  <TableHead className="hidden md:table-cell">Data</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{transaction.description}</TableCell>
                      <TableCell className={transaction.amount > 0 ? "text-equilibra-secondary" : "text-destructive"}>
                        {formatCurrency(transaction.amount)}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{transaction.category}</TableCell>
                      <TableCell className="hidden md:table-cell">{transaction.account}</TableCell>
                      <TableCell className="hidden md:table-cell">{formatDate(transaction.date)}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-10">
                      Nenhuma transação encontrada
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <TransactionDialog 
        open={isDialogOpen} 
        onOpenChange={setIsDialogOpen} 
      />
    </Layout>
  );
};

export default Transactions;
