import React from 'react';
import styles from './ExperienceTab.module.css';
import { FaCheckCircle } from 'react-icons/fa';

interface ExperienceTabProps {
	title: string;
	company: string;
	responsibilities: string[];
}

const ExperienceTab = ({
	title,
	company,
	responsibilities,
}: ExperienceTabProps) => {
	return (
		<div className={styles.experienceTab}>
			<h3>{title}</h3>
			<p>{company}</p>
			<ul>
				{responsibilities.map((responsibility, index) => (
					<li key={index}><FaCheckCircle /> {responsibility}</li>
				))}
			</ul>
		</div>
	);
};

export default ExperienceTab;
