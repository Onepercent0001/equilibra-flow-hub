
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";

interface GoalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  goal?: any; // Tipo a ser expandido quando tivermos um modelo de dados completo
}

// Mock data para categorias
const mockCategories = [
  { id: "1", name: "Economia" },
  { id: "2", name: "Lazer" },
  { id: "3", name: "Moradia" },
  { id: "4", name: "Tecnologia" },
  { id: "5", name: "Educação" },
  { id: "6", name: "Financeiro" },
  { id: "7", name: "Veículos" },
];

// Mock data para contas
const mockAccounts = [
  { id: "1", name: "Nubank" },
  { id: "2", name: "Itaú" },
  { id: "3", name: "Bradesco" },
  { id: "4", name: "Carteira" },
];

const GoalDialog = ({ open, onOpenChange, goal }: GoalDialogProps) => {
  const { toast } = useToast();
  const isEditing = Boolean(goal);
  const [activeTab, setActiveTab] = useState(goal ? "deposit" : "details");

  const detailsForm = useForm({
    defaultValues: {
      name: goal?.name || "",
      target: goal?.target || "",
      current: goal?.current || 0,
      category: goal?.category || "",
      deadline: goal?.deadline || "",
    },
  });

  const depositForm = useForm({
    defaultValues: {
      amount: "",
      account: "",
      date: new Date().toISOString().split('T')[0],
      notes: "",
    },
  });

  const onSubmitDetails = (data: any) => {
    // Aqui iria a lógica para salvar a meta no backend
    console.log("Details form submitted:", data);
    
    toast({
      title: isEditing ? "Meta atualizada" : "Meta adicionada",
      description: `${data.name} foi ${isEditing ? "atualizada" : "adicionada"} com sucesso.`,
    });
    
    onOpenChange(false);
  };

  const onSubmitDeposit = (data: any) => {
    // Aqui iria a lógica para adicionar um depósito à meta
    console.log("Deposit form submitted:", data);
    
    toast({
      title: "Depósito adicionado",
      description: `${data.amount} foi adicionado à meta ${goal?.name}.`,
    });
    
    onOpenChange(false);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        {goal ? (
          <Tabs value={activeTab} onValueChange={handleTabChange}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="details">Detalhes</TabsTrigger>
              <TabsTrigger value="deposit">Adicionar Depósito</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details">
              <form onSubmit={detailsForm.handleSubmit(onSubmitDetails)}>
                <DialogHeader>
                  <DialogTitle>Editar Meta</DialogTitle>
                  <DialogDescription>
                    Atualize os detalhes da meta abaixo.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">Nome</Label>
                    <Input
                      id="name"
                      {...detailsForm.register("name", { required: true })}
                      className="col-span-3"
                    />
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="target" className="text-right">Valor Alvo</Label>
                    <Input
                      id="target"
                      type="number"
                      step="0.01"
                      {...detailsForm.register("target", { required: true, min: 0 })}
                      className="col-span-3"
                    />
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="current" className="text-right">Valor Atual</Label>
                    <Input
                      id="current"
                      type="number"
                      step="0.01"
                      {...detailsForm.register("current", { required: true, min: 0 })}
                      className="col-span-3"
                      disabled={isEditing}
                    />
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="category" className="text-right">Categoria</Label>
                    <Select
                      value={detailsForm.watch("category")}
                      onValueChange={(value) => detailsForm.setValue("category", value)}
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
                    <Label htmlFor="deadline" className="text-right">Prazo</Label>
                    <Input
                      id="deadline"
                      type="date"
                      {...detailsForm.register("deadline", { required: true })}
                      className="col-span-3"
                    />
                  </div>
                </div>
                
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit">Salvar</Button>
                </DialogFooter>
              </form>
            </TabsContent>
            
            <TabsContent value="deposit">
              <form onSubmit={depositForm.handleSubmit(onSubmitDeposit)}>
                <DialogHeader>
                  <DialogTitle>Adicionar Depósito</DialogTitle>
                  <DialogDescription>
                    Adicione um valor à meta {goal?.name}.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="amount" className="text-right">Valor</Label>
                    <Input
                      id="amount"
                      type="number"
                      step="0.01"
                      {...depositForm.register("amount", { required: true, min: 0 })}
                      className="col-span-3"
                    />
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="account" className="text-right">Conta</Label>
                    <Select
                      value={depositForm.watch("account")}
                      onValueChange={(value) => depositForm.setValue("account", value)}
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
                      {...depositForm.register("date", { required: true })}
                      className="col-span-3"
                    />
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="notes" className="text-right">Observações</Label>
                    <Input
                      id="notes"
                      {...depositForm.register("notes")}
                      className="col-span-3"
                    />
                  </div>
                </div>
                
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit">Adicionar</Button>
                </DialogFooter>
              </form>
            </TabsContent>
          </Tabs>
        ) : (
          <form onSubmit={detailsForm.handleSubmit(onSubmitDetails)}>
            <DialogHeader>
              <DialogTitle>Nova Meta</DialogTitle>
              <DialogDescription>
                Defina os detalhes da sua meta financeira.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Nome</Label>
                <Input
                  id="name"
                  {...detailsForm.register("name", { required: true })}
                  className="col-span-3"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="target" className="text-right">Valor Alvo</Label>
                <Input
                  id="target"
                  type="number"
                  step="0.01"
                  {...detailsForm.register("target", { required: true, min: 0 })}
                  className="col-span-3"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="current" className="text-right">Valor Inicial</Label>
                <Input
                  id="current"
                  type="number"
                  step="0.01"
                  {...detailsForm.register("current", { required: true, min: 0 })}
                  className="col-span-3"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">Categoria</Label>
                <Select
                  value={detailsForm.watch("category")}
                  onValueChange={(value) => detailsForm.setValue("category", value)}
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
                <Label htmlFor="deadline" className="text-right">Prazo</Label>
                <Input
                  id="deadline"
                  type="date"
                  {...detailsForm.register("deadline", { required: true })}
                  className="col-span-3"
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button type="submit">Criar Meta</Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default GoalDialog;
