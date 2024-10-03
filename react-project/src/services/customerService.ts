import { axiosInstanceExpress, axiosInstanceNest } from '@/utils/config';

// express
export const getCustomersExpress = async () => {
  try {
    const response = await axiosInstanceExpress.get('/customers');
    return response.data;
  } catch (error) {
    console.error('Error fetching customers', error);
    throw error;
  }
};
export const deleteCustomersExpress = async (customerId: number) => {
  try {
    const response = await axiosInstanceExpress.delete(`/customers/${customerId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting customer', error);
    throw error;
  }
};

export const createCustomersExpress = async (customerData: { name: string; phone: string; address: string; }) => {
  try {
    const response = await axiosInstanceExpress.post('/customers', customerData);
    return response.data;
  } catch (error) {
    console.error('Error creating customer', error);
    throw error;
  }
};


export const updateCustomersExpress = async (
  customerId: number,
  customerData: { name: string; phone: string; address: string; }
) => {
  try {
    const response = await axiosInstanceExpress.put(`/customers/${customerId}`, customerData);
    return response.data;
  } catch (error) {
    console.error('Error updating customer', error);
    throw error;
  }
};


// nest js
export const getCustomersNest = async () => {
  try {
    const response = await axiosInstanceNest.get('/customers');
    return response.data;
  } catch (error) {
    console.error('Error fetching customers', error);
    throw error;
  }
};
export const deleteCustomersNest = async (customerId: number) => {
  try {
    const response = await axiosInstanceNest.delete(`/customers/${customerId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting customer', error);
    throw error;
  }
};

export const createCustomersNest = async (customerData: { name: string; phone: string; address: string; }) => {
  try {
    const response = await axiosInstanceNest.post('/customers', customerData);
    return response.data;
  } catch (error) {
    console.error('Error creating customer', error);
    throw error;
  }
};


export const updateCustomersNest = async (
  customerId: number,
  customerData: { name: string; phone: string; address: string; }
) => {
  try {
    const response = await axiosInstanceNest.put(`/customers/${customerId}`, customerData);
    return response.data;
  } catch (error) {
    console.error('Error updating customer', error);
    throw error;
  }
};