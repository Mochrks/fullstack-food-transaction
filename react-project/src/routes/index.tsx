import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';

import { NotFound } from '@/components/demo/NotFound';
import { Customer } from '@/pages/express/Customer';
import { Dashboard } from '@/pages/express/Dashboard';
import { Food } from '@/pages/express/Food';
import { Transaction } from '@/pages/express/Transaction';

import { DashboardNest } from '@/pages/nest/Dashboard';
import { FoodNest } from '@/pages/nest/Food';
import { TransactionNest } from '@/pages/nest/Transaction';
import { CustomerNest } from '@/pages/nest/Customer';


const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/customer" element={<Customer />} />
            <Route path="/foods" element={<Food />} />
            <Route path="/transaction" element={<Transaction />} />
            <Route path="/nest/dashboard" element={<DashboardNest />} />
            <Route path="/nest/customer" element={<CustomerNest />} />
            <Route path="/nest/foods" element={<FoodNest />} />
            <Route path="/nest/transaction" element={<TransactionNest />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRoutes;