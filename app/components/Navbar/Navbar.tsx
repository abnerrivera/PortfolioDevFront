import React from 'react';
import { settings } from '@/config/settings';
import styles from './Navbar.module.css';
import Link from 'next/link';
import { auth, signOut, signIn } from '@/auth';

const Navbar = async () => {
	const session = await auth();

	return (
		<div className={styles['navbar']}>
			<h2>{settings.texts.siteName}</h2>
			<div className={styles.navbar__divider}></div>
			<ul className={styles.navbar__options}>
				{settings.menuItems.map(({ name, path, icon }, index) => (
					<li key={index} className={`${styles.navbar__link} ${styles.active}`}>
						<Link href={path}>
							{' '}
							<span className={styles.navbar__icon}>{icon}</span> {name}
						</Link>
					</li>
				))}
			</ul>
			<div>
				{session && session?.user ? (
					<>
						<Link href="/startup/create">
							<span>Create</span>
						</Link>

						<form
							action={async () => {
								'use server';
								await signOut({ redirectTo: '/' });
							}}
						>
							<button type="submit">Logout</button>
						</form>

						<Link href={`/user/${session?.id}`}>
							<span>{session?.user?.name}</span>
						</Link>
					</>
				) : (
					<form
						action={async () => {
							'use server';
							await signIn('github');
						}}
					>
						<button className={`btn`} type="submit">Login</button>
					</form>
				)}
			</div>
		</div>
	);
};

export default Navbar;
