
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const { signIn, loading } = useAuth();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    await signIn(values.email, values.password);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-equilibra-primary/10 to-equilibra-secondary/10 p-4">
      <div className="w-full max-w-md">
        <Card className="border-equilibra-primary/20">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Entrar no Equilibra</CardTitle>
            <CardDescription className="text-center">
              Entre com seu email e senha para acessar sua conta
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="seu@email.com" type="email" {...field} disabled={loading} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Senha</FormLabel>
                      <FormControl>
                        <Input placeholder="••••••••" type="password" {...field} disabled={loading} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Entrando..." : "Entrar"}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <div className="text-center text-sm">
              <Link to="/forgot-password" className="text-equilibra-primary hover:underline">
                Esqueceu sua senha?
              </Link>
            </div>
            <div className="text-center text-sm">
              Não tem uma conta?{' '}
              <Link to="/register" className="text-equilibra-primary hover:underline">
                Cadastre-se
              </Link>
            </div>
            <div className="text-center text-sm">
              <Link to="/" className="text-gray-500 hover:underline">
                Voltar para a página inicial
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
