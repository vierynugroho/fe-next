import { axiosInstance } from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';

export const useProducts = () => {
	return useQuery({
		queryFn: async () => {
			const response = await axiosInstance.get('/products');
			return response;
		},
		queryKey: [],
	});
};
