'use client';
import { Session } from 'next-auth';
import Image from 'next/image';

interface ProfileClientProps {
	session: Session | null;
}

const ProfileClient = ({session}: ProfileClientProps) => {
	return (
		<div>
			<h1>Bienvenido, {session?.user.name}</h1>
			<Image width={100} height={100} src={`${session?.user.image}`} alt="Avatar" />
			<p>Email: {session?.user.email}</p>
		</div>
	);
};

export default ProfileClient;
