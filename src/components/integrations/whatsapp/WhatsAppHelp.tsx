
import React from 'react';

const WhatsAppHelp = () => {
  return (
    <div className="space-y-4">
      <p className="text-sm">
        O assistente no WhatsApp do Equilibra permite que você:
      </p>
      
      <ul className="list-disc pl-5 space-y-2 text-sm">
        <li>Registre transações enviando mensagens simples (ex: "Gastei 150 reais no mercado")</li>
        <li>Consulte seu saldo atual, metas e histórico financeiro</li>
        <li>Receba lembretes automáticos de vencimentos e pagamentos</li>
        <li>Obtenha relatórios financeiros via mensagem</li>
      </ul>

      <div className="p-4 bg-muted rounded-md mt-4">
        <h4 className="font-medium mb-2">Como funciona:</h4>
        <ol className="list-decimal pl-5 space-y-2 text-sm">
          <li>Configure o número de WhatsApp e o webhook do n8n nas configurações</li>
          <li>No n8n, crie um fluxo que utilize os endpoints da API Equilibra</li>
          <li>Conecte o webhook às ações apropriadas (processamento de mensagens, consultas, etc.)</li>
          <li>Teste enviando uma mensagem para o número configurado</li>
        </ol>
      </div>
      
      <div className="p-4 bg-muted rounded-md mt-4">
        <h4 className="font-medium mb-2">Endpoints disponíveis:</h4>
        <ul className="list-disc pl-5 space-y-2 text-sm">
          <li><strong>POST /api/whatsapp/transaction</strong> - Registrar uma nova transação via texto</li>
          <li><strong>GET /api/whatsapp/balance</strong> - Consultar saldo atual</li>
          <li><strong>GET /api/whatsapp/goals</strong> - Listar metas ativas</li>
          <li><strong>GET /api/whatsapp/transactions</strong> - Histórico de transações recentes</li>
          <li><strong>POST /api/whatsapp/reminder</strong> - Criar ou disparar lembretes</li>
        </ul>
      </div>
    </div>
  );
};

export default WhatsAppHelp;
