import { AiFillHome, AiFillSafetyCertificate } from 'react-icons/ai';
import { BsFillChatLeftTextFill } from 'react-icons/bs';
import { FaFolder, FaUser } from 'react-icons/fa';
import { GiSkills } from 'react-icons/gi';
import { MdGroups } from 'react-icons/md';

export const settings = {
	colors: {
		primary: '#4FD1C5',
		secondary: '#1F2733',
		background: '#1A202C',
	},
	texts: {
		siteName: 'ABNER RIVERA',
		defaultDesc: 'Welcome to mi portfolio',
		email: 'abner500edrey@gmail.com',
	},
	menuItems: [
		{ status: true, name: 'Home', path: '/', icon: <AiFillHome /> },
		{
			status: true,
			name: 'Talent pool',
			path: '/talentPool',
			icon: <MdGroups />,
		},
		{
			status: true,
			name: 'Blog',
			path: '/blog',
			icon: <BsFillChatLeftTextFill />,
		},
	],
	headerOptions: [
		{ status: true, name: 'projects', path: '/projects', icon: <FaFolder /> },
		{
			status: true,
			name: 'experience',
			path: '/experience',
			icon: <AiFillSafetyCertificate />,
		},
		{ status: true, name: 'skills', path: '/skills', icon: <GiSkills /> },
	],
	accountPages: [{ name: 'Profile', path: '/profile', icon: <FaUser /> }],
};
