import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './styles/globals.css';

const roboto = Roboto({
	weight: '400',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Portfolio - Abner Rivera',
	description: 'Portfolio - Abner Rivera',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${roboto.className}`}>
				<main>{children}</main>
			</body>
		</html>
	);
}
