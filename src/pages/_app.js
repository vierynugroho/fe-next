import '@/styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function App({ Component, pageProps }) {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				refetchOnWindowFocus: false, // fokus windows tidak auto refetch
			},
		},
	});

	return (
		<QueryClientProvider client={queryClient}>
			<ChakraProvider>
				<Component {...pageProps} />;
			</ChakraProvider>
		</QueryClientProvider>
	);
}
