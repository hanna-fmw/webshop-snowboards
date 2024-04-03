import React from 'react';
import styles from './filterLinks.module.css';
import Link from 'next/link';

const FilterLinks = () => {
	return (
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
	);
};

export default FilterLinks;
