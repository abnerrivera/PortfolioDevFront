'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { settings } from '@/config/settings';
import styles from './Navbar.module.css';
import Link from 'next/link';
import { login, logout } from '@/actions/authActions';
import Button from '../Button/Button';
import Image from 'next/image';
import { AiFillCloseCircle } from 'react-icons/ai';
import { CgMenuRound } from 'react-icons/cg';

interface NavbarClientProps {
	session: any;
}

const NavbarClient = ({ session }: NavbarClientProps) => {
	const [isOpen, setIsOpen] = useState(false);

	const pathname = usePathname();

	const handleMenuMobile = () => {
		setIsOpen(!isOpen);
	};

	return (
		<>
			<div className={styles.navbarMobileBtn}>
				<button onClick={handleMenuMobile}>
					{isOpen ? <AiFillCloseCircle /> : <CgMenuRound />}
				</button>
			</div>
			<div className={`${styles.navbar} ${isOpen ? styles.open : ''}`}>
				<div className={styles.navbar__siteName}>
					<h3>{settings.texts.siteName}</h3>
					<div className={styles.navbar__divider}></div>
				</div>

				<ul className={styles.navbar__options}>
					{settings.menuItems.map(({ name, path, icon }, index) => (
						<li
							onClick={handleMenuMobile}
							key={index}
							className={`${styles.navbar__link} ${
								pathname === path ? styles.active : ''
							}`}
						>
							<Link href={path} className="text-sm bold">
								<span className={styles.navbar__icon}>{icon}</span> {name}
							</Link>
						</li>
					))}
				</ul>
				{session?.user && (
					<div className={styles.navbar__userPages}>
						<h5>ACCOUNT PAGES</h5>
						<ul className={styles.navbar__options}>
							{settings.accountPages.map(({ name, path, icon }, index) => (
								<li
									onClick={handleMenuMobile}
									key={index}
									className={`${styles.navbar__link} ${
										pathname === path ? styles.active : ''
									}`}
								>
									<Link className="text-sm bold" href={path}>
										<span className={styles.navbar__icon}>{icon}</span> {name}
									</Link>
								</li>
							))}
						</ul>
					</div>
				)}

				<div className={styles.navbar__userCont}>
					{session?.user ? (
						<>
							<Image
								className={styles.navbar__userImage}
								src={session.user.image}
								alt="userImage"
								width={35}
								height={35}
							/>
							<Link href={`/user/${session.user.name}`}>
								<span className="bold">{session.user.name}</span>
							</Link>

							<Link href="/startup/create">
								<span className="text-sm">Create HV</span>
							</Link>

							<form action={logout}>
								<Button width="btnFull" variable="secondary">
									Logout
								</Button>
							</form>
						</>
					) : (
						<>
							<p className="text-sm">
								Inicia sesión para poder subir tu hoja de vida y ver vacantes
								disponibles
							</p>
							<br />
							<form action={() => login('github')}>
								<Button type="submit" width="btnFull" variable="secondary">
									Login
								</Button>
							</form>
						</>
					)}
				</div>
			</div>
		</>
	);
};

export default NavbarClient;
