"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Session } from "next-auth";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import styles from "./ProfileClient.module.css";

interface ProfileClientProps {
  session: Session | null;
}

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

const ProfileClient = ({ session }: ProfileClientProps) => {
  if (!session) return <p>No estás autenticado</p>;

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!session?.user.email) return;
      setLoading(true);

      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", session.user.email)
        .single();

      if (error) {
        console.error("Error obteniendo datos:", error);
      } else if (data) {
        reset({
          email: data.email || "",
          name: data.name || "",
          avatar_url: data.avatar_url || "",
          profession: data.profession || "",
          experience: Array.isArray(data.experience) ? data.experience.join(", ") : "",
          projects: Array.isArray(data.projects) ? data.projects.join(", ") : "",
          skills: Array.isArray(data.skills) ? data.skills.join(", ") : "",
          age: data.age?.toString() || "",
          full_name: data.full_name || "",
        });
      }

      setLoading(false);
    };

    fetchUserData();
  }, [session, reset]);

  const onSubmit = async (data: FormData) => {
    const { error } = await supabase
      .from("users")
      .update({
        email: data.email,
        name: data.name,
        avatar_url: data.avatar_url,
        profession: data.profession,
        experience: data.experience.split(",").map((item) => item.trim()),
        projects: data.projects.split(",").map((item) => item.trim()),
        skills: data.skills.split(",").map((item) => item.trim()),
        age: Number(data.age),
        full_name: data.full_name,
      })
      .eq("email", session.user.email);

    if (error) {
      console.error("Error actualizando usuario:", error);
    } else {
      alert("Datos actualizados correctamente.");
    }
  };

  return (
    <div className={styles.profileCont}>
      <h1>Bienvenido, {session.user.name}</h1>
      <Image width={100} height={100} src={session.user.image!} alt="Avatar" />

      {loading ? (
        <p>Cargando datos...</p>
      ) : (
        <form className={styles.formProfile} onSubmit={handleSubmit(onSubmit)}>
          <label>
            Email:
            <input type="email" {...register("email", { required: true })} />
            {errors.email && <span>El email es obligatorio</span>}
          </label>

          <label>
            Nombre:
            <input type="text" {...register("name", { required: true })} />
            {errors.name && <span>El nombre es obligatorio</span>}
          </label>

          <label>
            Avatar URL:
            <input type="text" {...register("avatar_url")} />
          </label>

          <label>
            Profesión:
            <input type="text" {...register("profession")} />
          </label>

          <label>
            Experiencia (separada por comas):
            <textarea {...register("experience")} />
          </label>

          <label>
            Proyectos (separados por comas):
            <textarea {...register("projects")} />
          </label>

          <label>
            Habilidades (separadas por comas):
            <textarea {...register("skills")} />
          </label>

          <label>
            Edad:
            <input type="number" {...register("age")} />
          </label>

          <label>
            Nombre Completo:
            <input type="text" {...register("full_name")} />
          </label>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Guardando..." : "Actualizar"}
          </button>
        </form>
      )}
    </div>
  );
};

export default ProfileClient;
