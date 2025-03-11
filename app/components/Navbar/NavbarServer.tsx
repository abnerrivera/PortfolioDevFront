import NavbarClient from './NavbarClient';
import {auth} from '@/auth'


const NavbarServer = async () => {

    const session = await auth()

	return <NavbarClient session={session} />;
};

export default NavbarServer;
