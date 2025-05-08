
import React from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';

const WhatsAppEndpoints = () => {
  return (
    <div className="space-y-4">
      <p className="text-sm mb-4">
        Endpoints REST para integração com n8n:
      </p>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Método</TableHead>
            <TableHead>Endpoint</TableHead>
            <TableHead>Descrição</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">POST</TableCell>
            <TableCell>/api/whatsapp/transaction</TableCell>
            <TableCell>Processar mensagem de transação</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">GET</TableCell>
            <TableCell>/api/whatsapp/balance</TableCell>
            <TableCell>Consultar saldo atual</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">GET</TableCell>
            <TableCell>/api/whatsapp/goals</TableCell>
            <TableCell>Consultar metas financeiras</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">POST</TableCell>
            <TableCell>/api/whatsapp/reminder</TableCell>
            <TableCell>Criar/disparar lembrete</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">GET</TableCell>
            <TableCell>/api/whatsapp/help</TableCell>
            <TableCell>Obter comandos disponíveis</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      
      <div className="mt-4 p-4 bg-muted rounded-md">
        <h4 className="font-medium mb-2">Exemplo de Payload para Transação:</h4>
        <pre className="text-xs overflow-auto p-2 bg-background rounded">
{`{
  "message": "Gastei 150 reais no mercado",
  "user_id": "user123"
}
`}
        </pre>
      </div>
    </div>
  );
};

export default WhatsAppEndpoints;
