
import React from 'react';
import Layout from '@/components/layout/Layout';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Profile = () => {
  const { toast } = useToast();
  
  const profileForm = useForm({
    defaultValues: {
      name: 'João Silva',
      email: 'joao.silva@example.com',
      phone: '(11) 98765-4321',
    },
  });
  
  const passwordForm = useForm({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });
  
  const preferencesForm = useForm({
    defaultValues: {
      currency: 'BRL',
      language: 'pt-BR',
      notifications: true,
    },
  });

  const onSubmitProfile = (data: any) => {
    console.log('Profile form submitted:', data);
    toast({
      title: 'Perfil atualizado',
      description: 'Suas informações foram atualizadas com sucesso.',
    });
  };
  
  const onSubmitPassword = (data: any) => {
    console.log('Password form submitted:', data);
    toast({
      title: 'Senha atualizada',
      description: 'Sua senha foi alterada com sucesso.',
    });
    passwordForm.reset({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };
  
  const onSubmitPreferences = (data: any) => {
    console.log('Preferences form submitted:', data);
    toast({
      title: 'Preferências atualizadas',
      description: 'Suas preferências foram atualizadas com sucesso.',
    });
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Perfil</h1>
          <p className="text-muted-foreground mt-2">
            Gerencie suas informações pessoais e preferências
          </p>
        </div>
        
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList>
            <TabsTrigger value="profile">Informações</TabsTrigger>
            <TabsTrigger value="password">Senha</TabsTrigger>
            <TabsTrigger value="preferences">Preferências</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Informações Pessoais</CardTitle>
                <CardDescription>
                  Atualize suas informações pessoais de perfil
                </CardDescription>
              </CardHeader>
              <form onSubmit={profileForm.handleSubmit(onSubmitProfile)}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome</Label>
                    <Input 
                      id="name" 
                      {...profileForm.register('name', { required: true })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input 
                      id="email" 
                      type="email"
                      {...profileForm.register('email', { 
                        required: true, 
                        pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i 
                      })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input 
                      id="phone" 
                      {...profileForm.register('phone')}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit">Salvar alterações</Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          
          <TabsContent value="password">
            <Card>
              <CardHeader>
                <CardTitle>Alterar senha</CardTitle>
                <CardDescription>
                  Atualize sua senha para maior segurança
                </CardDescription>
              </CardHeader>
              <form onSubmit={passwordForm.handleSubmit(onSubmitPassword)}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Senha atual</Label>
                    <Input 
                      id="currentPassword" 
                      type="password"
                      {...passwordForm.register('currentPassword', { required: true })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">Nova senha</Label>
                    <Input 
                      id="newPassword" 
                      type="password"
                      {...passwordForm.register('newPassword', { 
                        required: true,
                        minLength: 8
                      })}
                    />
                    <p className="text-sm text-muted-foreground">
                      A senha deve ter pelo menos 8 caracteres
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmar nova senha</Label>
                    <Input 
                      id="confirmPassword" 
                      type="password"
                      {...passwordForm.register('confirmPassword', {
                        required: true,
                        validate: (val: string) => {
                          if (passwordForm.watch('newPassword') !== val) {
                            return "As senhas não coincidem";
                          }
                        }
                      })}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit">Alterar senha</Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          
          <TabsContent value="preferences">
            <Card>
              <CardHeader>
                <CardTitle>Preferências</CardTitle>
                <CardDescription>
                  Configure suas preferências de uso do sistema
                </CardDescription>
              </CardHeader>
              <form onSubmit={preferencesForm.handleSubmit(onSubmitPreferences)}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currency">Moeda</Label>
                    <Select
                      value={preferencesForm.watch('currency')}
                      onValueChange={(value) => preferencesForm.setValue('currency', value)}
                    >
                      <SelectTrigger id="currency">
                        <SelectValue placeholder="Selecione a moeda" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="BRL">Real (R$)</SelectItem>
                        <SelectItem value="USD">Dólar ($)</SelectItem>
                        <SelectItem value="EUR">Euro (€)</SelectItem>
                        <SelectItem value="GBP">Libra (£)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="language">Idioma</Label>
                    <Select
                      value={preferencesForm.watch('language')}
                      onValueChange={(value) => preferencesForm.setValue('language', value)}
                    >
                      <SelectTrigger id="language">
                        <SelectValue placeholder="Selecione o idioma" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                        <SelectItem value="en-US">Inglês (EUA)</SelectItem>
                        <SelectItem value="es">Espanhol</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit">Salvar preferências</Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Profile;
