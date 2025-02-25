import { AiFillHome } from 'react-icons/ai';
import { BsFillChatLeftTextFill } from 'react-icons/bs';
import { FaFolder } from 'react-icons/fa';

export const settings = {
	colors: {
		primary: '#4FD1C5',
		secondary: '#1F2733',
		background: '#1A202C',
	},
	texts: {
		siteName: 'ABNER RIVERA',
		defaultDesc: 'Welcome to mi portfolio',
	},
	menuItems: [
		{ name: 'Home', path: '/', icon: <AiFillHome /> },
		{ name: 'Projects', path: '/', icon: <FaFolder /> },
		{ name: 'Blog', path: '/', icon: <BsFillChatLeftTextFill /> },
	],
};