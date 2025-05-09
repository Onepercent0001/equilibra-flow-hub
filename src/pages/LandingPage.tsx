
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  BarChart3,
  CreditCard,
  LineChart,
  PiggyBank,
  Shield,
  Target,
} from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="w-full py-4 px-4 md:px-8 border-b">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-8 w-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white font-bold">
              E
            </span>
            <span className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Equilibra
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost" className="hidden md:flex">
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button>Começar Grátis</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 bg-gradient-to-b from-background to-muted/30">
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-24 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                Seu caminho para a{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                  liberdade financeira
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                Organize suas finanças, defina metas e acompanhe seu progresso em um único lugar.
                Equilibra é a solução completa para sua vida financeira.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <Link to="/register">
                  <Button size="lg" className="w-full sm:w-auto">
                    Começar Grátis <ArrowRight className="ml-2" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Fazer Login
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <img
                src="/placeholder.svg"
                alt="Equilibra Dashboard"
                className="rounded-lg shadow-xl"
                width={600}
                height={400}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Tudo o que você precisa para suas finanças</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Equilibra oferece ferramentas poderosas e fáceis de usar para ajudá-lo a gerenciar suas finanças
              pessoais e atingir seus objetivos financeiros.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<CreditCard className="h-8 w-8" />}
              title="Controle de Gastos"
              description="Acompanhe suas despesas e entenda onde seu dinheiro está sendo gasto."
            />
            <FeatureCard
              icon={<LineChart className="h-8 w-8" />}
              title="Relatórios Detalhados"
              description="Visualize sua situação financeira com gráficos e relatórios intuitivos."
            />
            <FeatureCard
              icon={<PiggyBank className="h-8 w-8" />}
              title="Gestão de Contas"
              description="Organize suas contas bancárias, cartões e investimentos em um só lugar."
            />
            <FeatureCard
              icon={<Target className="h-8 w-8" />}
              title="Metas Financeiras"
              description="Defina objetivos e acompanhe seu progresso para conquistar seus sonhos."
            />
            <FeatureCard
              icon={<BarChart3 className="h-8 w-8" />}
              title="Categorias Personalizadas"
              description="Organize suas transações com categorias que fazem sentido para você."
            />
            <FeatureCard
              icon={<Shield className="h-8 w-8" />}
              title="Segurança Garantida"
              description="Seus dados financeiros protegidos com os mais altos padrões de segurança."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="max-w-3xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Comece sua jornada financeira hoje</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Junte-se a milhares de pessoas que já estão no caminho da liberdade financeira com o Equilibra.
          </p>
          <Link to="/register">
            <Button size="lg">Criar Conta Grátis</Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-4 md:px-8 border-t">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <span className="h-8 w-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white font-bold">
                E
              </span>
              <span className="font-bold text-xl">Equilibra</span>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-foreground">
                Termos de Uso
              </Link>
              <Link to="/" className="hover:text-foreground">
                Política de Privacidade
              </Link>
              <Link to="/" className="hover:text-foreground">
                Contato
              </Link>
              <div>© 2023 Equilibra. Todos os direitos reservados.</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Feature Card Component
const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="p-6 border rounded-lg bg-card hover:shadow-md transition-shadow">
      <div className="text-primary mb-4">{icon}</div>
      <h3 className="text-xl font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default LandingPage;
