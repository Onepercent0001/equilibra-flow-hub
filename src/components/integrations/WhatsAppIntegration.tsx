
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

const WhatsAppIntegration = () => {
  const { toast } = useToast();
  const [n8nUrl, setN8nUrl] = useState('');
  const [apiKey, setApiKey] = useState('');
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
      title: "Conexão estabelecida!",
      description: "Sua integração com WhatsApp via n8n foi configurada com sucesso.",
    });
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">Integração com WhatsApp</CardTitle>
            <CardDescription>
              Configure a integração com WhatsApp para gerenciar suas finanças através de mensagens
            </CardDescription>
          </div>
          {isConnected && (
            <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
              Conectado
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="setup">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="setup">Configuração</TabsTrigger>
            <TabsTrigger value="commands">Comandos</TabsTrigger>
            <TabsTrigger value="api">API</TabsTrigger>
          </TabsList>
          <TabsContent value="setup" className="space-y-4 py-4">
            <form onSubmit={handleConnect}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="n8nUrl" className="text-sm font-medium">URL do n8n</label>
                  <Input 
                    id="n8nUrl" 
                    placeholder="https://seu-servidor-n8n.com/webhook/..." 
                    value={n8nUrl} 
                    onChange={(e) => setN8nUrl(e.target.value)} 
                  />
                  <p className="text-xs text-muted-foreground">
                    URL do seu webhook n8n que irá receber as mensagens do WhatsApp
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
                  {isConnected ? 'Reconectar' : 'Conectar'}
                </Button>
              </div>
            </form>
          </TabsContent>
          
          <TabsContent value="commands" className="py-4">
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Estes são os comandos disponíveis para interagir com o Equilibra via WhatsApp:
              </p>
              
              <div className="border rounded-md divide-y">
                <div className="p-3 flex justify-between">
                  <code className="bg-muted p-1 rounded text-sm">#saldo</code>
                  <span className="text-sm text-muted-foreground">Consulta seu saldo atual</span>
                </div>
                <div className="p-3 flex justify-between">
                  <code className="bg-muted p-1 rounded text-sm">#nova [valor] [categoria] [descrição]</code>
                  <span className="text-sm text-muted-foreground">Registra uma nova despesa</span>
                </div>
                <div className="p-3 flex justify-between">
                  <code className="bg-muted p-1 rounded text-sm">#receita [valor] [categoria] [descrição]</code>
                  <span className="text-sm text-muted-foreground">Registra uma nova receita</span>
                </div>
                <div className="p-3 flex justify-between">
                  <code className="bg-muted p-1 rounded text-sm">#metas</code>
                  <span className="text-sm text-muted-foreground">Lista suas metas financeiras</span>
                </div>
                <div className="p-3 flex justify-between">
                  <code className="bg-muted p-1 rounded text-sm">#relatório [mês]</code>
                  <span className="text-sm text-muted-foreground">Gera um relatório mensal</span>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="api" className="py-4">
            <div className="space-y-4">
              <p className="text-sm">
                Abaixo estão os principais endpoints disponíveis para integração com o n8n:
              </p>
              
              <div className="border rounded-md overflow-hidden">
                <div className="bg-muted p-3 border-b">
                  <span className="font-medium">GET</span> <code className="text-sm">/api/v1/transactions</code>
                </div>
                <div className="p-3">
                  <p className="text-sm">Retorna a lista de transações do usuário</p>
                  <div className="mt-2">
                    <Badge variant="outline" className="text-xs">Requer autenticação</Badge>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-md overflow-hidden">
                <div className="bg-muted p-3 border-b">
                  <span className="font-medium">POST</span> <code className="text-sm">/api/v1/transactions</code>
                </div>
                <div className="p-3">
                  <p className="text-sm">Cria uma nova transação</p>
                  <div className="mt-2 space-x-2">
                    <Badge variant="outline" className="text-xs">Requer autenticação</Badge>
                    <Badge variant="outline" className="text-xs">JSON</Badge>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-md overflow-hidden">
                <div className="bg-muted p-3 border-b">
                  <span className="font-medium">GET</span> <code className="text-sm">/api/v1/accounts/balance</code>
                </div>
                <div className="p-3">
                  <p className="text-sm">Consulta o saldo atual das contas</p>
                  <div className="mt-2">
                    <Badge variant="outline" className="text-xs">Requer autenticação</Badge>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-md overflow-hidden">
                <div className="bg-muted p-3 border-b">
                  <span className="font-medium">GET</span> <code className="text-sm">/api/v1/goals</code>
                </div>
                <div className="p-3">
                  <p className="text-sm">Lista as metas financeiras</p>
                  <div className="mt-2">
                    <Badge variant="outline" className="text-xs">Requer autenticação</Badge>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-md overflow-hidden">
                <div className="bg-muted p-3 border-b">
                  <span className="font-medium">POST</span> <code className="text-sm">/api/v1/webhook/whatsapp</code>
                </div>
                <div className="p-3">
                  <p className="text-sm">Endpoint para receber mensagens do WhatsApp</p>
                  <div className="mt-2 space-x-2">
                    <Badge variant="outline" className="text-xs">Requer API Key</Badge>
                    <Badge variant="outline" className="text-xs">Webhook</Badge>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <div className="text-sm text-muted-foreground">
          <p>Para configurar a integração com o WhatsApp você precisará:</p>
          <ol className="list-decimal pl-4 mt-1 space-y-1">
            <li>Criar um fluxo no n8n para conectar o WhatsApp</li>
            <li>Configurar os webhooks para receber e enviar mensagens</li>
            <li>Definir a chave de API para segurança</li>
          </ol>
        </div>
      </CardFooter>
    </Card>
  );
};

export default WhatsAppIntegration;
