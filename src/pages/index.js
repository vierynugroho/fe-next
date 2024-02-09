import Head from 'next/head';
import { Container, Heading, Spinner, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { axiosInstance } from '@/lib/axios'; // alias (jsconfig)

export default function Home() {
	const [products, setProducts] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const fetchProducts = async () => {
		try {
			setIsLoading(true);
			const response = await axiosInstance.get('/products');
			setProducts(response.data);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	const renderProducts = () => {
		return products.map((product) => {
			return (
				<Tr key={product.id}>
					<Td>{product.id}</Td>
					<Td>{product.name}</Td>
					<Td>{product.price}</Td>
					<Td>{product.description}</Td>
					<Td>{product.image}</Td>
				</Tr>
			);
		});
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
					<Table>
						<Thead>
							<Tr>
								<Th>ID</Th>
								<Th>Name</Th>
								<Th>Price</Th>
								<Th>Description</Th>
								<Th>Image</Th>
							</Tr>
						</Thead>
						<Tbody>{isLoading ? <Spinner /> : renderProducts()}</Tbody>
					</Table>
				</Container>
			</main>
		</>
	);
}
