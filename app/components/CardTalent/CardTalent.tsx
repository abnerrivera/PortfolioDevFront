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
      <div className={styles.cardTalent__header}>
        <Image
          width={64}
          height={64}
          src={`${user.image}`}
          alt="profile"
          className={styles.cardTalent__avatar}
        />
        <div>
          <h3>{user.full_name || 'Unknown'}</h3>
          <p className={styles.cardTalent__role}>{user.profession || 'Frontend Developer'}</p>
        </div>
      </div>

      <div className={styles.cardTalent__links}>
        <a
          href={`https://github.com/${user.name}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <IoLogoGithub /> GitHub
        </a>
        <a href={`${user.portfolio}`} target="_blank" rel="noopener noreferrer">
          <FaFolder /> Portfolio
        </a>
      </div>

      <div className={styles.cardTalent__tags}>
        <TagCustom variable="primary" text={user.profession || 'Frontend'} />
        <TagCustom variable="danger" text={user.main_skill || ''} />
      </div>

      <div className={styles.cardTalent__info}>
        <p className="bold">
          {user.time_experience} {user.time_unit}
        </p>
        <span>Experience</span>
      </div>

      <div className={styles.cardTalent__extra}>
        <p>🌍 Remote · 🇺🇸 USA</p>
        <p>💬 English (Fluent)</p>
      </div>
    </div>
  );
};

export default CardTalent;