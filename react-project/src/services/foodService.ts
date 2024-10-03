import { axiosInstanceExpress, axiosInstanceNest } from '@/utils/config';

// express
export const getFoodExpress = async () => {
  try {
    const response = await axiosInstanceExpress.get('/foods');
    return response.data;
  } catch (error) {
    console.error('Error fetching foods', error);
    throw error;
  }
};
export const deleteFoodExpress = async (foodId: number) => {
  try {
    const response = await axiosInstanceExpress.delete(`/foods/${foodId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting foods', error);
    throw error;
  }
};

export const createFoodExpress = async (foodData: { food_name: string; price: number; stock: number; }) => {
  try {
    const response = await axiosInstanceExpress.post('/foods', foodData);
    return response.data;
  } catch (error) {
    console.error('Error creating foods', error);
    throw error;
  }
};


export const updateFoodExpress = async (
  foodId: number,
  foodData: { food_name: string; price: number; stock: number;}
) => {
  try {
    const response = await axiosInstanceExpress.put(`/foods/${foodId}`, foodData);
    return response.data;
  } catch (error) {
    console.error('Error updating foods', error);
    throw error;
  }
};

// nest
export const getFoodNest = async () => {
  try {
    const response = await axiosInstanceNest.get('/foods');
    return response.data;
  } catch (error) {
    console.error('Error fetching foods', error);
    throw error;
  }
};
export const deleteFoodNest = async (foodId: number) => {
  try {
    const response = await axiosInstanceNest.delete(`/foods/${foodId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting foods', error);
    throw error;
  }
};

export const createFoodNest = async (foodData: { food_name: string; price: number; stock: number; }) => {
  try {
    const response = await axiosInstanceNest.post('/foods', foodData);
    return response.data;
  } catch (error) {
    console.error('Error creating foods', error);
    throw error;
  }
};


export const updateFoodNest = async (
  foodId: number,
  foodData: { food_name: string; price: number; stock: number;}
) => {
  try {
    const response = await axiosInstanceNest.put(`/foods/${foodId}`, foodData);
    return response.data;
  } catch (error) {
    console.error('Error updating foods', error);
    throw error;
  }
};


