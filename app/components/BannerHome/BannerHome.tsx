'use client';

import React, { useState } from 'react';
import stylesHeader from './BannerHome.module.css';
import Image from 'next/image';
import profilePhoto from '../../assets/profile.png';
import { settings } from '@/config/settings';
import ExperienceTab from '../ExperienceTab/ExperienceTab';
import ProjectsTab from '../ProjectsTab/ProjectsTab';
import SkillsTab from '../SkillsTab/SkillsTab';
import { profileData } from '@/config/settings';

const BannerHome = () => {
	const [activeTab, setActiveTab] = useState<string>(
		settings.headerOptions[0].name || 'default'
	);

	// Mapeo de los nombres de las pestañas a sus componentes de contenido
	const tabContentMap: { [key: string]: () => React.ReactNode } = {
		projects: () => (
			<div className={stylesHeader.tabContItems}>
				{profileData.projects.map((item, index) => (
					<ProjectsTab key={index} {...item} />
				))}
			</div>
		),
		experience: () => (
			<div className={stylesHeader.tabContItems}>
				<div className={stylesHeader.gridExperience}>
					{profileData.experience.map((item, index) => (
						<ExperienceTab key={index} {...item} />
					))}
				</div>
			</div>
		),
		skills: () => (
			<div className={stylesHeader.tabContItems}>
				<div className={stylesHeader.gridExperience}>
					{profileData.skills.map((item, index) => (
						<SkillsTab key={index} {...item} />
					))}
				</div>
			</div>
		),
		// Agrega aquí más mapeos según tus opciones de encabezado
	};

	// Obtener el componente de contenido activo basado en el estado
	const ActiveTabContent =
		tabContentMap[activeTab] || (() => <p>Contenido no encontrado</p>);

	return (
		<>
			<div className={stylesHeader.header}>
				<div className={stylesHeader.header__up}></div>
				<div className={stylesHeader.header__down}>
					<div className={stylesHeader.header__photo}>
						<Image
							src={profilePhoto}
							alt="profile photo"
							width={100}
							height={100}
						/>
						<div className={stylesHeader.header__info}>
							<p className="bold">{settings.texts.siteName}</p>
							<p className="txt-gray bold">{settings.texts.email}</p>
						</div>
					</div>

					<div className={stylesHeader.header__options}>
						<ul>
							{settings.headerOptions.map(({ icon, name }, index) => (
								<li
									key={index}
									onClick={() => setActiveTab(name)}
									className={activeTab === name ? stylesHeader.active : ''} // Clase activa para el estilo
								>
									{icon}
									{name}
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
			<div className={stylesHeader.tabCont}>
				<ActiveTabContent />
			</div>
		</>
	);
};

export default BannerHome;
