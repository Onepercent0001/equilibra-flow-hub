
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

interface AccountDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  account?: any; // Tipo a ser expandido quando tivermos um modelo de dados completo
}

const COLORS = [
  { name: "Roxo", value: "#8b5cf6" },
  { name: "Azul", value: "#3b82f6" },
  { name: "Verde", value: "#10b981" },
  { name: "Laranja", value: "#f97316" },
  { name: "Vermelho", value: "#ef4444" },
  { name: "Rosa", value: "#ec4899" },
  { name: "Amarelo", value: "#eab308" },
  { name: "Roxo Nubank", value: "#820ad1" },
  { name: "Laranja Itaú", value: "#ec7000" },
  { name: "Vermelho Bradesco", value: "#cc092f" },
];

const ACCOUNT_TYPES = [
  { label: "Conta Corrente", value: "checking" },
  { label: "Conta Poupança", value: "savings" },
  { label: "Investimentos", value: "investment" },
  { label: "Carteira", value: "wallet" },
  { label: "Cartão de Crédito", value: "credit_card" },
];

const AccountDialog = ({ open, onOpenChange, account }: AccountDialogProps) => {
  const { toast } = useToast();
  const isEditing = Boolean(account);

  const form = useForm({
    defaultValues: {
      name: account?.name || "",
      type: account?.type || "checking",
      balance: account?.balance || 0,
      color: account?.color || "#3b82f6",
    },
  });

  const onSubmit = (data: any) => {
    // Aqui iria a lógica para salvar a conta no backend
    console.log("Form submitted:", data);
    
    toast({
      title: isEditing ? "Conta atualizada" : "Conta adicionada",
      description: `${data.name} foi ${isEditing ? "atualizada" : "adicionada"} com sucesso.`,
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>
              {isEditing ? "Editar Conta" : "Nova Conta"}
            </DialogTitle>
            <DialogDescription>
              {isEditing
                ? "Atualize os detalhes da conta abaixo."
                : "Preencha os detalhes da conta abaixo."}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Nome</Label>
              <Input
                id="name"
                {...form.register("name", { required: true })}
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
                  {ACCOUNT_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="balance" className="text-right">Saldo Inicial</Label>
              <Input
                id="balance"
                type="number"
                step="0.01"
                {...form.register("balance", { required: true })}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="color" className="text-right">Cor</Label>
              <Select
                value={form.watch("color")}
                onValueChange={(value) => form.setValue("color", value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Selecione a cor">
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: form.watch("color") }} 
                      />
                      <span>
                        {COLORS.find(c => c.value === form.watch("color"))?.name || "Cor"}
                      </span>
                    </div>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {COLORS.map((color) => (
                    <SelectItem key={color.value} value={color.value}>
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: color.value }} 
                        />
                        <span>{color.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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

export default AccountDialog;
