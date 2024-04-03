'use client';
import styles from './crafting.module.css';
import Link from 'next/link';
import React, { useState } from 'react';
import { RiArrowDownSLine } from 'react-icons/ri';
import { RiArrowUpSLine } from 'react-icons/ri';
import ProductCard from '@/app/components/molecules/productCard/ProductCard';
import TextBlock from '@/app/components/atoms/textBlock/TextBlock';
import ProductImg from '@/app/components/atoms/productImg/ProductImg';
import products from '@/app/data/products.json';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import formatCurrency from '@/app/utilities/currencyFormatter';
import { useCurrencyConversion } from '@/app/context/currencyContext';

import { useSelect } from 'downshift';
import FilterLinks from '@/app/components/atoms/filterLinks/FilterLinks';
import PriceBlock from '@/app/components/molecules/priceBlock/PriceBlock';

const parentVariants = {
	initial: { opacity: 1 },
	animate: {
		transition: {
			staggerChildren: 0.2,
		},
	},
};

const childrenVariants = {
	initial: { opacity: 0 },
	animate: {
		opacity: 1,
		transition: {
			duration: 0.5,
			ease: 'easeIn',
		},
	},
};

const items = ['Default sorting', 'Sort by price: low to high', 'Sort by price: high to low'];

type Product = {
	name: string;
	designer: string;
	boardType: string;
	length: string;
	detail: string;
	profile: string;
	price: number;
	productCategory: string[];
	image: string;
	model: string;
};

const Crafting = () => {
	const { isOpen, selectedItem, getToggleButtonProps, getMenuProps, highlightedIndex, getItemProps } = useSelect({ items: items });

	const { currency, conversionRateEur } = useCurrencyConversion();

	const router = useRouter();

	const sortProducts = (arr: Product[], sortView: string) => {
		return arr.sort((a: Product, b: Product) => {
			switch (sortView) {
				case 'Default sorting':
					return a.name.localeCompare(b.name);
				// case 'popularity':
				// 	return b.stars - a.stars
				case 'Sort by price: low to high':
					return a.price - b.price;
				case 'Sort by price: high to low':
					return b.price - a.price;
				default:
					//Fick TS-fel när jag bara hade return break. Förklaring: Provide a default return value in case
					//sortView doesn't match any case - With this change, the function will always return a number
					return 0;
			}
		});
	};

	const category = 'crafting';

	return (
		<main className={styles.main}>
			<section className={styles.craftingContainer}>
				<div className={styles.craftingHeader}>
					<FilterLinks />
					{/* <ul className={styles.links}>
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
					</ul> */}

					<div className={styles.dropdownContainer}>
						<button className={`${styles.button} currDropdown`} {...getToggleButtonProps()}>
							{selectedItem ?? 'Default sorting'}
							{/* selectedMenuIsOpen is the renamed destructured isOpen property from useSelect (ie downshift) */}
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
												backgroundColor: highlightedIndex === index ? '#232323' : '',
												color: highlightedIndex === index ? '#fff' : '',
											}}
											key={`${item}${index}`}
											{...getItemProps({
												item,
												index,
											})}>
											{/* Här hade jag först skrivit en onClick, men med downshift så behövs inte det, allt är inbyggt */}
											{/* Call selectOption function and pass in item, which is the string/name of the option*/}
											{/* <span onClick={() => selectOption(item)}>{item}</span> */}
											<span>{item}</span>
										</li>
									))}
							</ul>
						</div>
					</div>
				</div>

				<motion.section className={styles.productCardSection} variants={parentVariants} initial='initial' animate='animate'>
					{sortProducts(products, selectedItem).map((product, i) => {
						// console.log('these are products', products);
						const isCategory = product?.productCategory.includes(category);

						return (
							<>
								{isCategory ? (
									<motion.div key={i} variants={childrenVariants}>
										<ProductCard>
											<ProductImg image={`/products/${product.image}`} onClick={() => router.push(`/shop/${product.model}`)} />
											<article className={styles.productInfo}>
												<TextBlock
													model={product.model}
													designer={product.designer}
													boardType={product.boardType}
													length={product.length}
													detail={product.detail}
													profile={product.profile}
												/>

												<PriceBlock formatCurrency={formatCurrency} currency={currency} product={product} conversionRateEur={conversionRateEur} />
											</article>
										</ProductCard>
									</motion.div>
								) : null}
							</>
						);
					})}
				</motion.section>
				<div>{products.filter((cat) => cat.productCategory.includes(category.toLowerCase())).length === 0 && <div>No items available</div>}</div>
			</section>
		</main>
	);
};

export default Crafting;
