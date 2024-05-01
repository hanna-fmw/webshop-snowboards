'use client';
import React from 'react';
import styles from './footer.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type FooterProps = {
	children?: React.ReactNode;
	addressBlock?: string;
	socialMediaBlock?: string;
	linkBlock?: string;
	customerInfoBlock?: string;
	customerSupportBlock?: string;
	copyrightInfo?: string;
	deliveryInfo?: string;
};

const Footer = ({
	addressBlock,
	socialMediaBlock,
	linkBlock,
	customerInfoBlock,
	customerSupportBlock,
	copyrightInfo,
	deliveryInfo,
	children,
}: FooterProps) => {
	const pathName = usePathname();
	return (
		<>
			{pathName !== '/cart' && pathName !== '/checkout' ? (
				<footer className={styles.footer}>
					<section className={styles.gridContainer}>
						{children}

						<ul className={styles.addressBlock}>
							<li>TUR SNOWBOARDS</li>
							<li>ENGELBERKSGATAN&nbsp;24</li> <li>791&nbsp;60&nbsp;FALUN</li> <li>SWEDEN</li>
						</ul>

						<ul className={styles.customerSupportBlock}>
							<li>SUPPORT:</li> <li>MON-FRI 09:00-17:00</li> <li>+46&nbsp;[0]70&nbsp;736&nbsp;12&nbsp;16</li> <li>INFO@TURSNOWBOARDS.com</li>
						</ul>

						<ul className={styles.socialMediaBlock}>
							<li>
								<Link href='https://instagram.com/tursnowboards' className={styles.socialMediaBlockLink}>
									INSTAGRAM
								</Link>
							</li>
							<li>
								<Link href='https://www.facebook.com/tursnowboards' className={styles.socialMediaBlockLink}>
									FACEBOOK
								</Link>
							</li>
						</ul>

						<ul className={styles.pageLinksBlock}>
							<li>[a].HOME</li> <li>[b].SHOP</li> <li>[c].ABOUT</li> <li>[d].SUPPORT</li>
						</ul>

						<ul className={styles.customerInfoBlock}>
							<li>INFO:</li> <li>PRIVACY POLICY</li> <li>TERMS &amp; CONDITIONS</li> <li>DELIVERY &amp; RETURNS</li>
						</ul>

						<ul className={styles.deliveryInfoBlock}>
							<li>TUR SNOWBOARDS</li>
							<li>SHIPPING WORLD WIDE</li>
						</ul>

						<ul className={styles.copyrightInfo}>
							<li>©TURSNOWBOARDS2024</li>
						</ul>
					</section>
				</footer>
			) : null}
		</>
	);
};

export default Footer;
