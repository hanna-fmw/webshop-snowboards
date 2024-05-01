import React from 'react';
import styles from './navLink.module.css';
import Link from 'next/link';

type NavLinkProps = {
	url: string;
	children?: React.ReactNode;
};

const NavLink = ({ children, url }: NavLinkProps) => {
	return (
		<div className={styles.navLinks}>
			<Link href={url} className={styles.navLink}>
				{children}
			</Link>
		</div>
	);
};

export default NavLink;
