'use client'
import products from './data/products.json'
import HeroSection from './components/molecules/heroSection/HeroSection'
import ProductCard from './components/molecules/productCard/ProductCard'
import styles from './page.module.css'
import ProductGrid from './components/atoms/productGrid/ProductGrid'
import Figure from './components/atoms/figure/Figure'
import TextBlock from './components/atoms/textBlock/TextBlock'
import Link from 'next/link'
import { motion } from 'framer-motion'

const motionProps = {
	initial: { opacity: 0, y: 100 },
	animate: (i: number) => ({ opacity: 1, y: 0, transition: { delay: 0.2 * i } }),
}

export default function Home() {
	return (
		<main className={styles.main}>
			<HeroSection />
			<section className={styles.container}>
				<div className={styles.containerHeader}>
					<div>TUR SNOWBOARD PRODUCTS:</div>
					<Link href='/shop'>&gt; SHOW ALL</Link>
				</div>
				<ProductGrid>
					{products.map((product, i) => {
						const featured = product.featured === true
						return (
							<motion.div key={i} variants={motionProps} initial='initial' whileInView='animate' viewport={{ once: true }} custom={i}>
								{featured ? (
									<ProductCard>
										<Figure image={`/products/${product.image}`} />
										<TextBlock
											model={product.model}
											designer={product.designer}
											length={product.length}
											detail={product.detail}
											profile={product.profile}
											price={product.price}
											currency='SEK'
										/>
									</ProductCard>
								) : null}
							</motion.div>
						)
					})}
				</ProductGrid>
			</section>
		</main>
	)
}
