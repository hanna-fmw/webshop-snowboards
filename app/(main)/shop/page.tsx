'use client';
import styles from './shop.module.css';
import Link from 'next/link';
import React, { useState } from 'react';
import { RiArrowDownSLine } from 'react-icons/ri';
import { RiArrowUpSLine } from 'react-icons/ri';
import TextBlock from '@/app/components/atoms/textBlock/TextBlock';
import ProductImg from '@/app/components/atoms/productImg/ProductImg';
import products from '@/app/data/products.json';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useCurrencyConversion } from '@/app/context/currencyContext';
import formatCurrency from '@/app/utilities/currencyFormatter';

import { useSelect } from 'downshift';
import FilterLinks from '@/app/components/atoms/filterLinks/FilterLinks';
import ProductCard from '@/app/components/molecules/productCard/ProductCard';
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

const items = ['Default sorting', 'Sort by price: low to high', 'Sort by price: high to low'];

const Shop = () => {
	const { isOpen, selectedItem, getToggleButtonProps, getMenuProps, highlightedIndex, getItemProps } = useSelect({ items: items });

	const { conversionRateEur, currency } = useCurrencyConversion();

	const router = useRouter();

	const sortProducts = (arr: Product[], sortView: string) => {
		return arr.sort((a, b) => {
			switch (sortView) {
				case 'Default sorting':
					return a.name.localeCompare(b.name);
				case 'Sort by price: low to high':
					return a.price - b.price;
				case 'Sort by price: high to low':
					return b.price - a.price;
				default:
					return 0;
			}
		});
	};

	return (
		<main className={styles.main}>
			<section className={styles.shopContainer}>
				<div className={styles.shopHeader}>
					<FilterLinks />

					<div className={styles.dropdownContainer}>
						<button className={`${styles.dropdownBtn}`} {...getToggleButtonProps()}>
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
												backgroundColor: highlightedIndex === index ? '#232323' : '',
												color: highlightedIndex === index ? '#fff' : '',
											}}
											key={`${item}${index}`}
											{...getItemProps({
												item,
												index,
											})}>
											<span>{item}</span>
										</li>
									))}
							</ul>
						</div>
					</div>
				</div>
				<motion.section className={styles.productGrid} variants={parentVariants} initial='initial' animate='animate'>
					{/* @ts-ignore */}
					{sortProducts(products, selectedItem).map((product, i) => {
						return (
							<motion.section key={i} variants={childrenVariants} className={styles.productCard}>
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
										<PriceBlock currency={currency} product={product} conversionRateEur={conversionRateEur} />
									</article>
								</ProductCard>
							</motion.section>
						);
					})}
				</motion.section>
			</section>
		</main>
	);
};

export default Shop;
