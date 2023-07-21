import { axiosInterceptor } from '@/config/axios';

export const getProfile = async (): Promise<any> => {
  try {
    const response = await axiosInterceptor.get('/auth/profile');

    return response.data;
  } catch (error) {
    throw new Error('Get profile fail!');
  }
}

export const updateProfile = async (data: any) => {
  try {
    const formData = new FormData();
    formData.append('first_name', data.first_name);
    formData.append('last_name', data.last_name);
    formData.append('email', data.email);
    formData.append('phone_number', data.phone_number);
    formData.append('location', data.location);
    if (data?.file) {
      formData.append('file', data?.file?.[0]);
    }
    const response = await axiosInterceptor.patch(
      '/user/profile',
      formData
    );

    return response.data;
  } catch (error: any) {
    throw new Error(
      `Update Profile fail ${error?.response?.data?.message}`
    );
  }
};
