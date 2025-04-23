//icons
import { AiFillHome, AiFillSafetyCertificate } from 'react-icons/ai';
import { BsFillChatLeftTextFill } from 'react-icons/bs';
import { FaFolder, FaUser } from 'react-icons/fa';
import { GiSkills } from 'react-icons/gi';
import { MdGroups } from 'react-icons/md';
import projectImg1 from '../app/assets/project1.png';
import projectImg2 from '../app/assets/project2.png';

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
		// {
		// 	status: true,
		// 	name: 'Blog',
		// 	path: '/blog',
		// 	icon: <BsFillChatLeftTextFill />,
		// },
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
	professions: [
		{ value: 'All', label: 'All' },
		{ value: 'Full-Stack', label: 'Full-Stack' },
		{ value: 'Front-End', label: 'Front-End' },
		{ value: 'Back-End', label: 'Back-End' },
		{ value: 'Mobile Developer', label: 'Mobile Developer' },
		{ value: 'UX/UI Designer', label: 'UX/UI Designer' },
		{ value: 'DevOps', label: 'DevOps' },
	],
	skills: [
		{ value: 'All', label: 'All' },
		{ value: 'JavaScript', label: 'JavaScript' },
		{ value: 'TypeScript', label: 'TypeScript' },
		{ value: 'React', label: 'React' },
		{ value: 'Next.js', label: 'Next.js' },
		{ value: 'Node.js', label: 'Node.js' },
		{ value: 'Figma', label: 'Figma' },
		{ value: 'Flutter', label: 'Flutter' },
		{ value: 'Django', label: 'Django' },
		{ value: 'SQL', label: 'SQL' },
	],
	experiences: [
		{ value: 'All', label: 'All' },
		{ value: '0-6-Months', label: '0-6 Months' },
		{ value: '6-12-Months', label: '6-12 Months' },
		{ value: '1-3-Years', label: '1-3 Years' },
		{ value: '3-6-Years', label: '3-6 Years' },
		{ value: '6+-0-Years', label: '6+ Years' },
	],
};

export const profileData = {
	projects: [
		{
			imageUrl: projectImg1,
			title: 'Prescripto',
			tags: ['react', 'tailwind', 'javascript'],
			description:
				'A scheduling app for booking appointments with doctors across various medical specialties',
			liveDemoUrl: 'https://prescripto-neon.vercel.app/',
			githubUrl: 'https://github.com/abnerrivera/prescripto/tree/main/frontend',
		},
		{
			imageUrl: projectImg2,
			title: 'Portfolio Platform',
			tags: ['nextjs', 'oaut', 'supabase', 'typescript'],
			description:
				'A portfolio platform that showcases my work while also collecting portfolios from registered developers, serving as a hub for tech recruiters to discover talent',
			liveDemoUrl: 'https://portfolio-dev-front.vercel.app/',
			githubUrl: 'https://github.com/abnerrivera/PortfolioDevFront',
		},
	],
};
