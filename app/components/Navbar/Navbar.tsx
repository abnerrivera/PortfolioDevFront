import React from 'react';
import { settings } from '@/config/settings';
import styles from './Navbar.module.css';
import Link from 'next/link';
import { auth, signOut, signIn } from '@/auth';
import Button from '../Button/Button';
import Image from 'next/image';

const Navbar = async () => {
	const session = await auth();

	return (
		<div className={styles['navbar']}>
			<h3>{settings.texts.siteName}</h3>
			<div className={styles.navbar__divider}></div>
			{/* navb options */}
			<ul className={styles.navbar__options}>
				{settings.menuItems.map(({ name, path, icon }, index) => (
					<li key={index} className={`${styles.navbar__link} ${styles.active}`}>
						<Link className="text-sm bold" href={path}>
							{' '}
							<span className={styles.navbar__icon}>{icon}</span> {name}
						</Link>
					</li>
				))}
			</ul>
			{/* account pages */}

			{session && session.user ? (
				<>
					<h5>ACCOUNT PAGES</h5>
					<ul className={styles.navbar__options}>
						{settings.accountPages.map(({ name, path, icon }, index) => (
							<li
								key={index}
								className={`${styles.navbar__link} ${styles.active}`}
							>
								<Link className="text-sm bold" href={path}>
									{' '}
									<span className={styles.navbar__icon}>{icon}</span> {name}
								</Link>
							</li>
						))}
					</ul>
				</>
			) : (
				''
			)}

			{/* login - logout */}
			<div className={styles.navbar__userCont}>
				{session && session.user ? (
					<>
						<Image
							className={styles.navbar__userImage}
							src={`${session.user.image}`}
							alt="userImage"
							width={35}
							height={35}
						/>

						{/* Usa `session.user.id` y `session.user.name` */}
						<Link href={`/user/${session.user.name}`}>
							<span className="bold">{session.user.name}</span>
						</Link>

						<Link href="/startup/create">
							<span className="text-sm">Create HV</span>
						</Link>

						<form
							action={async () => {
								'use server';
								await signOut({ redirectTo: '/' });
							}}
						>
							<Button width="btnFull" variable="secondary">
								Logout
							</Button>
						</form>
					</>
				) : (
					<form
						action={async () => {
							'use server';
							await signIn('github');
						}}
					>
						<p className="text-sm">
							Inicia sesion para poder subir tu hoja de vida y ver vacantes
							disponibles
						</p>
						<br />
						<Button type="submit" width="btnFull" variable="secondary">
							Login
						</Button>
					</form>
				)}
			</div>
		</div>
	);
};

export default Navbar;
