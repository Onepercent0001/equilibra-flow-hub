
import React from 'react';
import Layout from '@/components/layout/Layout';

const Transactions = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Transações</h1>
          <p className="text-muted-foreground mt-2">
            Gerencie suas receitas e despesas
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-center text-muted-foreground py-10">
            Interface de transações em construção...
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Transactions;
