import { axiosInstance } from '@/lib/axios';
import { useMutation } from '@tanstack/react-query';

export const useEditProduct = ({ onSuccess }) => {
	return useMutation({
		mutationFn: async (body) => {
			const response = await axiosInstance.patch(`/products/${body.id}`, body);
			return response;
		},
		onSuccess,
	});
};
