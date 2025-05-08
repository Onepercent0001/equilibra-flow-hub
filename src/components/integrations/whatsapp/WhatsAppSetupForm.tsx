
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

interface WhatsAppSetupFormProps {
  n8nUrl: string;
  setN8nUrl: (url: string) => void;
  apiKey: string;
  setApiKey: (key: string) => void;
  whatsappNumber: string;
  setWhatsappNumber: (number: string) => void;
  isConnected: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

const WhatsAppSetupForm = ({
  n8nUrl,
  setN8nUrl,
  apiKey,
  setApiKey,
  whatsappNumber,
  setWhatsappNumber,
  isConnected,
  onSubmit
}: WhatsAppSetupFormProps) => {
  return (
    <form onSubmit={onSubmit}>
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
  );
};

export default WhatsAppSetupForm;
