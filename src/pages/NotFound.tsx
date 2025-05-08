
import React, { useEffect } from 'react';
import { useLocation, Link } from "react-router-dom";
import { Button } from '@/components/ui/button';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-equilibra-background">
      <div className="text-center space-y-4">
        <div className="mb-6">
          <span className="h-16 w-16 rounded-full bg-gradient-finance flex items-center justify-center text-white font-bold text-2xl mx-auto">E</span>
        </div>
        <h1 className="text-4xl font-bold mb-2">404</h1>
        <p className="text-xl text-muted-foreground mb-6">Oops! Página não encontrada</p>
        <Link to="/">
          <Button>Voltar para o Dashboard</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
