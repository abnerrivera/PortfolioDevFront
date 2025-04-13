'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Session } from 'next-auth';
import styles from './talentPool.module.css';
import CardTalent from '@/app/components/CardTalent/CardTalent';
import SearchFilter from '@/app/components/SearchFilterBar/SearchFilterBar';

type User = Session['user'];

const TalentPool = () => {
	const [users, setUsers] = useState<User[]>([]);

	const fetchUsers = async () => {
		const { data, error } = await supabase.from('users').select('*');

		if (error) {
			console.log('Error al obtener usuarios:', error);
		} else {
			console.log('Usuarios obtenidos correctamente');

			// Normalizar los datos antes de guardarlos
			const normalizedUsers: User[] = data.map((user) => ({
				...user,
				image: user.avatar_url, // Mapeo avatar_url -> image
			}));

			setUsers(normalizedUsers);
		}
	};

	const completedUser = users.filter(
		(user) => user.full_name !== null && user.full_name?.trim() !== ''
	);

	useEffect(() => {
		fetchUsers();
	}, []);

	return (
		<section>
			<SearchFilter />
			<div className={styles.talentCont}>
				{completedUser.map((item, index) => (
					<CardTalent key={index} user={item} />
				))}
			</div>
		</section>
	);
};

export default TalentPool;
