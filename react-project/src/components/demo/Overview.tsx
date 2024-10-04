import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { UsersRound, Utensils, Captions } from 'lucide-react';

import { getCustomersExpress } from '@/services/customerService';
import { getFoodExpress } from '@/services/foodService';
import { getTransactionExpress } from '@/services/transactionService';
import { useEffect, useState } from 'react';

export const Overview = () => {
    const [customerCount, setCustomerCount] = useState(0);
    const [foodCount, setFoodCount] = useState(0);
    const [transactionCount, setTransactionCount] = useState(0);


    useEffect(() => {
        const fetchData = async () => {
            try {

                const [customers, foods, transactions] = await Promise.all([
                    getCustomersExpress(),
                    getFoodExpress(),
                    getTransactionExpress(),
                ]);

                setCustomerCount(customers.totalData);
                setFoodCount(foods.totalData);
                setTransactionCount(transactions.totalData);
            } catch (error) {
                console.error('Error fetching overview data', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1 className="text-3xl font-semibold mb-6 dark:text-white">Dashboard Overview</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Customer</CardTitle>
                        <UsersRound className='w-5 h-5 ' />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{customerCount}</div>

                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Food</CardTitle>
                        <Utensils className='w-5 h-5 ' />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{foodCount}</div>

                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Transaction</CardTitle>
                        <Captions className='w-5 h-5 ' />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{transactionCount}</div>

                    </CardContent>
                </Card>

            </div>
        </div>
    )
}
