'use client';
import products from './data/products.json';
import HeroSection from './components/molecules/heroSection/HeroSection';
import ProductCard from './components/molecules/productCard/ProductCard';
import styles from './page.module.css';
// import ProductGrid from './components/atoms/productGrid/ProductGrid'
import Figure from './components/atoms/figure/Figure';
import TextBlock from './components/atoms/textBlock/TextBlock';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import formatCurrency from './utilities/currencyFormatter';
import { useCurrencyConversion } from './context/currencyContext';

const variants = {
	initial: { opacity: 0, y: 100 },
	animate: (i: number) => ({ opacity: 1, y: 0, transition: { delay: 0.1 * i, duration: 0.4 } }),
};

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

//<motion.section className={styles.productGrid} variants={parentVariants} initial='initial' animate='animate'>
//<motion.section key={i} variants={childrenVariants} className={styles.productCard}>

export default function Home() {
	const { currency, conversionRateEur } = useCurrencyConversion();
	const router = useRouter();
	return (
		<main>
			<HeroSection />
			<section className={styles.container}>
				<div className={styles.containerHeader}>
					<div>TUR SNOWBOARD PRODUCTS:</div>
					<Link href='/shop'>&gt; SHOW ALL</Link>
				</div>
				<motion.section className={styles.productGrid} variants={parentVariants} initial='initial' animate='animate'>
					{products.map((product, i) => {
						const featured = product.featured === true;
						return (
							// <motion.div key={i} variants={variants} initial='initial' whileInView='animate' viewport={{ once: true }} custom={i}>
							<motion.div key={i} variants={childrenVariants}>
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
												{/* By adding (conversionRateEur || 0), you're providing a default value of 0 in case conversionRateEur is undefined. This ensures that the multiplication operation always has a valid operand. */}
												{/* You can also explicitly cast product.price to a number to ensure TypeScript understands that it's safe to perform arithmetic operations on it. */}
												<span>{formatCurrency(currency === 'SEK' ? product.price : product.price * conversionRateEur, currency)}</span>
											</div>
										</div>
									</ProductCard>
								) : null}
							</motion.div>
						);
					})}
				</motion.section>
			</section>
		</main>
	);
}
