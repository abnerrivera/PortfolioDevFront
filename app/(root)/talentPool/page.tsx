'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { supabase } from '@/lib/supabase';
import { Session } from 'next-auth';
import styles from './talentPool.module.css';
import CardTalent from '@/app/components/CardTalent/CardTalent';
import SearchFilter from '@/app/components/SearchFilterBar/SearchFilterBar';
import Pagination from '@/app/components/Pagination/Pagination';
import { settings } from '@/config/settings';

const { professions, skills, experiences } = settings;

type User = Session['user'];

const LoadingState = () => <div>Cargando usuarios...</div>;
const ErrorState = ({ message }: { message: string }) => (
	<div>Error al cargar los usuarios: {message}</div>
);

const TalentPool = () => {
	const [users, setUsers] = useState<User[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [usersPerPage] = useState<number>(12);
	const [totalUsers, setTotalUsers] = useState<number>(0);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [filters, setFilters] = useState({
		search: '',
		profession: 'All',
		skill: 'All',
		experience: 'All',
	});

	const totalPages = useMemo(
		() => Math.ceil(totalUsers / usersPerPage),
		[totalUsers, usersPerPage]
	);

	const buildQuery = useCallback(
		(startIndex: number, endIndex: number) => {
			const { search, profession, skill, experience } = filters;
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
				switch (experience) {
					case '0-6-Months':
						query = query
							.filter('time_experience', 'gte', 0)
							.filter('time_unit', 'eq', 'months')
							.filter('time_experience', 'lte', 6);
						break;
					case '6-12-Months':
						query = query
							.filter('time_experience', 'gte', 6)
							.filter('time_unit', 'eq', 'months')
							.filter('time_experience', 'lte', 12);
						break;
					case '1-3-Years':
						query = query
							.filter('time_experience', 'gte', 1)
							.filter('time_unit', 'eq', 'years')
							.filter('time_experience', 'lte', 3);
						break;
					case '3-6-Years':
						query = query
							.filter('time_experience', 'gte', 3)
							.filter('time_unit', 'eq', 'years')
							.filter('time_experience', 'lte', 6);
						break;
					case '6+-0-Years':
						query = query
							.filter('time_experience', 'gte', 6)
							.filter('time_unit', 'eq', 'years');
						break;
				}
			}
			return query;
		},
		[filters]
	);

	const fetchUsers = useCallback(async () => {
		setLoading(true);
		setError(null);

		const startIndex = (currentPage - 1) * usersPerPage;
		const endIndex = startIndex + usersPerPage - 1;
		const query = buildQuery(startIndex, endIndex);

		try {
			const { data, error, count } = await query;

			if (error) throw error;

			const normalizedUsers: User[] = data.map((user) => ({
				...user,
				image: user.avatar_url,
			}));

			setUsers(normalizedUsers);
			setTotalUsers(count || 0);
		} catch (err) {
			console.error('Error al obtener usuarios:', err);
			setError(err instanceof Error ? err.message : 'Error desconocido');
		} finally {
			setLoading(false);
		}
	}, [currentPage, usersPerPage, buildQuery]);

	const handlePageChange = useCallback((newPage: number) => {
		setCurrentPage(newPage);
	}, []);

	const handleFilterChange = useCallback((key: string, value: string) => {
		setFilters((prev) => ({ ...prev, [key]: value }));
		setCurrentPage(1);
	}, []);

	useEffect(() => {
		fetchUsers();
	}, [fetchUsers]);

	if (loading) return <LoadingState />;
	if (error) return <ErrorState message={error} />;

	const completedUsers = users.filter(
		(user) => user.full_name !== null && user.full_name?.trim() !== ''
	);

	return (
		<section>
			<SearchFilter
				search={filters.search}
				onSearch={(searchText) => handleFilterChange('search', searchText)}
				profession={filters.profession}
				onProfessionChange={(e) =>
					handleFilterChange('profession', e.target.value)
				}
				skill={filters.skill}
				onSkillChange={(e) => handleFilterChange('skill', e.target.value)}
				experience={filters.experience}
				onExperienceChange={(e) =>
					handleFilterChange('experience', e.target.value)
				}
				professions={professions}
				skills={skills}
				experiences={experiences}
			/>
			<div className={styles.talentCont}>
				{completedUsers.length > 0 ? (
					completedUsers.map((user, index) => (
						<CardTalent key={user.id || index} user={user} />
					))
				) : (
					<p>
						No se encontraron usuarios que coincidan con los criterios de
						búsqueda.
					</p>
				)}
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
