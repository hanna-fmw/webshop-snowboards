'use client'
import styles from './crafting.module.css'
import { RiArrowDownSLine } from 'react-icons/ri'
import { RiArrowUpSLine } from 'react-icons/ri'
import ProductCard from '@/app/components/molecules/productCard/ProductCard'
import TextBlock from '@/app/components/atoms/textBlock/TextBlock'
import ProductImg from '@/app/components/atoms/productImg/ProductImg'
import products from '@/app/data/products.json'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useCurrencyConversion } from '@/app/context/currencyContext'
import { useSelect } from 'downshift'
import FilterLinks from '@/app/components/atoms/filterLinks/FilterLinks'
import PriceBlock from '@/app/components/molecules/priceBlock/PriceBlock'

const parentVariants = {
	initial: { opacity: 1 },
	animate: {
		transition: {
			staggerChildren: 0.2,
		},
	},
}

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

type Product = {
	id: number
	productCategory: string[]
	image: string
	model: string
	name: string
	designer: string
	detail: string
	profile: string
	length: string
	price: string
	lengthOptions: string[]
	descriptionHeading: string
	boardType?: string
}

type Products = Product[]

const items = ['Default sorting', 'Sort by price: low to high', 'Sort by price: high to low']

const Crafting = () => {
	const {
		isOpen,
		selectedItem,
		getToggleButtonProps,
		getMenuProps,
		highlightedIndex,
		getItemProps,
	} = useSelect({ items: items })

	const { currency, conversionRateEur } = useCurrencyConversion()

	const router = useRouter()

	const sortProducts = (arr: Products, sortView: string | null) => {
		return [...arr].sort((a: Product, b: Product) => {
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

	const category = 'crafting'

	return (
		<main className={styles.main}>
			<section className={styles.craftingContainer}>
				<div className={styles.craftingHeader}>
					<FilterLinks />

					<div className={styles.dropdownContainer}>
						<button className={`${styles.dropdownBtn}`} {...getToggleButtonProps()}>
							{selectedItem ?? 'Default sorting'}
							{isOpen ? (
								<RiArrowUpSLine
									size={18}
									style={{ color: '#212121', marginLeft: '4rem', transform: 'translateY(10%)' }}
								/>
							) : (
								<RiArrowDownSLine
									size={18}
									style={{ color: '#212121', marginLeft: '4rem', transform: 'translateY(10%)' }}
								/>
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

				<motion.section
					className={styles.productGrid}
					variants={parentVariants}
					initial='initial'
					animate='animate'>
					{sortProducts(products as Products, selectedItem).map((product, i) => {
						const isCategory = product?.productCategory.includes(category)

						return (
							<>
								{isCategory ? (
									<motion.div key={i} variants={childrenVariants}>
										<ProductCard>
											<ProductImg
												image={`/products/${product.image}`}
												onClick={() => router.push(`/shop/${product.model}`)}
											/>
											<article className={styles.productInfo}>
												<TextBlock
													model={product.model}
													designer={product.designer}
													boardType={product.boardType}
													length={product.length}
													detail={product.detail}
													profile={product.profile}
												/>
												<PriceBlock
													currency={currency}
													product={{
														...product,
														boardType: product.boardType ?? '',
														price: Number(product.price),
													}}
													conversionRateEur={conversionRateEur}
												/>
											</article>
										</ProductCard>
									</motion.div>
								) : null}
							</>
						)
					})}
				</motion.section>
				<div>
					{products.filter((cat) => cat.productCategory.includes(category.toLowerCase())).length ===
						0 && <div>No items available</div>}
				</div>
			</section>
		</main>
	)
}

export default Crafting
