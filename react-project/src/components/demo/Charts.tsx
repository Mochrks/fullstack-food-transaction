import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { getCustomersExpress } from '@/services/customerService';
import { getFoodExpress } from '@/services/foodService';
import { getTransactionExpress } from '@/services/transactionService';
import { useEffect, useState } from 'react';

export const Charts = () => {

    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch data dari  API
                const [customers, foods, transactions] = await Promise.all([
                    getCustomersExpress(),
                    getFoodExpress(),
                    getTransactionExpress(),
                ]);

                const formattedData = [
                    {
                        data: 'Data',
                        customer: customers.totalData,
                        foods: foods.totalData,
                        transaction: transactions.totalData,
                    }
                ];

                setChartData(formattedData);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };

        fetchData();
    }, []);
    return (
        <div>
            <div className="mb-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Statistics</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="data" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="customer" fill="#8884d8" />
                                <Bar dataKey="foods" fill="#82ca9d" />
                                <Bar dataKey="transaction" fill="#A14ED4" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
