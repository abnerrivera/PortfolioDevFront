import React from 'react';
import stylesHeader from './BannerHome.module.css';
import Image from 'next/image';
import profilePhoto from '../../assets/profile.png';
import { settings } from '@/config/settings';

const BannerHome = () => {
	return (
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
						{settings.headerOptions.map(({ icon, name, path }, index) => (
							<li key={index}>
								{icon}
								{name}
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default BannerHome;
