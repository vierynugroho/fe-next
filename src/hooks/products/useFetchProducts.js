import { axiosInstance } from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';

export const useFetchProducts = () => {
	return useQuery({
		queryFn: async () => {
			const response = await axiosInstance.get('/products');
			return response;
		},
		queryKey: ['fetch.products'],
	});
};
