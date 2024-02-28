'use client'
import styles from './shop.module.css'
import Link from 'next/link'
import React, { useState } from 'react'
import { RiArrowDownSLine } from 'react-icons/ri'
import { RiArrowUpSLine } from 'react-icons/ri'
import ProductGrid from '@/app/components/atoms/productGrid/ProductGrid'
import ProductCard from '@/app/components/molecules/productCard/ProductCard'
import TextBlock from '@/app/components/atoms/textBlock/TextBlock'
import Figure from '@/app/components/atoms/figure/Figure'
import products from '@/app/data/products.json'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
//Downshift
import { useSelect } from 'downshift'

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

const items = ['Default Sorting', 'Sort by popularity', 'Sort by latest', 'Sort by price: low to high', 'Sort by price: high to low']

const Shop = () => {
	// const [value, setValue] = useState('Default sorting')
	// const [isOpen, setIsOpen] = useState(false)
	const { isOpen, selectedItem, getToggleButtonProps, getLabelProps, getMenuProps, highlightedIndex, getItemProps } = useSelect({ items: items })

	const router = useRouter()

	// const handleMouseEnter = () => {
	// 	setIsOpen(true)
	// }

	// const handleMouseLeave = () => {
	// 	setIsOpen(false)
	// }

	// const handleItemClick = (newValue: string) => {
	// 	setValue(newValue)
	// 	setIsOpen(false)
	// }

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
					<div className={styles.dropdownContainer}>
						<button className={`${styles.button} currDropdown`} {...getToggleButtonProps()}>
							{selectedItem ?? 'Default Sorting'}
							{isOpen ? (
								<RiArrowUpSLine size={18} style={{ color: '#212121', marginLeft: '4rem', transform: 'translateY(10%)' }} />
							) : (
								<RiArrowDownSLine size={18} style={{ color: '#212121', marginLeft: '4rem', transform: 'translateY(10%)' }} />
							)}
						</button>
						<div className={styles.dropdown}>
							<ul
								{...getMenuProps()}
								// className={styles.menuItems}
								style={{
									listStyle: 'none',
									width: '100%',
									padding: '0',
									margin: '0',
								}}>
								{isOpen &&
									items.map((item, index) => (
										<li
											className={styles.menuItem}
											style={{
												backgroundColor: highlightedIndex === index ? '#232323' : null,
												color: highlightedIndex === index ? '#fff' : null,
											}}
											key={`${item}${index}`}
											{...getItemProps({
												item,
												index,
											})}>
											{item}
										</li>
									))}
							</ul>
						</div>
					</div>
					{/* <div className={styles.dropdownContainer} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
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
					</div> */}
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
