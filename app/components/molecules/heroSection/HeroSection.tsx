import React from 'react'
import styles from './heroSection.module.css'
import Image, { unstable_getImgProps as getImgProps } from 'next/image'

const { heroContainer, heroImage, heroText } = styles

const HeroSection = () => {
	//unstable_getImgProps to be able to use srcSet to change image based on screen size in latest Next.js version
	const {
		props: { srcSet: desktop },
	} = getImgProps({ src: '/hero/hero_desktop.png', alt: 'Hero Image Desktop', width: '1440', height: '937' })
	const {
		props: { srcSet: mobile },
	} = getImgProps({ src: '/hero/hero_mobile.png', alt: 'Hero Image Mobile', width: '390', height: '580' })

	return (
		<div className={heroContainer}>
			{/* <picture>
				<source media='(max-width:768px)' srcSet={mobile} />
				<source media='(min-width: 769px)' srcSet={desktop} />
				<img src={desktop} alt='Hero image' className={heroImage} />
			</picture> */}

			<Image src='/hero/hero_desktop.png' width={1440} height={937} className={heroImage} alt='Hero image' />
		</div>
	)
}

export default HeroSection
