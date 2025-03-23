'use client';
import { FC } from 'react';
import { UseFormRegister, FieldError } from 'react-hook-form';
import styles from './CustomInput.module.css';

// Define la interfaz del formulario
interface FormData {
	email: string;
	name: string;
	avatar_url: string;
	profession: string;
	time_experience: number;
	time_unit: number;
	portfolio: string;
	experience: string;
	projects: string;
	main_skill: string;
	skills: string;
	age: string;
	full_name: string;
}

interface CustomInputProps {
	label?: string;
	name: keyof FormData; // Solo permite claves de FormData
	type?: 'text' | 'email' | 'number' | 'textarea' | 'select';
	placeholder?: string;
	register: UseFormRegister<FormData>; // Usa la misma interfaz de useForm
	error?: FieldError;
	disabled?: boolean;
	options?: { value: string; label: string }[];
}

const CustomInput: FC<CustomInputProps> = ({
	label,
	name,
	type = 'text',
	placeholder = '',
	register,
	error,
	disabled,
	options,
}) => {
	return (
		<div className={styles.inputContainer}>
			<label className={styles.label}>
				{label}
				{type === 'textarea' ? (
					<textarea
						className={styles.input}
						{...register(name)}
						placeholder={placeholder}
					/>
				) : type === 'select' && options ? (
					<select
						className={styles.input}
						{...register(name)}
						disabled={disabled}
					>
						{options.map((option) => (
							<option key={option.value} value={option.value}>
								{option.label}
							</option>
						))}
					</select>
				) : (
					<input
						disabled={disabled}
						className={styles.input}
						type={type}
						{...register(name)}
						placeholder={placeholder}
					/>
				)}
			</label>
			{error && <span className={styles.error}>{error.message}</span>}
		</div>
	);
};

export default CustomInput;
