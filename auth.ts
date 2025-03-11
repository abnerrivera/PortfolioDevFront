import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import { supabaseAdmin } from '@/lib/supabase';

// Función para insertar o actualizar el usuario en Supabase
async function upsertUser(user: {
	id: string;
	email: string;
	name: string;
	image: string;
}) {
	const { data, error } = await supabaseAdmin
		.from('users')
		.select('id')
		.eq('email', user.email)
		.single();

	if (!data) {
		// Insertar usuario si no existe
		const { error: insertError } = await supabaseAdmin.from('users').insert([
			{
				github_id: user.id,
				email: user.email,
				name: user.name,
				avatar_url: user.image,
			},
		]);

		if (insertError) {
			console.error('Error al insertar usuario en Supabase', insertError);
			return null;
		}
	}

	return data || user;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
		GitHub({
			clientId: process.env.AUTH_GITHUB_ID!,
			clientSecret: process.env.AUTH_GITHUB_SECRET!,
		}),
	],
	callbacks: {
		async signIn({ user, account }) {
			if (account?.provider === 'github') {
				const savedUser = await upsertUser({
					id: String(user.id),
					email: user.email!,
					name: user.name!,
					image: user.image!,
				});

				if (!savedUser) {
					return false; // Bloquea el acceso si falla la inserción
				}
			}

			return true;
		},

		async session({ session, token }) {
			if (token?.sub) {
				const { data: user } = await supabaseAdmin
					.from('users')
					.select('*')
					.eq('github_id', token.sub)
					.single();

				if (user) {
					session.user.id = user.id;
					session.user.name = user.name;
					session.user.email = user.email;
					session.user.image = user.avatar_url;
				}
			}

			return session;
		},
	},
});
