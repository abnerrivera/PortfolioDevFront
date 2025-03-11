import { auth } from '@/auth';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';

const Profile = async () => {
	// Obtener la sesión del usuario
	const session = await auth();
	if (!session?.user) {
		return <p>No estás autenticado</p>;
	}

	// Consultar los datos del usuario en Supabase
	const { data: user, error } = await supabase
		.from('users')
		.select('*')
		.eq('email', session.user.email) // Filtrar por email
		.single();

	if (error || !user) {
		return <p>Error al cargar los datos del usuario.</p>;
	}
	return (
		<div>
			<h1>Bienvenido, {user.name}</h1>
			<Image width={100} height={100} src={user.avatar_url} alt="Avatar" />
			<p>Email: {user.email}</p>
		</div>
	);
};

export default Profile;
