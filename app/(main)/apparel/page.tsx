import React from 'react'
import styles from './apparel.module.css'
import Image from 'next/image'

const Apparel = () => {
	return (
		<div className={styles.apparelContainer}>
			<Image src='/hero/hero_apparel.png' width={1440} height={937} alt='Apparel page hero image' className={styles.apparelImage} />
			<div className={styles.apparel}>
				<div>[C.S]. TUR APPAREL COMING SOON</div>
				<div>[C.S]. FOLLOW US ON INSTAGRAM FOR LATEST UPDATES</div>
			</div>
		</div>
	)
}

export default Apparel
