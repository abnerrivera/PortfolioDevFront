// components/Pagination/Pagination.tsx
import React from 'react';
import styles from './Pagination.module.css';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className={styles.pagination}>
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Anterior
            </button>
            <ul className={styles.pageNumbers}>
                {pageNumbers.map((number) => (
                    <li
                        key={number}
                        className={currentPage === number ? styles.active : ''}
                        onClick={() => onPageChange(number)}
                    >
                        {number}
                    </li>
                ))}
            </ul>
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Siguiente
            </button>
        </div>
    );
};

export default Pagination;