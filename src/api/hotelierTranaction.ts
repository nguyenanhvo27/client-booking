import { axiosInterceptor } from '@/config/axios';



export const postHotelierTransaction = async (data: any) => {
  try {
    const response = await axiosInterceptor.post('/hotelier_transaction', data);

    return response.data;
  } catch (error) {
    throw new Error('Post fail!');
  }
};

  // export const load = async (data: any,id:any) => {
  //   try {
  //     const formData = new FormData();
  //     // formData.append('file', data.file[0]);
  //     formData.append('total', data.total);
  //     const response = await axiosInterceptor.patch(`hotelier_transaction/load/${id}`,formData);
  //     console.log(data,"api")
  //     return response.data;
  
  //   } catch (error) {
  //     throw new Error('update Rooms fail!');
  //   }
  // };

  export const success = async (hotelier_transaction_id: string) => {
    try {
      const response = await axiosInterceptor.put(
        `/hotelier_transaction/success/${hotelier_transaction_id}`
      );
        console.log(hotelier_transaction_id,"idAPI")
      return response.data;
    } catch (error) {
      throw new Error('Update reservation fail!');
    }
  };

  export const getHotelierReservation = async () => {
    try {
      const response = await axiosInterceptor.get('/hotelier_transaction/getHotelierTransaction');
  
      return response.data;
    } catch (error) {
      throw new Error('Reservation fail!');
    }
  };