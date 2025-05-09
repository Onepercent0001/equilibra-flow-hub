
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { ArrowLeft } from 'lucide-react';

const ForgotPassword = () => {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (data: any) => {
    console.log('Forgot password form submitted:', data);
    
    // Simulação de envio de e-mail de recuperação
    toast({
      title: 'E-mail enviado',
      description: 'Instruções para recuperação de senha foram enviadas para seu e-mail.',
    });
    
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-equilibra-background p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-primary">Equilibra</h1>
        <p className="text-muted-foreground">Seu assistente financeiro pessoal</p>
      </div>
      
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Recuperar senha</CardTitle>
          <CardDescription className="text-center">
            {!isSubmitted 
              ? "Digite seu e-mail e enviaremos instruções para redefinir sua senha"
              : "Verifique seu e-mail para instruções de recuperação"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isSubmitted ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="seu@email.com"
                  {...register('email', { 
                    required: 'E-mail é obrigatório',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'E-mail inválido',
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message as string}</p>
                )}
              </div>
              
              <Button type="submit" className="w-full">
                Enviar instruções
              </Button>
            </form>
          ) : (
            <div className="text-center space-y-4">
              <p className="text-sm text-muted-foreground">
                Um e-mail com instruções para redefinir sua senha foi enviado para o endereço fornecido.
                Por favor, verifique sua caixa de entrada e siga as instruções.
              </p>
              
              <Button 
                onClick={() => setIsSubmitted(false)} 
                variant="outline" 
                className="w-full"
              >
                Tentar novamente
              </Button>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="text-sm text-center text-muted-foreground">
            <Link to="/login" className="flex items-center justify-center gap-1 text-primary hover:underline">
              <ArrowLeft className="h-4 w-4" />
              Voltar para o login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ForgotPassword;
