import Head from 'next/head';
import { Heading, Container } from '@chakra-ui/react';

export default function Home() {
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
