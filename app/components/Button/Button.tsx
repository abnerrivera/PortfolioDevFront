import React from 'react';
import buttonStyles from './Button.module.css';

interface ButtonProps {
	width?: 'btnFull';
	type?: 'submit';
	variable?: 'primary' | 'secondary' | 'danger'; // Tipo de botón
	style?: React.CSSProperties; // Estilos en línea
	onClick?: () => void;
	children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
	type,
	variable = 'primary',
	style,
	onClick,
	children,
}) => {
	return (
		<button
			className={`${buttonStyles.btnFull} ${buttonStyles.button} ${buttonStyles[variable]} bold`} // Clase dinámica según el tipo
			style={style} // Estilos en línea
			onClick={onClick}
			type={type}
		>
			{children}
		</button>
	);
};

export default Button;
