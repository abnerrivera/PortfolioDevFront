'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { getSession } from 'next-auth/react';
import { Session } from 'next-auth';
import Image from 'next/image';

// Configurar Supabase en el cliente
const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL!,
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type User = Session['user'];
const Profile = () => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);
	const [sessionLoading, setSessionLoading] = useState(true); // Nuevo estado para la sesión
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchUserData = async () => {
			setSessionLoading(true);
			const session = await getSession();
			setSessionLoading(false);

			if (!session?.user?.email) {
				setLoading(false);
				return;
			}

			try {
				const { data, error } = await supabase
					.from('users')
					.select('*')
					.eq('email', session.user.email)
					.single();

				if (error) throw error;
				setUser(data);
			} catch (err: any) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchUserData();
	}, []);

	if (sessionLoading || loading) return <p>Cargando...</p>;
	if (error) return <p>Error: {error}</p>;
	if (!user) return <p>No estás autenticado</p>;

	return (
		<div>
			<h1>Bienvenido, {user.name}</h1>
			<Image width={100} height={100} src={`${user.image}`} alt="Avatar" />
			<p>Email: {user.email}</p>
		</div>
	);
};

export default Profile;
