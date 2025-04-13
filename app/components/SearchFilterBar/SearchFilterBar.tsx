'use client';

import { useState } from 'react';

//styles
import styles from './SearchFilterBar.module.css';

//settings
import { settings } from '@/config/settings';

const professions = settings.professions;
const skills = settings.skills;
const experiences = settings.experiences;

export default function SearchFilterBar() {
	const [search, setSearch] = useState('');
	const [profession, setProfession] = useState('All');
	const [skill, setSkill] = useState('All');
	const [experience, setExperience] = useState('All');

	return (
		<div className={styles.searchFilterBar}>
			<input
				type="text"
				placeholder="Search..."
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				className={`${styles.searchInput} bold text-sm txt-gray`}
			/>

			<div className={styles.filters}>
				<select
					value={profession}
					onChange={(e) => setProfession(e.target.value)}
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
					onChange={(e) => setSkill(e.target.value)}
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
					onChange={(e) => setExperience(e.target.value)}
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
}
