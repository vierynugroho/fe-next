import Head from 'next/head';
import { Heading, Spinner, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { useProducts } from '@/hooks/products/useProducts';

export default function Home() {
	const { data, isLoading } = useProducts();

	const renderProducts = () => {
		return (
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
				<Tbody>
					{data?.data.map((product) => (
						<Tr key={product.id}>
							<Td>{product.id}</Td>
							<Td>{product.name}</Td>
							<Td>{product.price}</Td>
							<Td>{product.description}</Td>
							<Td>
								<img
									className='ratio-4x3 object-cover max-w-10'
									src={product.image}
									alt={product.name}
								/>
							</Td>
						</Tr>
					))}
				</Tbody>
			</Table>
		);
	};

	return (
		<>
			<Head>
				<title>FE-Next | Products</title>
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
				<Heading>Our Products!</Heading>
				{isLoading ? <Spinner /> : renderProducts()}
			</main>
		</>
	);
}
