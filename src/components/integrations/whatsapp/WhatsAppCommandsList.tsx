
import React from 'react';

const WhatsAppCommandsList = () => {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Comandos disponíveis para interagir com o Equilibra via WhatsApp:
      </p>
      
      <div className="border rounded-md divide-y">
        <div className="p-3 flex justify-between items-center">
          <code className="bg-muted p-1 rounded text-sm">#saldo</code>
          <span className="text-sm text-muted-foreground">Consulta seu saldo atual</span>
        </div>
        <div className="p-3 flex justify-between items-center">
          <code className="bg-muted p-1 rounded text-sm">#gastei [valor] [categoria] [descrição]</code>
          <span className="text-sm text-muted-foreground">Registra uma despesa</span>
        </div>
        <div className="p-3 flex justify-between items-center">
          <code className="bg-muted p-1 rounded text-sm">#recebi [valor] [categoria] [descrição]</code>
          <span className="text-sm text-muted-foreground">Registra uma receita</span>
        </div>
        <div className="p-3 flex justify-between items-center">
          <code className="bg-muted p-1 rounded text-sm">#metas</code>
          <span className="text-sm text-muted-foreground">Lista suas metas financeiras</span>
        </div>
        <div className="p-3 flex justify-between items-center">
          <code className="bg-muted p-1 rounded text-sm">#relatorio [mês]</code>
          <span className="text-sm text-muted-foreground">Gera um relatório mensal</span>
        </div>
        <div className="p-3 flex justify-between items-center">
          <code className="bg-muted p-1 rounded text-sm">#lembrete [data] [descrição]</code>
          <span className="text-sm text-muted-foreground">Cria um novo lembrete</span>
        </div>
        <div className="p-3 flex justify-between items-center">
          <code className="bg-muted p-1 rounded text-sm">#ajuda</code>
          <span className="text-sm text-muted-foreground">Lista todos os comandos disponíveis</span>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppCommandsList;
