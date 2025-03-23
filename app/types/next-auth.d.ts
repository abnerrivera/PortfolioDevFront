// types/next-auth.d.ts
import 'next-auth';

declare module 'next-auth' {
	interface Session {
		user: {
			id: string; // Agrega `id` si es necesario
			name?: string; // Agrega `name`
			email?: string;
			image?: string;
			profession?: string;
			time_experience?: number;
			time_unit?: number;
			portfolio?: string;
			full_name?: string;
			experience?: string[];
			projects?: string[];
			skills?: string[];
			main_skill?: string;
			age?: number;
		};
	}
}
