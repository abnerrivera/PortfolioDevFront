'use client';

//styles
import styles from './ProfileClient.module.css';

//hooks
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

//data
import { Session } from 'next-auth';
import { supabase } from '@/lib/supabase';

//sources
import Image from 'next/image';

//components
import Button from '../Button/Button';
import CustomInput from '../CustomInput/CustomInput';

//settings
import { settings } from '@/config/settings';

//zod
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { profileSchema } from '@/zod/validationSchema';

type FormData = z.infer<typeof profileSchema>;

interface ProfileClientProps {
	session: Session | null;
}

const ProfileClient = ({ session }: ProfileClientProps) => {
	// Mueve los hooks aquí antes de cualquier return
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<FormData>({
		resolver: zodResolver(profileSchema),
	});

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchUserData = async () => {
			if (!session?.user.email) return;
			setLoading(true);

			const { data, error } = await supabase
				.from('users')
				.select('*')
				.eq('email', session.user.email)
				.single();

			if (error) {
				console.error('Error obteniendo datos:', error);
			} else if (data) {
				reset({
					email: data.email || '',
					name: data.name || '',
					avatar_url: data.avatar_url || '',
					profession: data.profession || '',
					time_experience: data.time_experience || 0,
					time_unit: data.time_unit?.toString() || '',
					portfolio: data.portfolio || '',
					experience: Array.isArray(data.experience)
						? data.experience.join(', ')
						: '',
					projects: Array.isArray(data.projects)
						? data.projects.join(', ')
						: '',
					main_skill: data.main_skill || '',
					skills: Array.isArray(data.skills) ? data.skills.join(', ') : '',
					age: data.age?.toString() || '',
					full_name: data.full_name || '',
				});
			}

			setLoading(false);
		};

		if (session) fetchUserData();
	}, [session, reset]);

	const onSubmit = async (data: FormData) => {
		const { error } = await supabase
			.from('users')
			.update({
				email: data.email,
				name: data.name,
				avatar_url: data.avatar_url,
				profession: data.profession,
				time_experience: data.time_experience,
				time_unit: data.time_unit,
				portfolio: data.portfolio,
				experience: data.experience
					? data.experience.split(',').map((item) => item.trim())
					: [],
				projects: data.projects
					? data.projects.split(',').map((item) => item.trim())
					: [],
				skills: data.skills
					? data.skills.split(',').map((item) => item.trim())
					: [],
				main_skill: data.main_skill,
				age: Number(data.age),
				full_name: data.full_name,
			})
			.eq('email', session?.user.email);

		if (error) {
			console.error('Error actualizando usuario:', error);
		} else {
			alert('Datos actualizados correctamente.');
		}
	};

	// Mueve la validación de session aquí, pero después de los hooks
	if (!session) return <p>No estás autenticado</p>;

	return (
		<div className={styles.profileCont}>
			<div className={styles.profileFormCont}>
				{loading ? (
					<p>Loading...</p>
				) : (
					<form
						className={styles.formProfile}
						onSubmit={handleSubmit(onSubmit)}
					>
						<div className={styles.formTitle}>
							<p>Welcome {session.user.name}</p>
							<p>
								Please fill out all the required information to apply for IT
								positions
							</p>
						</div>

						{/* Avatar */}
						<Image
							width={100}
							height={100}
							src={session.user.image!}
							alt="Avatar"
						/>

						<CustomInput
							disabled
							label="Avatar URL"
							name="avatar_url"
							type="text"
							register={register}
							error={errors.avatar_url}
						/>

						{/* Nombre y Nombre Completo */}
						<div className={styles.formTwoInputs}>
							<CustomInput
								label="User Name"
								disabled
								name="name"
								type="text"
								register={register}
								error={errors.name}
							/>
							<CustomInput
								label="Full Name"
								name="full_name"
								type="text"
								maxLength={20}
								register={register}
								error={errors.full_name}
							/>
						</div>

						{/* Email y Edad */}
						<div className={styles.formTwoInputs}>
							<CustomInput
								label="Email"
								disabled
								name="email"
								type="email"
								register={register}
								error={errors.email}
							/>
							<CustomInput
								label="Age"
								name="age"
								type="number"
								register={register}
								error={errors.age}
							/>
						</div>

						{/* Profesión, Años de experiencia y Unidad de tiempo */}
						<div className={styles.formTwoInputs}>
							<CustomInput
								label="Profession"
								name="profession"
								type="select"
								options={settings.professions}
								register={register}
								error={errors.profession}
							/>
							<div className={styles.formTwoInputs}>
								<CustomInput
									label="Time experience"
									name="time_experience"
									type="number"
									register={register}
									error={errors.time_experience}
								/>
								<CustomInput
									label="Time unit"
									name="time_unit"
									type="select"
									options={[
										{ value: 'days', label: 'Days' },
										{ value: 'months', label: 'Months' },
										{ value: 'years', label: 'Years' },
									]}
									register={register}
									error={errors.time_unit}
								/>
							</div>
						</div>

						{/* Portafolio */}
						<CustomInput
							label="Portfolio"
							name="portfolio"
							type="url"
							register={register}
							error={errors.portfolio}
						/>

						{/* Habilidad principal */}
						<CustomInput
							label="Main Skill"
							name="main_skill"
							type="select"
							options={settings.skills}
							register={register}
							error={errors.main_skill}
						/>

						{/* Botón de envío */}
						<Button type="submit" disabled={isSubmitting}>
							{isSubmitting ? 'Saved...' : 'Update'}
						</Button>
					</form>
				)}
			</div>
		</div>
	);
};

export default ProfileClient;
