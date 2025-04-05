import { z } from 'zod';

export const profileSchema = z.object({
	email: z.string().email('El correo electrónico no es válido'),
	name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
	avatar_url: z.string().url('Debe ser una URL válida'),
	profession: z.enum(['Back-end', 'Front-end', 'Fullstack']),
	time_experience: z.coerce
		.number()
		.min(0, 'Debe ser un número positivo')
		.max(100, 'Demasiados años de experiencia'),
	time_unit: z.enum(['days', 'months', 'years']),
	portfolio: z.string().url('Debe ser una URL válida'),
	experience: z.string().optional(),
	projects: z.string().optional(),
	main_skill: z.string().min(2, 'La habilidad principal es requerida'),
	skills: z.string().optional(),
	age: z.coerce
		.number()
		.min(18, 'Debes tener al menos 18 años')
		.max(60, 'Debes tener menos de 60 años'),
	full_name: z
		.string()
		.min(5, 'El nombre completo debe ser válido')
		.max(20, 'El nombre contiene muchos caracteres')
		.regex(
			/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
			'El nombre solo puede contener letras y espacios'
		),
});
