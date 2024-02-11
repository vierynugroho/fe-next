import Head from 'next/head';
import { Box, Button, Container, FormControl, FormErrorMessage, FormLabel, Heading, Input, Spinner, Table, Tbody, Td, Th, Thead, Tr, VStack, useToast } from '@chakra-ui/react';
import { useFetchProducts } from '@/hooks/products/useFetchProducts';
import { useFormik } from 'formik';
import { useCreateProduct } from '@/hooks/products/useCreateProduct';
import { useDeleteProducts } from '@/hooks/products/useDeleteProducts';
import { useEditProduct } from '@/hooks/products/useEditProduct';
import * as yup from 'yup';

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
		// data validated
		validationSchema: yup.object().shape({
			name: yup.string().required(),
			price: yup.number().required(),
			description: yup.string().required().min(10),
			image: yup.string().required(),
		}),

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
	const { mutate: deleteProduct, isLoading: deleteIsLoading } = useDeleteProducts({
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

	const { mutate: editProduct, isLoading: editIsLoading } = useEditProduct({
		onSuccess: () => {
			refetchProducts();
			toast({
				title: 'Product Edited!',
				status: 'success',
				position: 'top-right',
			});
		},
	});

	//TODO: Render Products
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
									{deleteIsLoading ? <Spinner /> : 'Delete'}
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
							<FormControl isInvalid={formik.errors.name}>
								<FormLabel>Name</FormLabel>
								<Input
									onChange={handleFormInput}
									name='name'
									value={formik.values.name}
								/>
								<FormErrorMessage>{formik.errors.name}</FormErrorMessage>
							</FormControl>
							<FormControl isInvalid={formik.errors.price}>
								<FormLabel>Price</FormLabel>
								<Input
									onChange={handleFormInput}
									name='price'
									value={formik.values.price}
									type='number'
								/>
								<FormErrorMessage>{formik.errors.price}</FormErrorMessage>
							</FormControl>
							<FormControl isInvalid={formik.errors.description}>
								<FormLabel>Description</FormLabel>
								<Input
									onChange={handleFormInput}
									name='description'
									value={formik.values.description}
								/>
								<FormErrorMessage>{formik.errors.description}</FormErrorMessage>
							</FormControl>
							<FormControl isInvalid={formik.errors.image}>
								<FormLabel>Image</FormLabel>
								<Input
									onChange={handleFormInput}
									name='image'
									value={formik.values.image}
								/>
								<FormErrorMessage>{formik.errors.image}</FormErrorMessage>
							</FormControl>
							<Button
								type='submit'
								disabled={createIsLoading || editIsLoading}
							>
								{createIsLoading || editIsLoading ? <Spinner /> : 'Submit Product'}
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
