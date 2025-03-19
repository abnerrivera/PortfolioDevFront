import React from 'react';
import styles from './CardTalent.module.css';
import { Session } from 'next-auth';
import Image from 'next/image';
import TagCustom from '../TagCustom/TagCustom';

type UserProps = {
	user: Session['user'];
};

const CardTalent = ({ user }: UserProps) => {
	return (
		<div className={styles.cardTalent}>
			<Image width={50} height={50} src={`${user.image}`} alt="profile" />
			<h3>{user.full_name || 'Unknow'}</h3>
			<a
				href={`https://github.com/${user.name}`}
				target="_blank"
				rel="noopener noreferrer"
			>
				<p>Github: {user.name}</p>
			</a>
			<a href={`${user.portfolio}`} target="_blank" rel="noopener noreferrer">
				<p>Portfolio: Click Here</p>
			</a>
			<TagCustom variable="primary" text={user.profession || 'Frontend'} />
			<div className={styles.cardTalent__moreInfo}>
				<div>
					<p>20</p>
					<span>Projects</span>
				</div>
				<div>
					<p>20</p>
					<span>Projects</span>
				</div>
				<div>
					<p>20</p>
					<span>Projects</span>
				</div>
			</div>
		</div>
	);
};

export default CardTalent;
