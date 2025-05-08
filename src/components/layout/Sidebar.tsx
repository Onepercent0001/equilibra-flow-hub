
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  BarChart as ChartIcon, 
  WalletIcon, 
  ListIcon, 
  Settings, 
  Users,
  Calendar,
  FileText 
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', href: '/', icon: ChartIcon },
  { name: 'Transações', href: '/transactions', icon: WalletIcon },
  { name: 'Categorias', href: '/categories', icon: ListIcon },
  { name: 'Metas', href: '/goals', icon: ChartIcon },
  { name: 'Contas', href: '/accounts', icon: WalletIcon },
  { name: 'Relatórios', href: '/reports', icon: FileText },
  { name: 'Calendário', href: '/calendar', icon: Calendar },
  { name: 'Integrações', href: '/integrations', icon: Users },
  { name: 'Configurações', href: '/settings', icon: Settings },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="h-screen w-64 hidden md:flex flex-col bg-white border-r border-border/40">
      <div className="p-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="h-8 w-8 rounded-full bg-gradient-finance flex items-center justify-center text-white font-bold">E</span>
          <span className="font-bold text-xl gradient-text">Equilibra</span>
        </Link>
      </div>
      
      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                isActive 
                  ? 'bg-primary text-primary-foreground' 
                  : 'hover:bg-muted'
              )}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t">
        <div className="bg-gray-50 p-3 rounded-md">
          <div className="flex items-center gap-2 mb-2">
            <span className="h-6 w-6 rounded-full bg-gradient-finance flex items-center justify-center text-white text-xs">WA</span>
            <div className="text-sm">
              <p className="font-medium">WhatsApp</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">Configure a integração com WhatsApp para gerenciar finanças via mensagem.</p>
          <Link to="/integrations/whatsapp">
            <Button variant="outline" size="sm" className="mt-2 w-full text-xs">
              Configurar
            </Button>
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

import { Button } from '@/components/ui/button';
