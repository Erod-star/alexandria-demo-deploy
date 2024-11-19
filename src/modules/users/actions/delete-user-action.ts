import alexandriaApi from '@/api/alexandriaApi';

export const deleteUser = async (userId: string): Promise<void> => {
  try {
    await alexandriaApi.delete(`/user/${userId}`);
  } catch (error) {
    console.error('::Users', error);
    throw new Error('⚠️ Error eliminando el usuario');
  }
};
