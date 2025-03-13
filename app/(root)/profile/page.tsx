import ProfileClient from '@/app/components/ProfileClient/ProfileClient';
import { auth } from '@/auth';

const page = async () => {
	const session = await auth()

	return <ProfileClient session ={session} />;
};

export default page;
