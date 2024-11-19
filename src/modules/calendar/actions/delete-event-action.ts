import googleApi from '@/api/googleApi';

export const deleteEvent = async (eventId: string): Promise<void> => {
  try {
    await googleApi.delete(`/${eventId}`);
  } catch (error) {
    console.error('::Calendar', error);
    throw new Error('⚠️ ¡Error al eliminar el evento!');
  }
};
