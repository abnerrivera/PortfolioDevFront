import Navbar from "../components/Navbar/Navbar";
import styles from "../layout/layoutDashboard.module.css"

export default function Layout ({children}: Readonly<{children: React.ReactNode}>){
    return (
        <section className={styles.dashboardMain}>
            <Navbar/>
            {children}
        </section>
    )
}