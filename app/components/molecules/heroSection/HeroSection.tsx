'use client';
import React from 'react';
import styles from './heroSection.module.css';
import Image from 'next/image';
import Button from '../../atoms/button/Button';
import { useRouter } from 'next/navigation';

const { heroImage } = styles;

const HeroSection = () => {
	const router = useRouter();
	return (
		<>
			<div className={styles.heroContainer}>
				<Image src='/hero/hero_desktop.png' width={1440} height={937} className={heroImage} alt='Hero image' />
				<div className={styles.heroContent}>
					<div>
						OUR LEGACY WORKSHOP X TUR <span style={{ display: 'block' }}>BUBO 150.4 / 154.4 CM</span>
					</div>
					<div style={{ marginBlock: '1.2rem' }}>EXPLORE WORK SHOP TUR SNOWBOARDS BUBO, HANK GRÜNER EDITION.</div>
					<Button variant='btn-hero' onClick={() => router.push('/shop')}>
						SHOP NOW
					</Button>
				</div>
			</div>
		</>
	);
};

export default HeroSection;
