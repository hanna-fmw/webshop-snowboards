import React from 'react'
import styles from './heroSection.module.css'
import { unstable_getImgProps as getImgProps } from 'next/image'

const { heroContainer, heroImage, heroMobile, heroText } = styles

const HeroSection = () => {
	//unstable_getImgProps to be able to use srcSet to change image based on screen size in latest Next.js version
	const {
		props: { srcSet: desktop },
	} = getImgProps({ src: '/hero/StartPageHero_1.png', alt: 'Hero Image Desktop', width: '1440', height: '400' })
	const {
		props: { srcSet: mobile },
	} = getImgProps({ src: '/hero/Hero-Mobile.png', alt: 'Hero Image Mobile', width: '600', height: '400' })

	return (
		<div className={heroContainer}>
			<picture>
				<source media='(max-width:567px)' srcSet={mobile} />
				<source media='(min-width: 568px)' srcSet={desktop} />
				<img src={desktop} alt='Hero image' className={heroImage} />
			</picture>
		</div>
	)
}

export default HeroSection
