import Head from 'next/head';
import { Container, Heading } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect } from 'react';

export default function Home() {
	const fetchProducts = async () => {
		try {
			const response = await axios.get('http://localhost:2000/products');
			console.log(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchProducts();
	}, []);
	return (
		<>
			<Head>
				<title>FE-Next</title>
				<meta
					name='description'
					content='front end nextJS'
				/>
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1'
				/>
			</Head>
			<main>
				<Container>
					<Heading>Hello World!</Heading>
				</Container>
			</main>
		</>
	);
}
