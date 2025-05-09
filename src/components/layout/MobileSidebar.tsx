
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  BarChart as ChartIcon, 
  WalletIcon, 
  ListIcon, 
  Settings, 
  FileText,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const navItems = [
  { name: 'Dashboard', href: '/', icon: ChartIcon },
  { name: 'Transações', href: '/transactions', icon: WalletIcon },
  { name: 'Categorias', href: '/categories', icon: ListIcon },
  { name: 'Metas', href: '/goals', icon: ChartIcon },
  { name: 'Contas', href: '/accounts', icon: WalletIcon },
  { name: 'Relatórios', href: '/reports', icon: FileText },
  { name: 'Configurações', href: '/settings', icon: Settings },
];

const MobileSidebar = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden fixed bottom-4 right-4 h-12 w-12 rounded-full z-50 bg-gradient-finance text-white shadow-lg">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs p-0">
          <div className="h-full flex flex-col">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
                  <span className="h-8 w-8 rounded-full bg-gradient-finance flex items-center justify-center text-white font-bold">E</span>
                  <span className="font-bold text-xl gradient-text">Equilibra</span>
                </Link>
                <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <nav className="flex-1 overflow-y-auto py-4 px-4 space-y-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setOpen(false)}
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
                  <div className="text-sm">
                    <p className="font-medium">Dica do dia</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">Categorizar suas despesas ajuda a identificar padrões e oportunidades para economizar.</p>
                <Button variant="outline" size="sm" className="mt-2 w-full text-xs" onClick={() => setOpen(false)}>
                  Saiba mais
                </Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileSidebar;
