import { axiosInstance } from '@/lib/axios';
import { useMutation } from '@tanstack/react-query';

export const useDeleteProducts = ({ onSuccess }) => {
	return useMutation({
		mutationFn: async (id) => {
			const response = await axiosInstance.delete(`/products/${id}`);
			return response;
		},
		onSuccess,
	});
};
