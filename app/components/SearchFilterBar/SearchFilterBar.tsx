'use client';

import { useState } from 'react';
import styles from './SearchFilterBar.module.css';

interface SearchFilterBarProps {
    search: string;
    onSearch: (searchText: string) => void; // Cambiamos onSearchChange a onSearch que recibe el texto final
    profession: string;
    onProfessionChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    skill: string;
    onSkillChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    experience: string;
    onExperienceChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    professions: { value: string; label: string }[];
    skills: { value: string; label: string }[];
    experiences: { value: string; label: string }[];
}

const SearchFilterBar: React.FC<SearchFilterBarProps> = ({
    search: initialSearch, // Renombramos para evitar confusión con el estado local
    onSearch,
    profession,
    onProfessionChange,
    skill,
    onSkillChange,
    experience,
    onExperienceChange,
    professions,
    skills,
    experiences,
}) => {
    const [localSearch, setLocalSearch] = useState(initialSearch); // Estado local para el input de búsqueda

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalSearch(e.target.value);
    };

    const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onSearch(localSearch); // Llama a la función onSearch al presionar Enter
        }
    };

    return (
        <div className={styles.searchFilterBar}>
            <input
                type="text"
                placeholder="Search..."
                value={localSearch}
                onChange={handleInputChange}
                onKeyPress={handleSearchKeyPress} // Detecta la pulsación de teclas
                className={`${styles.searchInput} bold text-sm txt-gray`}
            />

            <div className={styles.filters}>
                <select
                    value={profession}
                    onChange={onProfessionChange}
                    className={`${styles.filterSelect} bold text-sm txt-gray`}
                >
                    {professions.map((item, index) => (
                        <option key={index} value={item.value}>
                            {item.label}
                        </option>
                    ))}
                </select>

                <select
                    value={skill}
                    onChange={onSkillChange}
                    className={`${styles.filterSelect} bold text-sm txt-gray`}
                >
                    {skills.map((item, index) => (
                        <option key={index} value={item.value}>
                            {item.label}
                        </option>
                    ))}
                </select>

                <select
                    value={experience}
                    onChange={onExperienceChange}
                    className={`${styles.filterSelect} bold text-sm txt-gray`}
                >
                    {experiences.map((item, index) => (
                        <option key={index} value={item.value}>
                            {item.label}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default SearchFilterBar;