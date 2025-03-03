import Navbar from '../components/Navbar/Navbar';
import layoutStyles from '../layout/layoutDashboard.module.css';

export default function Layout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<section className={layoutStyles.dashboardMain}>
			<Navbar />
			<main className={layoutStyles.dashboardChildren}>{children}</main>
		</section>
	);
}
