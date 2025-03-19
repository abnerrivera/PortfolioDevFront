'use client';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Session } from 'next-auth';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import styles from './ProfileClient.module.css';
import Button from '../Button/Button';
import CustomInput from '../CustomInput/CustomInput';

interface ProfileClientProps {
	session: Session | null;
}

interface FormData {
	email: string;
	name: string;
	avatar_url: string;
	profession: string;
	years_experience: number;
	portfolio: string;
	experience: string;
	projects: string;
	skills: string;
	age: string;
	full_name: string;
}

const ProfileClient = ({ session }: ProfileClientProps) => {
	// Mueve los hooks aquí antes de cualquier return
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<FormData>();

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
					years_experience: data.years_experience?.toString() || '',
					portfolio: data.portfolio || '',
					experience: Array.isArray(data.experience)
						? data.experience.join(', ')
						: '',
					projects: Array.isArray(data.projects)
						? data.projects.join(', ')
						: '',
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
				years_experience: data.years_experience,
				portfolio: data.portfolio,
				experience: data.experience.split(',').map((item) => item.trim()),
				projects: data.projects.split(',').map((item) => item.trim()),
				skills: data.skills.split(',').map((item) => item.trim()),
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
						<h1>Bienvenido, {session.user.name}</h1>
						<div className={styles.formTwoInputs}>
							<Image
								width={100}
								height={100}
								src={session.user.image!}
								alt="Avatar"
							/>
							<CustomInput
								disabled={true}
								label="Avatar URL"
								name="avatar_url"
								type="text"
								register={register}
							/>
						</div>

						<div className={styles.formTwoInputs}>
							<CustomInput
								label="User Name"
								disabled={true}
								name="name"
								type="text"
								register={register}
								error={errors.name}
							/>
							<CustomInput
								label="Nombre Completo"
								name="full_name"
								type="text"
								register={register}
							/>
						</div>

						<div className={styles.formTwoInputs}>
							<CustomInput
								label="Email"
								disabled={true}
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
							/>
						</div>

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
							/>
							<CustomInput
								label="Years Experience"
								name="years_experience"
								type="number"
								register={register}
							/>
						</div>

						<CustomInput
							label="PortFolio"
							name="portfolio"
							type="text"
							register={register}
						/>

						{/* <CustomInput
							label="Experiencia (separada por comas)"
							name="experience"
							type="textarea"
							register={register}
						/> */}

						{/* <CustomInput
							label="Proyectos (separados por comas)"
							name="projects"
							type="textarea"
							register={register}
						/> */}
						
						<CustomInput
							label="Habilidades (separadas por comas)"
							name="skills"
							type="textarea"
							register={register}
						/>

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
