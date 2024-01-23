import React from 'react'
import styles from './navLink.module.css'
import Link from 'next/link'

type NavLinkProps = {
	url: string
	children?: React.ReactNode
}

const NavLink = ({ children, url }: NavLinkProps) => {
	return (
		<div className={styles.navLinks}>
			<Link href={url} className={styles.navLink}>
				{children}
			</Link>
			{/* <Link href='/' className={styles.navLink}>
						[b]. SHOP
					</Link>
					<Link href='/' className={styles.navLink}>
						[c]. ABOUT
					</Link>
					<Link href='/' className={styles.navLink}>
						[d]. SUPPORT
					</Link> */}
		</div>
	)
}

export default NavLink
