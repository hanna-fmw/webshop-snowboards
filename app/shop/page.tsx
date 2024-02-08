'use client'
import styles from './shop.module.css'
import Link from 'next/link'
import React, { useState } from 'react'
import { RiArrowDownSLine } from 'react-icons/ri'
import ProductGrid from '../components/atoms/productGrid/ProductGrid'
import ProductCard from '../components/molecules/productCard/ProductCard'
import TextBlock from '../components/atoms/textBlock/TextBlock'
import Figure from '../components/atoms/figure/Figure'
import products from '../data/products.json'
import { useRouter } from 'next/navigation'

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
							<Link href='#' className={styles.link}>
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
				<section className={styles.productCardSection}>
					{products.map((product, i) => {
						return (
							<ProductCard key={i}>
								<Figure image={`/products/${product.image}`} onClick={() => router.push(`/shop/${product.model}`)} />
								<TextBlock
									name={product.name}
									designer={product.designer}
									length={product.length}
									detail={product.detail}
									profile={product.profile}
									price={product.price}
									currency='SEK'
								/>
							</ProductCard>
						)
					})}
				</section>
			</section>
		</main>
	)
}

export default Shop
