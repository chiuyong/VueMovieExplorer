import { omdbApi } from '@/api/axiosInstance';

export const fetchMovieByTitle = (title: string) => {
  return omdbApi.get('', {
    params: { t: title },
  });
};
