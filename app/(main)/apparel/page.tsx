import React from 'react'
import styles from './apparel.module.css'
import Image from 'next/image'
import FilterLinks from '@/app/components/atoms/filterLinks/FilterLinks'

const Apparel = () => {
	return (
		<section className={styles.container}>
			<div className={styles.linkContainer}>
				<FilterLinks />
			</div>
			<div>
				<section className={styles.heroContainer}>
					<Image src='/hero/hero_apparel.png' width={1440} height={937} alt='Apparel page hero image' className={styles.heroImage} />
				</section>
				<div className={styles.apparelDetails}>
					<div>[C.S]. TUR APPAREL COMING SOON</div>
					<div>[C.S]. FOLLOW US ON INSTAGRAM FOR LATEST UPDATES</div>
				</div>
			</div>
		</section>
	)
}

export default Apparel
