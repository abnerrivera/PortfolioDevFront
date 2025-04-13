'use client';
import { FC } from 'react';
import { UseFormRegister, FieldError } from 'react-hook-form';
import styles from './CustomInput.module.css';
import { z } from 'zod';
import { profileSchema } from '@/zod/validationSchema';
import { MdOutlineError } from 'react-icons/md';

// Define la interfaz del formulario
type FormData = z.infer<typeof profileSchema>;

interface CustomInputProps {
	label?: string;
	name: keyof FormData;
	type?: 'text' | 'email' | 'number' | 'textarea' | 'select' | 'url';
	placeholder?: string;
	register: UseFormRegister<FormData>;
	error?: FieldError;
	disabled?: boolean;
	options?: { value: string; label: string }[];
	maxLength?: number;
}

const CustomInput: FC<CustomInputProps> = ({
	label,
	name,
	type = '',
	placeholder = '',
	register,
	error,
	disabled,
	options,
	maxLength,
}) => {
	return (
		<div className={styles.inputContainer}>
			{label && (
				<label className={`${styles.label} bold text-sm`}>{label}</label>
			)}
			{type === 'textarea' ? (
				<textarea
					className={`${styles.input} ${error ? styles.inputError : ''}`}
					{...register(name)}
					placeholder={placeholder}
					disabled={disabled}
				/>
			) : type === 'select' && options ? (
				<select
					className={`${styles.input} ${styles.select} ${
						error ? styles.inputError : ''
					}`}
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
					className={`${styles.input} ${error ? styles.inputError : ''}`}
					type={type}
					maxLength={maxLength}
					{...register(name)}
					placeholder={placeholder}
					aria-invalid={!!error}
					onInput={
						type === 'text'
							? (e) => {
									const input = e.target as HTMLInputElement;
									input.value = input.value.replace(
										/[^A-Za-zÁÉÍÓÚáéíóúÑñ\s]/g,
										''
									);
							  }
							: undefined
					}
				/>
			)}

			{error && (
				<div className={styles.error}>
					<div className={styles.error__icon}>
						<MdOutlineError />
						<span className={styles.error__msg}>{error.message}</span>
					</div>
				</div>
			)}
		</div>
	);
};

export default CustomInput;
