'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { Session } from 'next-auth';
import styles from './talentPool.module.css';
import CardTalent from '@/app/components/CardTalent/CardTalent';
import SearchFilter from '@/app/components/SearchFilterBar/SearchFilterBar';
import Pagination from '@/app/components/Pagination/Pagination';
import { settings } from '@/config/settings';

const { professions, skills, experiences } = settings;

type User = Session['user'];

const TalentPool = () => {
	const [users, setUsers] = useState<User[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [usersPerPage] = useState<number>(12);
	const [totalUsers, setTotalUsers] = useState<number>(0);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [search, setSearch] = useState('');
	const [profession, setProfession] = useState('All');
	const [skill, setSkill] = useState('All');
	const [experience, setExperience] = useState('All');

	const totalPages = Math.ceil(totalUsers / usersPerPage);

	const fetchUsers = useCallback(async () => {
		setLoading(true);
		setError(null);

		const startIndex = (currentPage - 1) * usersPerPage;
		const endIndex = startIndex + usersPerPage - 1;

		let query = supabase
			.from('users')
			.select('*', { count: 'exact' })
			.range(startIndex, endIndex);

		if (search) {
			query = query.ilike('full_name', `%${search}%`);
		}
		if (profession !== 'All') {
			query = query.eq('profession', profession);
		}
		if (skill !== 'All') {
			query = query.ilike('main_skill', `%${skill}%`);
		}
		if (experience !== 'All') {
			if (experience === '0-6-Months') {
				query = query
					.filter('time_experience', 'gte', 0)
					.filter('time_unit', 'eq', 'months')
					.filter('time_experience', 'lte', 6);
			} else if (experience === '6-12-Months') {
				query = query
					.filter('time_experience', 'gte', 6)
					.filter('time_unit', 'eq', 'months')
					.filter('time_experience', 'lte', 12);
			} else if (experience === '1-3-Years') {
				query = query
					.filter('time_experience', 'gte', 1)
					.filter('time_unit', 'eq', 'years')
					.filter('time_experience', 'lte', 3);
			} else if (experience === '3-6-Years') {
				query = query
					.filter('time_experience', 'gte', 3)
					.filter('time_unit', 'eq', 'years')
					.filter('time_experience', 'lte', 6);
			} else if (experience === '6+-0-Years') {
				query = query
					.filter('time_experience', 'gte', 6)
					.filter('time_unit', 'eq', 'years');
			}
		}

		const { data, error, count } = await query;

		if (error) {
			console.error('Error al obtener usuarios:', error);
			setError(error.message);
		} else {
			const normalizedUsers: User[] = data.map((user) => ({
				...user,
				image: user.avatar_url,
			}));
			setUsers(normalizedUsers);
			setTotalUsers(count || 0);
		}
		setLoading(false);
	}, [
		currentPage,
		usersPerPage,
		search,
		profession,
		skill,
		experience,
		supabase,
	]);

	const handlePageChange = (newPage: number) => {
		setCurrentPage(newPage);
	};

	const handleSearch = (searchText: string) => {
		setSearch(searchText);
		setCurrentPage(1);
	};

	const handleProfessionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setProfession(e.target.value);
		setCurrentPage(1);
	};

	const handleSkillChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSkill(e.target.value);
		setCurrentPage(1);
	};

	const handleExperienceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setExperience(e.target.value);
		setCurrentPage(1);
	};

	useEffect(() => {
		fetchUsers();
	}, [fetchUsers]);

	if (loading) {
		return <div>Cargando usuarios...</div>;
	}

	if (error) {
		return <div>Error al cargar los usuarios: {error}</div>;
	}

	const completedUser = users.filter(
		(user) => user.full_name !== null && user.full_name?.trim() !== ''
	);

	return (
		<section>
			<SearchFilter
				search={search}
				onSearch={handleSearch}
				profession={profession}
				onProfessionChange={handleProfessionChange}
				skill={skill}
				onSkillChange={handleSkillChange}
				experience={experience}
				onExperienceChange={handleExperienceChange}
				professions={professions}
				skills={skills}
				experiences={experiences}
			/>
			<div className={styles.talentCont}>
				{completedUser.map((item, index) => (
					<CardTalent key={index} user={item} />
				))}
			</div>
			{totalPages > 1 && (
				<Pagination
					currentPage={currentPage}
					totalPages={totalPages}
					onPageChange={handlePageChange}
				/>
			)}
		</section>
	);
};

export default TalentPool;
