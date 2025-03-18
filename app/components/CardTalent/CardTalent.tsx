import React from 'react';
import styles from './CardTalent.module.css';
import { Session } from 'next-auth';
import Image from 'next/image';

type UserProps = {
	user: Session['user'];
};

const CardTalent = ({ user }: UserProps) => {
	return (
		<div className={styles.cardTalent}>
			<Image width={50} height={50} src={`${user.image}`} alt="profile" />
			<h3>{user.fullName || 'Unknow'}</h3>
			<p>Github: {user.name}</p>
            <span>{user.profession || 'Frontend'}</span>
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
