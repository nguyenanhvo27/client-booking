import { axiosInterceptor } from '@/config/axios';

export const getRooms = async (query: {
  endDate?: string;
  province?: string;
  startDate?: string;
  traveller?: number;
  pageSize?: number;
  pageNumber?: number;
}) => {
  try {
    if (Object.keys(query).length > 0) {
      const params = new URLSearchParams([
        ['endDate', query?.endDate ?? ''],
        ['province', query?.province ?? ''],
        ['startDate', query?.startDate ?? ''],
        ['traveller', query?.traveller?.toString() ?? ''],
        ['pageSize', query?.pageSize?.toString() ?? '1'],
        ['pageNumber', query?.pageNumber?.toString() ?? '10'],
      ]);

      const response = await axiosInterceptor.get('/rooms', {
        params,
      });

      return response.data;
    }
    const response = await axiosInterceptor.get('/rooms');

    return response.data;
  } catch (error) {
    throw new Error('Get Rooms fail!');
  }
};

export const postRooms = async (data: any) => {
  try {
    const formData = new FormData();
    formData.append('file', data.file[0]);
    formData.append('AC', data.AC);
    formData.append('capacity', data.capacity);
    formData.append('room_name', data.room_name);
    formData.append('facilities', data.facilities);
    formData.append('heater', data.heater);
    formData.append('hotel_id', data.hotel_id);
    formData.append('other_facilities', data.other_facilities);
    formData.append('prize', data.prize);
    formData.append('wifi', data.wifi);
    formData.append('parking', data.parking);
    formData.append('pool', data.pool);
 

    const response = await axiosInterceptor.post('/room', formData);

    return response.data;
  } catch (error) {
    throw new Error('Post Rooms fail!');
  }
};

export const getRoomsByHotelId = async (hotel_id?: string) => {
  if (!hotel_id) {
    throw new Error('Not Found Hotel ID');
  }
  try {
    const response = await axiosInterceptor.get(
      `/room/byHotel/${hotel_id}`
    );

    return response.data;
  } catch (error) {
    throw new Error('Get Rooms fail!');
  }
};
export const updateStatus = async (room_id?: string) => {
  if (!room_id) {
    throw new Error('Not Found Hotel ID');
  }
  try {
    const response = await axiosInterceptor.put(`/room/${room_id}`);

    return response.data;
  } catch (error) {
    throw new Error('Get Rooms fail!');
  }
};

export const getRoomId = async (room_id?: string) => {
  if (!room_id) {
    throw new Error('Not Found Hotel ID');
  }
  try {
    const response = await axiosInterceptor.get(`/room/${room_id}`);

    return response.data;
  } catch (error) {
    throw new Error('Get Rooms fail!');
  }
  
};
export const removeRoom = async (room_id?: string, room_type_id?:string) => {
  if (!room_id && !room_type_id) {
    throw new Error('Not Found ID');
  }
  try {
   
    const response = await axiosInterceptor.delete(`/room/delete/${room_id}`);

    return response.data;
  } catch (error) {
    throw new Error('Get Rooms fail!');
  }
  
};

export const updateRoom = async (data: any,id:any) => {
  try {
    const formData = new FormData();
    // formData.append('file', data.file[0]);
    formData.append('AC', data.AC);
    formData.append('capacity', data.capacity);
    formData.append('room_name', data.room_name);
    formData.append('facilities', data.facilities);
    formData.append('heater', data.heater);
    formData.append('hotel_id', data.hotel_id);
    formData.append('other_facilities', data.other_facilities);
    formData.append('prize', data.prize);
    formData.append('wifi', data.wifi);
    formData.append('parking', data.parking);
    formData.append('pool', data.pool);
    if (data?.file) {
      formData.append('file', data?.file?.[0]);
      
    }
    const response = await axiosInterceptor.patch(`/room/edit/${id}`,formData);
    console.log(data,"api")
    return response.data;

  } catch (error) {
    throw new Error('update Rooms fail!');
  }
};
