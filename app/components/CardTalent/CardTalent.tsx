import React from 'react';
import styles from './CardTalent.module.css';
import { Session } from 'next-auth';
import Image from 'next/image';
import TagCustom from '../TagCustom/TagCustom';
import { IoLogoGithub } from 'react-icons/io';
import { FaFolder } from 'react-icons/fa';

type UserProps = {
	user: Session['user'];
};

const CardTalent = ({ user }: UserProps) => {
	return (
		<div className={styles.cardTalent}>
			<Image width={50} height={50} src={`${user.image}`} alt="profile" />
			<h3>{user.full_name || 'Unknow'}</h3>
			<div className={styles.cardTalent__moreUser}>
				<a
					href={`https://github.com/${user.name}`}
					target="_blank"
					rel="noopener noreferrer"
				>
					<p>
						<span>
							<IoLogoGithub />
						</span>{' '}
						Github
					</p>
				</a>
				<a href={`${user.portfolio}`} target="_blank" rel="noopener noreferrer">
					<p>
						<span>
							<FaFolder />
						</span>{' '}
						Portfolio
					</p>
				</a>
			</div>
			<div className={styles.cardTalent__tags}>
				<TagCustom variable="primary" text={user.profession || 'Frontend'} />
				<TagCustom variable="danger" text={user.main_skill || ''} />
			</div>
			<div className={styles.cardTalent__moreInfo}>
				<div>
					<p className="bold">
						{' '}
						{user.time_experience} {user.time_unit}
					</p>
					<span>Experience</span>
				</div>
				<div>
					<p className="bold">{user.projects?.length}</p>
					<span>Projects</span>
				</div>
				<div>
					<p className="bold">{user.skills?.length}</p>
					<span>Skills</span>
				</div>
			</div>
		</div>
	);
};

export default CardTalent;
