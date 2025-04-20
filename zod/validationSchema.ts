import { z } from 'zod';

export const profileSchema = z.object({
	email: z.string().email('Invalid email address'),
	name: z.string().min(2, 'Name must have at least 2 characters'),
	avatar_url: z.string().url('Must be a valid URL'),
	profession: z.enum([
		'Full-Stack',
		'Front-End',
		'Back-End',
		'Mobile Developer',
		'UX/UI Designer',
		'DevOps',
	]),
	time_experience: z.coerce
		.number()
		.min(0, 'Must be a positive number')
		.max(100, 'Too many years of experience'),
	time_unit: z.enum(['days', 'months', 'years']),
	portfolio: z.string().url('Must be a valid URL'),
	experience: z.string().optional(),
	projects: z.string().optional(),
	main_skill: z.string().min(2, 'Main skill is required'),
	skills: z.string().optional(),
	age: z.coerce
		.number()
		.min(18, 'You must be at least 18 years old')
		.max(60, 'You must be under 60 years old'),
	full_name: z
		.string()
		.min(5, 'Full name must be valid')
		.max(20, 'Full name is too long')
		.regex(
			/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
			'Name can only contain letters and spaces'
		),
});
