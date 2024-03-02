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
import CurrencyDropdown from '@/app/components/atoms/currencyDropdown/CurrencyDropdown'

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

//popularity etc. to be implemented when available as option
// const items = ['Default sorting', 'Sort by popularity', 'Sort by latest', 'Sort by price: low to high', 'Sort by price: high to low']
const items = ['Default sorting', 'Sort by price: low to high', 'Sort by price: high to low']

const Shop = () => {
	const { isOpen, selectedItem, getToggleButtonProps, getMenuProps, highlightedIndex, getItemProps } = useSelect({ items: items })

	const router = useRouter()

	const [sortView, setSortView] = useState('Default sorting')
	//DROPDOWN MENU/LIST OPTIONS (samma som ovan fast med switch)
	//Function called when user clicks on an option on the dropdown menu. Sets
	//the state (sort view) to the corresponding clicked sorting option
	const selectOption = (option) => {
		switch (option) {
			case 'Default sorting':
				setSortView('Default sorting')
				break
			case 'Sort by price: low to high':
				setSortView('Sort by price: low to high')
				break
			case 'Sort by price: high to low':
				setSortView('Sort by price: high to low')
				break
			default:
				setSortView('Default sorting')
		}
	}

	const sortProducts = (arr) => {
		return arr.sort((a, b) => {
			switch (sortView) {
				case 'Default sorting':
					return a.name.localeCompare(b.name)
				// case 'popularity':
				// 	return b.stars - a.stars
				case 'Sort by price: low to high':
					return a.price - b.price
				case 'Sort by price: high to low':
					return b.price - a.price
				default:
					return 0
			}
		})
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
							{selectedItem ?? 'Default sorting'}
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
								{/* Map over dropdown options */}
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
											{/* Call selectOption function and pass in item, which is the string/name of the option*/}
											<span onClick={() => selectOption(item)}>{item}</span>
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
					{/* Here we need to sort the products array based on the selected sorting view option, ie based
					//on the current sort state (sortState-setSortState), which is set when the user clicks on an
					option on the dropdown menu. So sortProducts(products) will apply the logic in the sortProducts function, which
					takes in an array, in this case products */}
					{sortProducts(products).map((product, i) => {
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
