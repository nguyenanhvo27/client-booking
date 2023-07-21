import { axiosInterceptor } from '@/config/axios';

export const updateTransaction = async (data: any) => {
  try {
    const response = await axiosInterceptor.patch(
      `/transaction/${data.transaction_id}`,
      data
    );

    return response.data;
  } catch (error) {
    throw new Error('Transaction fail!');
  }
  

};
export const updateStatus = async (transaction_id?: string) => {
  try {
    const response = await axiosInterceptor.put(`/transaction/updateStatus/${transaction_id}`);
    console.log(transaction_id,"api")
    return response.data;
  } catch (error) {
    throw new Error('Get Transaction fail!');
  }
};