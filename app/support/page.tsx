'use client'
import React from 'react'
import styles from './support.module.css'

const About = () => {
	//unstable_getImgProps to be able to use srcSet to change image based on screen size in latest Next.js version
	// const {
	// 	props: { srcSet: desktop },
	// } = getImgProps({ src: '/hero/hero_desktop.png', alt: 'Hero Image Desktop', width: '1440', height: '937' })
	// const {
	// 	props: { srcSet: mobile },
	// } = getImgProps({ src: '/hero/hero_mobile.png', alt: 'Hero Image Mobile', width: '390', height: '580' })

	return (
		<>
			<div className={styles.supportContainer}>
				<div className={styles.tcs}>[T.C.S] TUR CUSTOMER SUPPORT</div>
				<div className={styles.number}>[01].</div> <div className={styles.heading}>SUPPORT INFO</div>
				<div className={styles.text}>
					<span style={{ display: 'block' }}>MONDAY – FRIDAY 09:00-17:00 CET</span>
					<span style={{ display: 'block' }}>+46 [0]70 736 12 16</span> <span style={{ display: 'block' }}>INFO@TURSNOWBOARDS.COM</span>{' '}
					<span style={{ display: 'block', marginTop: '1.2rem' }}>
						TUR SNOWBOARDS
						<br />
						HEADQUARTERS + SHOWROOM
					</span>{' '}
					<span style={{ display: 'block', marginTop: '1.2rem' }}>
						ENGELBREKTSGATAN 24
						<br />
						791 60 FALUN
						<br />
						SWEDEN
					</span>
				</div>
			</div>
		</>
	)
}

export default About
