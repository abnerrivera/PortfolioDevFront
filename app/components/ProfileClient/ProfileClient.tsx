'use client';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Session } from 'next-auth';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import styles from './ProfileClient.module.css';
import Button from '../Button/Button';
import CustomInput from '../CustomInput/CustomInput';

// ZOD
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
					<p>Cargando datos...</p>
				) : (
					<form
						className={styles.formProfile}
						onSubmit={handleSubmit(onSubmit)}
					>
						<div className={styles.formTitle}>
							<h1>Bienvenido, {session.user.name}</h1>
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
								label="Nombre Completo"
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
								label="Edad"
								name="age"
								type="number"
								register={register}
								error={errors.age}
							/>
						</div>

						{/* Profesión, Años de experiencia y Unidad de tiempo */}
						<div className={styles.formTwoInputs}>
							<CustomInput
								label="Profesión"
								name="profession"
								type="select"
								options={[
									{ value: 'Back-end', label: 'Back-end' },
									{ value: 'Front-end', label: 'Front-end' },
									{ value: 'Fullstack', label: 'Fullstack' },
								]}
								register={register}
								error={errors.profession}
							/>
							<div className={styles.formTwoInputs}>
								<CustomInput
									label="Tiempo de Experiencia"
									name="time_experience"
									type="number"
									register={register}
									error={errors.time_experience}
								/>
								<CustomInput
									label="Unidad de Tiempo"
									name="time_unit"
									type="select"
									options={[
										{ value: 'days', label: 'Días' },
										{ value: 'months', label: 'Meses' },
										{ value: 'years', label: 'Años' },
									]}
									register={register}
									error={errors.time_unit}
								/>
							</div>
						</div>

						{/* Portafolio */}
						<CustomInput
							label="Portafolio"
							name="portfolio"
							type="url"
							register={register}
							error={errors.portfolio}
						/>

						{/* Experiencia (Array) */}
						{/* <CustomInput
							label="Experiencia (separada por comas)"
							name="experience"
							type="textarea"
							register={register}
							error={errors.experience}
						/> */}

						{/* Proyectos (Array) */}
						{/* <CustomInput
							label="Proyectos (separados por comas)"
							name="projects"
							type="textarea"
							register={register}
							error={errors.projects}
						/> */}

						{/* Habilidad principal */}
						<CustomInput
							label="Main Skill"
							name="main_skill"
							type="select"
							options={[
								{ value: 'typeScript', label: 'TypeScript' },
								{ value: 'javaScript', label: 'JavaScript' },
								{ value: 'python', label: 'Python' },
							]}
							register={register}
							error={errors.main_skill}
						/>

						{/* Habilidades (Array) */}
						{/* <CustomInput
							label="Habilidades (separadas por comas)"
							name="skills"
							type="textarea"
							register={register}
							error={errors.skills}
						/> */}

						{/* Botón de envío */}
						<Button type="submit" disabled={isSubmitting}>
							{isSubmitting ? 'Guardando...' : 'Actualizar'}
						</Button>
					</form>
				)}
			</div>
		</div>
	);
};

export default ProfileClient;
