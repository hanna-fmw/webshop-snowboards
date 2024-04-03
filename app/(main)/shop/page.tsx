'use client';
import styles from './shop.module.css';
import Link from 'next/link';
import React, { useState } from 'react';
import { RiArrowDownSLine } from 'react-icons/ri';
import { RiArrowUpSLine } from 'react-icons/ri';
import TextBlock from '@/app/components/atoms/textBlock/TextBlock';
import Figure from '@/app/components/atoms/figure/Figure';
import products from '@/app/data/products.json';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useCurrencyConversion } from '@/app/context/currencyContext';
import formatCurrency from '@/app/utilities/currencyFormatter';

//Downshift
import { useSelect } from 'downshift';

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

//popularity etc. to be implemented when available as option
// const items = ['Default sorting', 'Sort by popularity', 'Sort by latest', 'Sort by price: low to high', 'Sort by price: high to low']
const items = ['Default sorting', 'Sort by price: low to high', 'Sort by price: high to low'];
//Angående downshift - alla get-funktioner nedan som vi hämtar från useSelect (ie från downshift) ger oss alla
//lägen och ARIA osv för respektive element, t.ex. för ToggleButton, för Menu, för Item osv., dvs. för
//varje element som ingår i vår/en dropdown. Vi ska aldrig ens behöva lägga till en onClick eller liknadne,
//allt är inbyggt. Själva selectedItem (det valda alternativet på vår dropdown) kan vi lägga till som parameter
//i vår sortProducts-funktion som vi mappar över så här:
//sortProducts(products, selectedItem).map((product, i) => { osv.
const Shop = () => {
	const { isOpen, selectedItem, getToggleButtonProps, getMenuProps, highlightedIndex, getItemProps } = useSelect({ items: items });

	//Vi definierar currency i currencyContext.tsx och togglar den
	//till EUR eller SEK i CurrencyDropdown.tsx. Och här nedan kan vi sedan
	//göra en ternary som kollar vilket som är det aktuella statet för currency, och
	//om det är EUR så använder vi conversionRateEur (dvs. exchange rate från API:t som vi
	//fetchar i currencyContext) för att multiplicera priset med denna valutakurs
	const { conversionRateEur, currency } = useCurrencyConversion();

	const router = useRouter();

	// const [sortView, setSortView] = useState('Default sorting')
	// //DROPDOWN MENU/LIST OPTIONS (samma som ovan fast med switch)
	// //Function called when user clicks on an option on the dropdown menu. Sets
	// //the state (sort view) to the corresponding clicked sorting option
	// const selectOption = (option) => {
	// 	console.log(sortView)
	// 	switch (option) {
	// 		case 'Default sorting':
	// 			setSortView('Default sorting')
	// 			break
	// 		case 'Sort by price: low to high':
	// 			setSortView('Sort by price: low to high')
	// 			break
	// 		case 'Sort by price: high to low':
	// 			setSortView('Sort by price: high to low')
	// 			break
	// 		default:
	// 			break
	// 	}
	// }

	const sortProducts = (arr: Product[], sortView: string) => {
		return arr.sort((a, b) => {
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

	// Log sortView when it changes - to check if the sort view is updated correctly
	// useEffect(() => {
	// 	console.log('current sort view', sortView)
	// }, [sortView])

	return (
		<main className={styles.main}>
			<section className={styles.shopContainer}>
				<div className={styles.shopHeader}>
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
				<motion.section className={styles.productGrid} variants={parentVariants} initial='initial' animate='animate'>
					{/* Here we need to sort the products array based on the selected sorting view option, ie based
					//on the current sort state (sortState-setSortState), which is set when the user clicks on an
					option on the dropdown menu. So sortProducts(products) will apply the logic in the sortProducts function, which
					takes in an array, in this case products */}
					{sortProducts(products, selectedItem).map((product, i) => {
						return (
							<motion.section key={i} variants={childrenVariants} className={styles.productCard}>
								<Figure image={`/products/${product.image}`} onClick={() => router.push(`/shop/${product.model}`)} />
								<div style={{ display: 'flex' }}>
									<TextBlock
										name={product.name}
										designer={product.designer}
										boardType={product.boardType}
										length={product.length}
										detail={product.detail}
										profile={product.profile}
										// price={product.price}
										// Adding the ! in conversionRateEur asserts to TypeScript that conversionRateEur is not null or undefined.
										// price={currency === 'SEK' ? product.price : product.price * conversionRateEur!}
									/>
									<div className={styles.price}>
										<span>{formatCurrency(currency === 'SEK' ? product.price : product.price * conversionRateEur!, currency)}</span>
									</div>
								</div>
							</motion.section>
						);
					})}
				</motion.section>
			</section>
		</main>
	);
};

export default Shop;
