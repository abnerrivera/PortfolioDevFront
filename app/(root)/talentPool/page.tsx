'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Session } from 'next-auth';
import styles from './talentPool.module.css';
import CardTalent from '@/app/components/CardTalent/CardTalent';
import SearchFilter from '@/app/components/SearchFilterBar/SearchFilterBar';
import Pagination from '@/app/components/Pagination/Pagination'; // Importa el componente Pagination

type User = Session['user'];

const TalentPool = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [usersPerPage] = useState<number>(12);
    const [totalUsers, setTotalUsers] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const totalPages = Math.ceil(totalUsers / usersPerPage);

    const fetchUsers = async () => {
        setLoading(true);
        setError(null);

        const startIndex = (currentPage - 1) * usersPerPage;
        const endIndex = startIndex + usersPerPage - 1;

        const { data, error, count } = await supabase
            .from('users')
            .select('*', { count: 'exact' })
            .range(startIndex, endIndex);

        if (error) {
            console.error('Error al obtener usuarios:', error);
            setError(error.message);
        } else {
            console.log('Usuarios obtenidos correctamente');
            const normalizedUsers: User[] = data.map((user) => ({
                ...user,
                image: user.avatar_url,
            }));
            setUsers(normalizedUsers);
            setTotalUsers(count || 0);
        }
        setLoading(false);
    };

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    const completedUser = users.filter(
        (user) => user.full_name !== null && user.full_name?.trim() !== ''
    );

    useEffect(() => {
        fetchUsers();
    }, [currentPage]);

    if (loading) {
        return <div>Cargando usuarios...</div>;
    }

    if (error) {
        return <div>Error al cargar los usuarios: {error}</div>;
    }

    return (
        <section>
            <SearchFilter />
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