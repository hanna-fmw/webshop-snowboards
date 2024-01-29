'use client'
import React from 'react'
import styles from './about.module.css'
import Image, { unstable_getImgProps as getImgProps } from 'next/image'

const { aboutContainer, aboutImage, aboutText } = styles

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
			<div className={aboutContainer}>
				{/* <picture>
				<source media='(max-width:768px)' srcSet={mobile} />
				<source media='(min-width: 769px)' srcSet={desktop} />
				<img src={desktop} alt='Hero image' className={heroImage} />
			</picture> */}

				<Image src='/hero/hero_about.png' width={1440} height={937} className={aboutImage} alt='About page hero image' />
				{/* <div style={{ height: '100vh' }}>
					<Image src='/logo/sun_logo.png' width={800} height={1000} className={styles.sunLogo} alt='About page hero image' priority />
				</div> */}
				<div className={styles.aboutContent}>
					TUR SNOWBOARDS FROM SWEDEN. SHAPED WITH A PURPOSE. IMAGINED FROM A LIFETIME OF PROFESSIONALEXPERIENCE. DESIGNED TO COVER EVERY CORNER OF THE
					MOUNTAIN. CONSTRUCTED WITH HIGH PERFORMANCE MATERIALS AND EXCEPTIONAL DETAILING. APPROVED BY THE HARSH CONDITIONS OF SCANDINAVIA. REFINED
					FOR THE MOUNTAINS OF THE WORLD. MADE TO BE RIDDEN BY YOU.
				</div>
			</div>
			<div className={styles.about}>
				<div className={styles.ats}>[A.T.S] ABOUT TUR SNOWBOARDS</div>
				<div className={styles.number1}>[01].</div> <div className={styles.approved1}>APPROVED BY SCANDINAVIA</div>
				<div className={styles.number2}>[02].</div> <div className={styles.shaped1}>SHAPED WITH A PURPOSE</div>
				<div className={styles.number3}>[03].</div> <div className={styles.shaped2}>SHAPED WITH A PURPOSE</div>
				<div className={styles.number4}>[04].</div> <div className={styles.shaped3}>SHAPED WITH A PURPOSE</div>
				<div className={styles.text1}>
					Scandinavia is no ordinary landscape. Being so close to the Arctic circle, the conditions can vary greatly depending on where the wind is
					blowing from and the snow can quickly change from hard ice to deep powder. There’s no such thing as the same day of snow here. This
					challenging terrain makes it the perfect testing ground for our boards. If they works here, they will work anywhere. All of our boards are
					designed, shaped and put through rigorous testing in the most diverse snow conditions within a wide radius of our backyard of Åre in Sweden.
					We work together with splitboard guides, pro-riders and enthusiasts, and of course, ourselves, to ensure our boards reach the level of
					performance we need.
				</div>
				<div className={styles.text2}>
					Scandinavia is no ordinary landscape. Being so close to the Arctic circle, the conditions can vary greatly depending on where the wind is
					blowing from and the snow can quickly change from hard ice to deep powder. There’s no such thing as the same day of snow here. This
					challenging terrain makes it the perfect testing ground for our boards. If they works here, they will work anywhere. All of our boards are
					designed, shaped and put through rigorous testing in the most diverse snow conditions within a wide radius of our backyard of Åre in Sweden.
					We work together with splitboard guides, pro-riders and enthusiasts, and of course, ourselves, to ensure our boards reach the level of
					performance we need.
				</div>
				<div className={styles.text3}>
					Scandinavia is no ordinary landscape. Being so close to the Arctic circle, the conditions can vary greatly depending on where the wind is
					blowing from and the snow can quickly change from hard ice to deep powder. There’s no such thing as the same day of snow here. This
					challenging terrain makes it the perfect testing ground for our boards. If they works here, they will work anywhere. All of our boards are
					designed, shaped and put through rigorous testing in the most diverse snow conditions within a wide radius of our backyard of Åre in Sweden.
					We work together with splitboard guides, pro-riders and enthusiasts, and of course, ourselves, to ensure our boards reach the level of
					performance we need.
				</div>
				<div className={styles.text4}>
					Scandinavia is no ordinary landscape. Being so close to the Arctic circle, the conditions can vary greatly depending on where the wind is
					blowing from and the snow can quickly change from hard ice to deep powder. There’s no such thing as the same day of snow here. This
					challenging terrain makes it the perfect testing ground for our boards. If they works here, they will work anywhere. All of our boards are
					designed, shaped and put through rigorous testing in the most diverse snow conditions within a wide radius of our backyard of Åre in Sweden.
					We work together with splitboard guides, pro-riders and enthusiasts, and of course, ourselves, to ensure our boards reach the level of
					performance we need.
				</div>
			</div>
		</>
	)
}

export default About
