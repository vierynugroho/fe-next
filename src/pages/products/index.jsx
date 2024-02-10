import Head from 'next/head';
import { Box, Button, Container, FormControl, FormLabel, Heading, Input, Spinner, Table, Tbody, Td, Text, Th, Thead, Tr, VStack, useToast } from '@chakra-ui/react';
import { useFetchProducts } from '@/hooks/products/useFetchProducts';
import { useFormik } from 'formik';
import { useCreateProduct } from '@/hooks/products/useCreateProduct';
import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '@/lib/axios';
import { useDeleteProducts } from '@/hooks/products/useDeleteProducts';

export default function Home() {
	const { data: dataProducts, isLoading: productsIsLoading, refetch: refetchProducts } = useFetchProducts();
	const toast = useToast();

	const formik = useFormik({
		initialValues: {
			name: '',
			price: '',
			description: '',
			image: '',
		},

		onSubmit: () => {
			const { name, price, description, image, id } = formik.values;
			if (id) {
				editProduct({
					id,
					name,
					price: parseInt(price),
					description,
					image,
				});

				toast({
					title: 'Product Edited',
					status: 'success',
					position: 'top-right',
				});
			} else {
				createProduct({
					name,
					price: parseInt(price),
					description,
					image,
				});
			}

			formik.setFieldValue('name', '');
			formik.setFieldValue('price', 0);
			formik.setFieldValue('description', '');
			formik.setFieldValue('image', '');
			formik.setFieldValue('id', '');
		},
	});

	const handleFormInput = (e) => {
		formik.setFieldValue(e.target.name, e.target.value);
	};

	//TODO: create
	const { mutate: createProduct, isLoading: createIsLoading } = useCreateProduct({
		onSuccess: () => {
			refetchProducts();
			toast({
				title: 'Product Added',
				status: 'success',
				position: 'top-right',
			});
		},
	});

	//TODO: delete
	const { mutate: deleteProduct, isLoading: deleteIsLoadingt } = useDeleteProducts({
		onSuccess: () => {
			refetchProducts();
			toast({
				title: 'Product Deleted!',
				status: 'success',
				position: 'top-right',
			});
		},
	});

	const confirmationDelete = (productId) => {
		const shouldDelete = confirm('Yakinn Dekkk?!');

		if (shouldDelete) {
			deleteProduct(productId);
		}
	};

	//TODO: Edit
	const handlerEdit = (product) => {
		formik.setFieldValue('id', product.id);
		formik.setFieldValue('name', product.name);
		formik.setFieldValue('price', product.price);
		formik.setFieldValue('description', product.description);
		formik.setFieldValue('image', product.image);
	};

	const { mutate: editProduct, isLoading: editIsLoading } = useMutation({
		mutationFn: async (body) => {
			const response = await axiosInstance.patch(`/products/${body.id}`, body);
			return response;
		},
		onSuccess: () => {
			refetchProducts();
			toast({
				title: 'Product Deleted!',
				status: 'success',
				position: 'top-right',
			});
		},
	});

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
						<Th colSpan={2}>Action</Th>
					</Tr>
				</Thead>
				<Tbody>
					{dataProducts?.data.map((product) => (
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
							<td>
								<Button
									colorScheme={'red'}
									onClick={() => confirmationDelete(product.id)}
								>
									Delete
								</Button>
							</td>
							<td>
								<Button
									colorScheme={'yellow'}
									onClick={() => handlerEdit(product)}
								>
									Edit
								</Button>
							</td>
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
				<Container className='mt-3'>
					<Heading>Add Product</Heading>
					<form onSubmit={formik.handleSubmit}>
						<VStack spacing={2}>
							<FormControl>
								<FormLabel>ID</FormLabel>
								<Input
									onChange={handleFormInput}
									name='id'
									required
									value={formik.values.id}
									readOnly
								/>
							</FormControl>
							<FormControl>
								<FormLabel>Name</FormLabel>
								<Input
									onChange={handleFormInput}
									name='name'
									required
									value={formik.values.name}
								/>
							</FormControl>
							<FormControl>
								<FormLabel>Price</FormLabel>
								<Input
									onChange={handleFormInput}
									name='price'
									required
									value={formik.values.price}
									type='number'
								/>
							</FormControl>
							<FormControl>
								<FormLabel>Description</FormLabel>
								<Input
									onChange={handleFormInput}
									name='description'
									value={formik.values.description}
									required
								/>
							</FormControl>
							<FormControl>
								<FormLabel>Image</FormLabel>
								<Input
									onChange={handleFormInput}
									name='image'
									value={formik.values.image}
									required
								/>
							</FormControl>
							<Button
								type='submit'
								disabled={createIsLoading}
							>
								{createIsLoading ? <Spinner /> : 'Add Product'}
							</Button>
						</VStack>
					</form>
				</Container>
				<Box className='m-3'>
					<Heading>Our Products!</Heading>
					{productsIsLoading ? <Spinner /> : renderProducts()}
				</Box>
			</main>
		</>
	);
}
