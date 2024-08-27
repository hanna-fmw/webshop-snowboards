'use client'
import styles from './shop.module.css'
import { RiArrowDownSLine } from 'react-icons/ri'
import { RiArrowUpSLine } from 'react-icons/ri'
import TextBlock from '@/app/components/atoms/textBlock/TextBlock'
import ProductImg from '@/app/components/atoms/productImg/ProductImg'
import productsData from '@/app/data/products.json'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useCurrencyConversion } from '@/app/context/currencyContext'
import { useSelect } from 'downshift'
import FilterLinks from '@/app/components/atoms/filterLinks/FilterLinks'
import ProductCard from '@/app/components/molecules/productCard/ProductCard'
import PriceBlock from '@/app/components/molecules/priceBlock/PriceBlock'

// Animation variants for the parent container
// Used with Framer Motion to stagger the animation of child elements
const parentVariants = {
	initial: { opacity: 1 },
	animate: {
		transition: {
			staggerChildren: 0.2,
		},
	},
}

// Animation variants for child elements
// Defines the initial and animate states for opacity transition
const childrenVariants = {
	initial: { opacity: 0 },
	animate: {
		opacity: 1,
		transition: {
			duration: 0.5,
			ease: 'easeIn',
		},
	},
}

// Defines the structure of a product object
// Contains all details needed for product display and management
type Product = {
	id: number
	productCategory: string[]
	image: string
	model: string
	name: string
	boardType: string
	designer: string
	detail: string
	profile: string
	length: string
	price: string
	lengthOptions: string[]
	descriptionHeading: string
	descriptionText: string
	districtHeading: string
	district: string
	propertiesHeading: string
	properties: {
		length: string
		features: string[]
	}
	narrativeHeading: string
	narrative: string
	preCutSkins: boolean
	technicalSpecificationHeading: string
	additionalInfo: string[]
	technicalSpecification: string
	chart: string
	thumbnails: string[]
	relatedProductsHeading: string
	relatedProducts: string[]
	featured: boolean
}

// Modified Product type for use in PriceBlock component
// Changes 'price' from string to number for easier calculations
type ProductForPriceBlock = Omit<Product, 'price'> & {
	price: number
}

// Sorts an array of products based on the selected sorting option
// Options include default sorting, price low to high, and price high to low
const sortProducts = (arr: Product[], sortView: string) => {
	return arr.sort((a, b) => {
		switch (sortView) {
			case 'Default sorting':
				return a.name.localeCompare(b.name)
			case 'Sort by price: low to high':
				return Number(a.price) - Number(b.price)
			case 'Sort by price: high to low':
				return Number(b.price) - Number(a.price)
			default:
				return 0
		}
	})
}

const items = ['Default sorting', 'Sort by price: low to high', 'Sort by price: high to low']

const products = productsData as Product[]

const Shop = () => {
	const { isOpen, selectedItem, getToggleButtonProps, getMenuProps, highlightedIndex, getItemProps } = useSelect({ items: items })

	const { conversionRateEur, currency } = useCurrencyConversion()

	const router = useRouter()

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
					{sortProducts(products, selectedItem as string).map((product, i) => {
						// Convert price to number before passing to PriceBlock
						const productForPriceBlock: ProductForPriceBlock = {
							...product,
							price: Number(product.price),
						}
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

										<PriceBlock currency={currency} product={productForPriceBlock} conversionRateEur={conversionRateEur} />
									</article>
								</ProductCard>
							</motion.section>
						)
					})}
				</motion.section>
			</section>
		</main>
	)
}

export default Shop
