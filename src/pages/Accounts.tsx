
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
import { Plus, Pencil, Trash2 } from 'lucide-react';
import AccountDialog from '@/components/accounts/AccountDialog';

// Mock data para demonstração
const mockAccounts = [
  {
    id: '1',
    name: 'Nubank',
    type: 'checking',
    balance: 3450.75,
    color: '#820ad1',
  },
  {
    id: '2',
    name: 'Itaú',
    type: 'savings',
    balance: 12500.32,
    color: '#ec7000',
  },
  {
    id: '3',
    name: 'Bradesco',
    type: 'checking',
    balance: 2100.45,
    color: '#cc092f',
  },
  {
    id: '4',
    name: 'Carteira',
    type: 'wallet',
    balance: 250.00,
    color: '#22c55e',
  },
  {
    id: '5',
    name: 'Investimentos',
    type: 'investment',
    balance: 25400.00,
    color: '#3b82f6',
  }
];

const Accounts = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState<any>(null);

  const totalBalance = mockAccounts.reduce((sum, account) => sum + account.balance, 0);

  const handleEdit = (account: any) => {
    setEditingAccount(account);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    // Aqui iria a lógica para deletar a conta
    console.log(`Deletando conta ${id}`);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setEditingAccount(null);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getAccountTypeLabel = (type: string) => {
    switch (type) {
      case 'checking': return 'Conta Corrente';
      case 'savings': return 'Poupança';
      case 'investment': return 'Investimentos';
      case 'wallet': return 'Carteira';
      default: return type;
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Contas</h1>
            <p className="text-muted-foreground mt-2">
              Gerencie suas contas bancárias e carteiras
            </p>
          </div>
          <Button onClick={() => setIsDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Nova Conta
          </Button>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {mockAccounts.map((account) => (
            <Card key={account.id} className="relative overflow-hidden">
              <div 
                className="absolute top-0 left-0 w-1 h-full" 
                style={{ backgroundColor: account.color }} 
              />
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{account.name}</CardTitle>
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(account)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(account.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardDescription>
                  {getAccountTypeLabel(account.type)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{formatCurrency(account.balance)}</p>
              </CardContent>
            </Card>
          ))}
          
          {/* Total Balance Card */}
          <Card className="col-span-full bg-primary text-primary-foreground">
            <CardHeader className="pb-2">
              <CardTitle>Saldo Total</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{formatCurrency(totalBalance)}</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <AccountDialog 
        open={isDialogOpen} 
        onOpenChange={handleDialogClose} 
        account={editingAccount} 
      />
    </Layout>
  );
};

export default Accounts;
