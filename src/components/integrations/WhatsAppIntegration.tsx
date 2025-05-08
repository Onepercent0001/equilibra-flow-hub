
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

// Import the smaller components
import WhatsAppSetupForm from './whatsapp/WhatsAppSetupForm';
import WhatsAppCommandsList from './whatsapp/WhatsAppCommandsList';
import WhatsAppEndpoints from './whatsapp/WhatsAppEndpoints';
import WhatsAppHelp from './whatsapp/WhatsAppHelp';

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
            <WhatsAppSetupForm 
              n8nUrl={n8nUrl}
              setN8nUrl={setN8nUrl}
              apiKey={apiKey}
              setApiKey={setApiKey}
              whatsappNumber={whatsappNumber}
              setWhatsappNumber={setWhatsappNumber}
              isConnected={isConnected}
              onSubmit={handleConnect}
            />
          </TabsContent>
          
          <TabsContent value="commands" className="py-4">
            <WhatsAppCommandsList />
          </TabsContent>
          
          <TabsContent value="endpoints" className="py-4">
            <WhatsAppEndpoints />
          </TabsContent>

          <TabsContent value="help" className="py-4">
            <WhatsAppHelp />
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
