
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      terms: false,
    },
  });

  const onSubmit = (data: any) => {
    console.log('Register form submitted:', data);
    
    // Verificar se o usuário concordou com os termos
    if (!data.terms) {
      toast({
        title: 'Termo obrigatório',
        description: 'Você deve concordar com os termos e condições.',
        variant: 'destructive',
      });
      return;
    }
    
    // Simulação de registro bem-sucedido
    toast({
      title: 'Registro concluído',
      description: 'Sua conta foi criada com sucesso.',
    });
    
    // Em uma implementação real, redirecionaria para o login ou dashboard
    navigate('/dashboard');
  };

  const handleGoogleRegister = () => {
    // Em uma implementação real, isso seria conectado ao provedor OAuth do Google
    console.log('Google register clicked');
    
    // Simulação de registro bem-sucedido
    toast({
      title: 'Registro com Google',
      description: 'Sua conta foi criada com sucesso usando Google.',
    });
    
    // Redirecionar para o dashboard
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-equilibra-background p-4">
      <div className="text-center mb-8">
        <Link to="/" className="inline-block">
          <div className="flex items-center gap-2 mb-2">
            <span className="h-8 w-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white font-bold">E</span>
            <span className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Equilibra</span>
          </div>
        </Link>
        <p className="text-muted-foreground">Seu assistente financeiro pessoal</p>
      </div>
      
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Criar conta</CardTitle>
          <CardDescription className="text-center">
            Preencha os dados abaixo para se registrar
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            variant="outline"
            type="button"
            onClick={handleGoogleRegister}
            className="w-full flex items-center justify-center gap-2 py-5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-google"
            >
              <path d="M12 22C6.5 22 2 17.5 2 12S6.5 2 12 2s10 4.5 10 10-4.5 10-10 10z" />
              <path d="M12 8v4" />
              <path d="M12 16h.01" />
            </svg>
            Continuar com Google
          </Button>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Ou continue com e-mail
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input 
                id="name" 
                placeholder="Seu nome completo"
                {...register('name', { 
                  required: 'Nome é obrigatório',
                })}
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name.message as string}</p>
              )}
            </div>
            
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
            
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="••••••••"
                {...register('password', { 
                  required: 'Senha é obrigatória',
                  minLength: {
                    value: 8,
                    message: 'Senha deve ter pelo menos 8 caracteres',
                  },
                })}
              />
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password.message as string}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar senha</Label>
              <Input 
                id="confirmPassword" 
                type="password" 
                placeholder="••••••••"
                {...register('confirmPassword', { 
                  required: 'Confirmação de senha é obrigatória',
                  validate: (val: string) => {
                    if (watch('password') !== val) {
                      return "As senhas não coincidem";
                    }
                  }
                })}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-destructive">{errors.confirmPassword.message as string}</p>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" {...register('terms')} />
              <Label htmlFor="terms" className="text-sm font-normal">
                Concordo com os{' '}
                <a href="#" className="text-primary hover:underline">
                  termos de uso
                </a>{' '}
                e{' '}
                <a href="#" className="text-primary hover:underline">
                  política de privacidade
                </a>
              </Label>
            </div>
            
            <Button type="submit" className="w-full">
              Criar conta
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="text-sm text-center text-muted-foreground">
            Já tem uma conta?{' '}
            <Link to="/login" className="text-primary hover:underline">
              Faça login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
