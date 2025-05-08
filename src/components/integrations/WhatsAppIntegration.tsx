
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';

const WhatsAppIntegration = () => {
  const { toast } = useToast();
  const [n8nUrl, setN8nUrl] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  const handleConnect = (e: React.FormEvent) => {
    e.preventDefault();
    if (!n8nUrl || !apiKey) {
      toast({
        title: "Erro de conexão",
        description: "Por favor, preencha todas as informações necessárias.",
        variant: "destructive",
      });
      return;
    }

    // Simulating a successful connection
    setIsConnected(true);
    toast({
      title: "Configuração salva!",
      description: "As configurações de integração com WhatsApp foram salvas com sucesso.",
    });
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">Integração com WhatsApp</CardTitle>
            <CardDescription>
              Configure a integração com WhatsApp para interação via mensagem de texto
            </CardDescription>
          </div>
          {isConnected && (
            <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
              Configurado
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="setup">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="setup">Configuração</TabsTrigger>
            <TabsTrigger value="commands">Comandos</TabsTrigger>
            <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
            <TabsTrigger value="help">Ajuda</TabsTrigger>
          </TabsList>
          <TabsContent value="setup" className="space-y-4 py-4">
            <form onSubmit={handleConnect}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="whatsappNumber" className="text-sm font-medium">Número do WhatsApp</label>
                  <Input 
                    id="whatsappNumber" 
                    placeholder="+55 (11) 99999-9999" 
                    value={whatsappNumber} 
                    onChange={(e) => setWhatsappNumber(e.target.value)} 
                  />
                  <p className="text-xs text-muted-foreground">
                    Número de WhatsApp que será usado para enviar e receber mensagens
                  </p>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="n8nUrl" className="text-sm font-medium">URL do webhook n8n</label>
                  <Input 
                    id="n8nUrl" 
                    placeholder="https://seu-servidor-n8n.com/webhook/..." 
                    value={n8nUrl} 
                    onChange={(e) => setN8nUrl(e.target.value)} 
                  />
                  <p className="text-xs text-muted-foreground">
                    URL do webhook n8n que irá processar as mensagens do WhatsApp
                  </p>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="apiKey" className="text-sm font-medium">Chave de API</label>
                  <Input 
                    id="apiKey" 
                    type="password" 
                    placeholder="sua-chave-secreta" 
                    value={apiKey} 
                    onChange={(e) => setApiKey(e.target.value)} 
                  />
                  <p className="text-xs text-muted-foreground">
                    Chave de segurança para autenticar as requisições
                  </p>
                </div>

                <Button type="submit" className="w-full">
                  {isConnected ? 'Atualizar Configuração' : 'Salvar Configuração'}
                </Button>
              </div>
            </form>
          </TabsContent>
          
          <TabsContent value="commands" className="py-4">
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
          </TabsContent>
          
          <TabsContent value="endpoints" className="py-4">
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
          </TabsContent>

          <TabsContent value="help" className="py-4">
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
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <div className="text-sm text-muted-foreground">
          <p>Observação: O número de WhatsApp é gerenciado pelo administrador do sistema. Os usuários apenas interagem com o número configurado, sem precisarem fazer configurações adicionais.</p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default WhatsAppIntegration;
