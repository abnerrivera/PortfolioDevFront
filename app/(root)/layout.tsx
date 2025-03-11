import NavbarServer from '../components/Navbar/NavbarServer';
import layoutStyles from '../layout/layoutDashboard.module.css';

export default function Layout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<section className={layoutStyles.dashboardMain}>
			<NavbarServer />
			<main className={layoutStyles.dashboardChildren}>{children}</main>
		</section>
	);
}
