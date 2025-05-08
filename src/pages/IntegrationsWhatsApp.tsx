
import React from 'react';
import Layout from '@/components/layout/Layout';
import WhatsAppIntegration from '@/components/integrations/WhatsAppIntegration';

const IntegrationsWhatsApp = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Integração WhatsApp</h1>
          <p className="text-muted-foreground mt-2">
            Configure a integração entre o Equilibra e o WhatsApp via n8n
          </p>
        </div>
        
        <WhatsAppIntegration />
      </div>
    </Layout>
  );
};

export default IntegrationsWhatsApp;
