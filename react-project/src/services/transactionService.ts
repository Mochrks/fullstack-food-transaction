import { axiosInstanceExpress, axiosInstanceNest } from '@/utils/config';

// express
export const getTransactionExpress = async () => {
  try {
    const response = await axiosInstanceExpress.get('/transactions');
    return response.data;
  } catch (error) {
    console.error('Error fetching transactions', error);
    throw error;
  }
};
export const deleteTransactionExpress = async (transaction_id: number) => {
  try {
    const response = await axiosInstanceExpress.delete(`/transactions/${transaction_id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting transactions', error);
    throw error;
  }
};

export const createTransactionExpress = async (transactionData: { customer_id: number; food_id: number; qty: number; }) => {
  try {
    const response = await axiosInstanceExpress.post('/transactions', transactionData);
    return response.data;
  } catch (error) {
    console.error('Error creating transactions', error);
    throw error;
  }
};


export const updateTransactionExpress = async (
  transaction_id: number,
  transactionData: {  customer_id: number; food_id: number; qty: number;}
) => {
  try {
    const response = await axiosInstanceExpress.put(`/transactions/${transaction_id}`, transactionData);
    return response.data;
  } catch (error) {
    console.error('Error updating transactions', error);
    throw error;
  }
};


// nest
export const getTransactionNest = async () => {
  try {
    const response = await axiosInstanceNest.get('/transactions');
    return response.data;
  } catch (error) {
    console.error('Error fetching transactions', error);
    throw error;
  }
};
export const deleteTransactionNest = async (transaction_id: number) => {
  try {
    const response = await axiosInstanceNest.delete(`/transactions/${transaction_id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting transactions', error);
    throw error;
  }
};

export const createTransactionNest = async (transactionData: { customer_id: number; food_id: number; qty: number; }) => {
  try {
    const response = await axiosInstanceNest.post('/transactions', transactionData);
    return response.data;
  } catch (error) {
    console.error('Error creating transactions', error);
    throw error;
  }
};


export const updateTransactionNest = async (
  transaction_id: number,
  transactionData: {  customer_id: number; food_id: number; qty: number;}
) => {
  try {
    const response = await axiosInstanceNest.put(`/transactions/${transaction_id}`, transactionData);
    return response.data;
  } catch (error) {
    console.error('Error updating transactions', error);
    throw error;
  }
};