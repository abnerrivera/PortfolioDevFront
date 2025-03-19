"use client";
import { FC } from "react";
import { UseFormRegister, FieldError } from "react-hook-form";
import styles from "./CustomInput.module.css";

interface CustomInputProps {
  label: string;
  name: "email" | "name" | "avatar_url" | "profession" | "experience" | "projects" | "skills" | "age" | "full_name";
  type?: "text" | "email" | "number" | "textarea";
  placeholder?: string;
  register: UseFormRegister<any>;
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
