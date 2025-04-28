import React from 'react';
import styles from './SkillsTab.module.css';
import TagCustom from '../TagCustom/TagCustom';

interface SkillsTabProps {
	title: string;
	skills: string[];
}

const SkillsTab = ({ title, skills }: SkillsTabProps) => {
	return (
		<div className={styles.skillsTab}>
			<h3>{title}</h3>
			<div className={styles.skillsContainer}>
				{skills.map((skill, index) => (
					<TagCustom key={index} text={skill} />
				))}
			</div>
		</div>
	);
};

export default SkillsTab;
