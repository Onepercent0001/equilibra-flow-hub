
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";

interface TransactionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transaction?: any; // Tipo a ser expandido quando tivermos um modelo de dados completo
}

const TransactionDialog = ({ open, onOpenChange, transaction }: TransactionDialogProps) => {
  const { toast } = useToast();
  const isEditing = Boolean(transaction);

  const form = useForm({
    defaultValues: {
      description: transaction?.description || "",
      amount: transaction?.amount ? Math.abs(transaction.amount) : "",
      type: transaction?.type || "expense",
      category: transaction?.category || "",
      account: transaction?.account || "",
      date: transaction?.date || new Date().toISOString().split('T')[0],
      notes: transaction?.notes || "",
    },
  });

  const onSubmit = (data: any) => {
    // Aqui iria a lógica para salvar a transação no backend
    console.log("Form submitted:", data);
    
    toast({
      title: isEditing ? "Transação atualizada" : "Transação adicionada",
      description: `${data.description} foi ${isEditing ? "atualizada" : "adicionada"} com sucesso.`,
    });
    
    onOpenChange(false);
  };

  // Mock data para categorias e contas
  const mockCategories = [
    { id: "1", name: "Alimentação" },
    { id: "2", name: "Moradia" },
    { id: "3", name: "Transporte" },
    { id: "4", name: "Saúde" },
    { id: "5", name: "Educação" },
    { id: "6", name: "Lazer" },
    { id: "7", name: "Renda" },
    { id: "8", name: "Renda Extra" },
  ];

  const mockAccounts = [
    { id: "1", name: "Nubank" },
    { id: "2", name: "Itaú" },
    { id: "3", name: "Bradesco" },
    { id: "4", name: "Carteira" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>
              {isEditing ? "Editar Transação" : "Nova Transação"}
            </DialogTitle>
            <DialogDescription>
              {isEditing
                ? "Atualize os detalhes da transação abaixo."
                : "Preencha os detalhes da transação abaixo."}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">Descrição</Label>
              <Input
                id="description"
                {...form.register("description", { required: true })}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">Valor</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                {...form.register("amount", { required: true, min: 0 })}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">Tipo</Label>
              <Select
                value={form.watch("type")}
                onValueChange={(value) => form.setValue("type", value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="income">Receita</SelectItem>
                  <SelectItem value="expense">Despesa</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">Categoria</Label>
              <Select
                value={form.watch("category")}
                onValueChange={(value) => form.setValue("category", value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Selecione a categoria" />
                </SelectTrigger>
                <SelectContent>
                  {mockCategories.map((category) => (
                    <SelectItem key={category.id} value={category.name}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="account" className="text-right">Conta</Label>
              <Select
                value={form.watch("account")}
                onValueChange={(value) => form.setValue("account", value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Selecione a conta" />
                </SelectTrigger>
                <SelectContent>
                  {mockAccounts.map((account) => (
                    <SelectItem key={account.id} value={account.name}>
                      {account.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">Data</Label>
              <Input
                id="date"
                type="date"
                {...form.register("date", { required: true })}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="notes" className="text-right">Observações</Label>
              <Input
                id="notes"
                {...form.register("notes")}
                className="col-span-3"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">
              {isEditing ? "Salvar" : "Adicionar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionDialog;
