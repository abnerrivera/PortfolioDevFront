import React from 'react';
import styles from './ProjectsTab.module.css';
import TagCustom from '../TagCustom/TagCustom';
import Image, { StaticImageData } from 'next/image';
import { FaGithub } from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi';

interface ProjectsTabProps {
	imageUrl: StaticImageData;
	title: string;
	tags: string[];
	description: string;
	liveDemoUrl: string;
	githubUrl: string;
}

const ProjectsTab: React.FC<ProjectsTabProps> = ({
	imageUrl,
	description,
	githubUrl,
	liveDemoUrl,
	tags,
	title,
}) => {
	return (
		<div className={`${styles.projectCard} border`}>
			<Image alt="image project" src={imageUrl} width={500} height={300} />
			<h4>{title}</h4>
			<div className={styles.projectTags}>
				{tags.map((item, index) => (
					<TagCustom text={item} variable={'primary'} key={index} />
				))}
			</div>
			<p className="txt-gray">{description}</p>
			<div className={styles.projectBtns}>
				<a href={liveDemoUrl} target="_blank" rel="noopener noreferrer">
					<FiExternalLink />
					View Project
				</a>
				<a href={githubUrl} target="_blank" rel="noopener noreferrer">
					<FaGithub />
					Code
				</a>
			</div>
		</div>
	);
};

export default ProjectsTab;
