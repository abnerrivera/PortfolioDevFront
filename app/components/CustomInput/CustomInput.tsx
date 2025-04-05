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
	name: keyof FormData; // Solo permite claves de FormData
	type?: 'text' | 'email' | 'number' | 'textarea' | 'select' | 'url';
	placeholder?: string;
	register: UseFormRegister<FormData>; // Usa la misma interfaz de useForm
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
						className={`${styles.input} ${styles.select}`}
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
										const input = e.target as HTMLInputElement; // 🔹 Cast para acceder a `value`
										input.value = input.value.replace(
											/[^A-Za-zÁÉÍÓÚáéíóúÑñ\s]/g,
											''
										);
								  }
								: undefined
						}
					/>
				)}
			</label>
			{error && (
				<div className={styles.error}>
					<div className={styles.error__icon}>
						<MdOutlineError />
					</div>
					<div className={styles.error__msg}>{error.message}</div>
				</div>
			)}
		</div>
	);
};

export default CustomInput;
