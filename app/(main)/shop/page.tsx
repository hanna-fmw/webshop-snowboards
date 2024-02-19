'use client'
import styles from './shop.module.css'
import Link from 'next/link'
import React, { useState } from 'react'
import { RiArrowDownSLine } from 'react-icons/ri'
// import ProductGrid from '../components/atoms/productGrid/ProductGrid'
import ProductGrid from '@/app/components/atoms/productGrid/ProductGrid'
// import ProductCard from '../components/molecules/productCard/ProductCard'
import ProductCard from '@/app/components/molecules/productCard/ProductCard'

// import TextBlock from '../components/atoms/textBlock/TextBlock'
import TextBlock from '@/app/components/atoms/textBlock/TextBlock'
// import Figure from '../components/atoms/figure/Figure'
import Figure from '@/app/components/atoms/figure/Figure'

// import products from '../data/products.json'
import products from '@/app/data/products.json'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

const parentVariants = {
	initial: { opacity: 1 },
	animate: {
		opacity: 1,

		transition: {
			staggerChildren: 0.2,
			duration: 0.5,
		},
	},
}

const childrenVariants = {
	initial: { opacity: 0 },
	animate: { opacity: 1 },
}

const Shop = () => {
	const [value, setValue] = useState('Default sorting')
	const [isOpen, setIsOpen] = useState(false)

	const router = useRouter()

	const handleMouseEnter = () => {
		setIsOpen(true)
	}

	const handleMouseLeave = () => {
		setIsOpen(false)
	}

	const handleItemClick = (newValue: string) => {
		setValue(newValue)
		setIsOpen(false)
	}

	return (
		<main className={styles.main}>
			<section className={styles.container}>
				<div className={styles.shopHeader}>
					<ul className={styles.links}>
						<li>
							<Link href='#' className={styles.link}>
								[b].ALL
							</Link>
						</li>
						<li>
							<Link href='#' className={styles.link}>
								[b].SHAPES
							</Link>
						</li>
						<li>
							<Link href='/apparel' className={styles.link}>
								[b].APPAREL
							</Link>
						</li>
						<li>
							<Link href='#' className={styles.link}>
								[b].CRAFTING
							</Link>
						</li>
					</ul>
					<div className={styles.dropdownContainer} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
						<button className={`${styles.button} currDropdown`}>
							<div style={{ marginRight: '5px' }}>{value}</div>
							<div>
								<RiArrowDownSLine size={18} style={{ color: '#212121', transform: 'translateY(10%)' }} />
							</div>
						</button>
						{isOpen && (
							<div className={styles.dropdown}>
								<div className={styles.menuItems}>
									{value === 'Default sorting' && (
										<div className={`${styles.menuItem} ${styles.activeItem}`} onClick={() => handleItemClick('Sort by popularity')}>
											Sort by popularity
										</div>
									)}
									{value === 'Sort by popularity' && (
										<div className={`${styles.menuItem} ${styles.activeItem}`} onClick={() => handleItemClick('Default sorting')}>
											Default sorting
										</div>
									)}
								</div>
							</div>
						)}
					</div>
				</div>
				<motion.section className={styles.productCardSection} variants={parentVariants} initial='initial' animate='animate'>
					{products.map((product, i) => {
						return (
							<motion.div key={i} variants={childrenVariants}>
								<ProductCard>
									<Figure image={`/products/${product.image}`} onClick={() => router.push(`/shop/${product.model}`)} />
									<TextBlock
										name={product.name}
										designer={product.designer}
										length={product.length}
										detail={product.detail}
										profile={product.profile}
										price={product.price}
										// currency='SEK'
									/>
								</ProductCard>
							</motion.div>
						)
					})}
				</motion.section>
			</section>
		</main>
	)
}

export default Shop
