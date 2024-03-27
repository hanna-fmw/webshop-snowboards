import React from 'react';
import styles from './apparel.module.css';
import Image from 'next/image';
import Link from 'next/link';

const Apparel = () => {
	return (
		<section className={styles.container}>
			{/* <div className={styles.header}> */}
			<ul className={styles.links}>
				<li>
					<Link href='/shop' className={styles.link}>
						[b].ALL
					</Link>
				</li>
				<li>
					<Link href='/product-category/shapes' className={styles.link}>
						[b].SHAPES
					</Link>
				</li>
				<li>
					<Link href='/apparel' className={styles.link}>
						[b].APPAREL
					</Link>
				</li>
				<li>
					<Link href='/product-category/crafting' className={styles.link}>
						[b].CRAFTING
					</Link>
				</li>
			</ul>
			{/* </div> */}

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
	);
};

export default Apparel;
