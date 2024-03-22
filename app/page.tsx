'use client'
import products from './data/products.json'
import HeroSection from './components/molecules/heroSection/HeroSection'
import ProductCard from './components/molecules/productCard/ProductCard'
import styles from './page.module.css'
// import ProductGrid from './components/atoms/productGrid/ProductGrid'
import Figure from './components/atoms/figure/Figure'
import TextBlock from './components/atoms/textBlock/TextBlock'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import formatCurrency from './utilities/currencyFormatter'
import { useCurrencyConversion } from './context/currencyContext'

const variants = {
	initial: { opacity: 0, y: 100 },
	animate: (i: number) => ({ opacity: 1, y: 0, transition: { delay: 0.2 * i } }),
}

export default function Home() {
	const { currency, conversionRateEur } = useCurrencyConversion()
	const router = useRouter()
	return (
		<main>
			<HeroSection />
			<section className={styles.container}>
				<div className={styles.containerHeader}>
					<div>TUR SNOWBOARD PRODUCTS:</div>
					<Link href='/shop'>&gt; SHOW ALL</Link>
				</div>
				<section className={styles.productGrid}>
					{products.map((product, i) => {
						const featured = product.featured === true
						return (
							<motion.div key={i} variants={variants} initial='initial' whileInView='animate' viewport={{ once: true }} custom={i}>
								{featured ? (
									<ProductCard>
										<Figure image={`/products/${product.image}`} onClick={() => router.push(`/shop/${product.model}`)} />
										<div style={{ display: 'flex' }}>
											<TextBlock
												model={product.model}
												designer={product.designer}
												boardType={product.boardType}
												length={product.length}
												detail={product.detail}
												profile={product.profile}
												// price={product.price}
												// currency='SEK'
											/>
											<div className={styles.price}>
												<span>{formatCurrency(currency === 'SEK' ? product.price : product.price * conversionRateEur!, currency)}</span>
											</div>
										</div>
									</ProductCard>
								) : null}
							</motion.div>
						)
					})}
				</section>
			</section>
		</main>
	)
}
