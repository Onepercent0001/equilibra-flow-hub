
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
import { Input } from '@/components/ui/input';
import { Plus, Search, Pencil, Trash2 } from 'lucide-react';
import CategoryDialog from '@/components/categories/CategoryDialog';
import { Badge } from '@/components/ui/badge';

// Mock data para demonstração
const mockCategories = [
  {
    id: '1',
    name: 'Alimentação',
    type: 'expense',
    color: '#10b981',
    transactionCount: 45,
  },
  {
    id: '2',
    name: 'Moradia',
    type: 'fixed',
    color: '#3b82f6',
    transactionCount: 12,
  },
  {
    id: '3',
    name: 'Transporte',
    type: 'expense',
    color: '#6366f1',
    transactionCount: 28,
  },
  {
    id: '4',
    name: 'Saúde',
    type: 'fixed',
    color: '#f97316',
    transactionCount: 15,
  },
  {
    id: '5',
    name: 'Lazer',
    type: 'expense',
    color: '#8b5cf6',
    transactionCount: 20,
  },
  {
    id: '6',
    name: 'Renda',
    type: 'income',
    color: '#22c55e',
    transactionCount: 5,
  },
  {
    id: '7',
    name: 'Renda Extra',
    type: 'income',
    color: '#14b8a6',
    transactionCount: 8,
  },
];

const Categories = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCategories = mockCategories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (category: any) => {
    setEditingCategory(category);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    // Aqui iria a lógica para deletar a categoria
    console.log(`Deletando categoria ${id}`);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setEditingCategory(null);
  };

  // Função para determinar a cor e texto da badge baseado no tipo da categoria
  const getCategoryBadge = (type: string) => {
    switch(type) {
      case 'income':
        return { variant: 'secondary' as const, label: 'Receita' };
      case 'fixed':
        return { variant: 'outline' as const, label: 'Custo Fixo' };
      default:
        return { variant: 'destructive' as const, label: 'Despesa' };
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Categorias</h1>
            <p className="text-muted-foreground mt-2">
              Gerencie suas categorias de receitas, despesas e custos fixos
            </p>
          </div>
          <Button onClick={() => setIsDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Nova Categoria
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between space-y-2 md:space-y-0">
              <CardTitle>Todas as Categorias</CardTitle>
              <div className="flex items-center space-x-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Buscar categoria..." 
                  className="w-full md:w-[250px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredCategories.map((category) => {
                const badge = getCategoryBadge(category.type);
                return (
                  <div
                    key={category.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: category.color }}
                      />
                      <div>
                        <p className="font-medium">{category.name}</p>
                        <div className="flex items-center space-x-2">
                          <Badge variant={badge.variant}>
                            {badge.label}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {category.transactionCount} transações
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(category)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(category.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {filteredCategories.length === 0 && (
              <div className="text-center py-10">
                <p className="text-muted-foreground">Nenhuma categoria encontrada</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <CategoryDialog 
        open={isDialogOpen} 
        onOpenChange={handleDialogClose} 
        category={editingCategory} 
      />
    </Layout>
  );
};

export default Categories;
