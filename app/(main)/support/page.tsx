'use client';
import React from 'react';
import styles from './support.module.css';

const About = () => {
	return (
		<section className={styles.supportContainer}>
			<header className={styles.header}>[T.C.S] TUR CUSTOMER SUPPORT</header>

			<div className={styles.sectionLabel}>[01].</div>
			<h2 className={styles.sectionHeading}>SUPPORT INFO</h2>
			<address className={styles.address}>
				<p>MONDAY – FRIDAY 09:00-17:00 CET</p>
				<p>+46 [0]70 736 12 16</p>
				<p>INFO@TURSNOWBOARDS.COM</p>
				<p>
					TUR SNOWBOARDS
					<br />
					HEADQUARTERS + SHOWROOM
				</p>
				<p>
					ENGELBREKTSGATAN 24
					<br />
					791 60 FALUN
					<br />
					SWEDEN
				</p>
			</address>
		</section>
	);
};

export default About;
