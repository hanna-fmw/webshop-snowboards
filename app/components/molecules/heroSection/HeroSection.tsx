'use client';
import React from 'react';
import styles from './heroSection.module.css';
// import Image, { unstable_getImgProps as getImgProps } from 'next/image';
import Image from 'next/image';
import Button from '../../atoms/button/Button';

const { heroContainer, heroImage, heroText } = styles;

const HeroSection = () => {
	return (
		<>
			<div className={styles.heroContainer}>
				{/* <picture>
				<source media='(max-width:768px)' srcSet={mobile} />
				<source media='(min-width: 769px)' srcSet={desktop} />
				<img src={desktop} alt='Hero image' className={heroImage} />
			</picture> */}

				<Image src='/hero/hero_desktop.png' width={1440} height={937} className={heroImage} alt='Hero image' />
				{/* <div>
					<Image src='/logo/sun_logo.png' width={800} height={1000} className={styles.sunLogo} alt='Hero image' priority />
				</div> */}
				<div className={styles.heroContent}>
					<div>
						OUR LEGACY WORKSHOP X TUR <span style={{ display: 'block' }}>BUBO 150.4 / 154.4 CM</span>
					</div>
					<div style={{ marginBlock: '1.2rem' }}>EXPLORE WORK SHOP TUR SNOWBOARDS BUBO, HANK GRÜNER EDITION.</div>
					<Button variant='btn-hero' onClick={() => {}}>
						SHOP NOW
					</Button>
				</div>
			</div>
		</>
	);
};

export default HeroSection;
