"use client";
import { FC } from "react";
import { UseFormRegister, FieldError } from "react-hook-form";
import styles from "./CustomInput.module.css";

// Define la interfaz del formulario
interface FormData {
  email: string;
  name: string;
  avatar_url: string;
  profession: string;
  experience: string;
  projects: string;
  skills: string;
  age: string;
  full_name: string;
}

interface CustomInputProps {
  label: string;
  name: keyof FormData; // Solo permite claves de FormData
  type?: "text" | "email" | "number" | "textarea";
  placeholder?: string;
  register: UseFormRegister<FormData>; // Usa la misma interfaz de useForm
  error?: FieldError;
}

const CustomInput: FC<CustomInputProps> = ({
  label,
  name,
  type = "text",
  placeholder = "",
  register,
  error,
}) => {
  return (
    <div className={styles.inputContainer}>
      <label className={styles.label}>
        {label}
        {type === "textarea" ? (
          <textarea className={styles.input} {...register(name)} placeholder={placeholder} />
        ) : (
          <input className={styles.input} type={type} {...register(name)} placeholder={placeholder} />
        )}
      </label>
      {error && <span className={styles.error}>{error.message}</span>}
    </div>
  );
};

export default CustomInput;
