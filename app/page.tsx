'use client'
import products from './data/products.json'
import HeroSection from './components/molecules/heroSection/HeroSection'
import ProductCard from './components/molecules/productCard/ProductCard'
import styles from './page.module.css'
import TextBlock from './components/atoms/textBlock/TextBlock'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useCurrencyConversion } from './context/currencyContext'
import ProductImg from './components/atoms/productImg/ProductImg'
import PriceBlock from './components/molecules/priceBlock/PriceBlock'

// Animation variants for the parent container
// Used with Framer Motion to stagger the animation of child elements
const parentVariants = {
	initial: { opacity: 1 },
	animate: {
		transition: {
			staggerChildren: 0.2, // Delay between each child animation
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

export default function Home() {
	const { currency, conversionRateEur } = useCurrencyConversion()
	const router = useRouter()
	return (
		<>
			<HeroSection />
			<section className={styles.container}>
				<div className={styles.containerHeader}>
					<div>TUR SNOWBOARD PRODUCTS:</div>
					<Link href='/shop'>&gt; SHOW ALL</Link>
				</div>
				<motion.section
					className={styles.productGrid}
					variants={parentVariants}
					initial='initial'
					animate='animate'>
					{products.map((product, i) => {
						const featured = product.featured === true
						return (
							<motion.div key={i} variants={childrenVariants}>
								{featured ? (
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
								) : null}
							</motion.div>
						)
					})}
				</motion.section>
			</section>
		</>
	)
}
