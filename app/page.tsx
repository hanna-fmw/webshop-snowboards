'use client'
import products from './data/products.json'
import HeroSection from './components/molecules/heroSection/HeroSection'
import ProductCard from './components/molecules/productCard/ProductCard'
import styles from './page.module.css'
import ProductGrid from './components/atoms/productGrid/ProductGrid'
import Figure from './components/atoms/figure/Figure'
import TextBlock from './components/atoms/textBlock/TextBlock'
import Link from 'next/link'

export default function Home() {
	return (
		<main className={styles.main}>
			<HeroSection />
			<section className={styles.productCardSection}>
				<div className={styles.productCardSectionHeading}>
					<div>TUR SNOWBOARD PRODUCTS:</div>
					<Link href='/shop'>&gt; SHOW ALL</Link>
				</div>

				<ProductGrid>
					{products.map((product, i) => {
						return (
							<ProductCard key={i}>
								<Figure image={`/products/${product.image}`} />
								<TextBlock
									model={product.model}
									length={product.length}
									detail={product.detail}
									profile={product.profile}
									price={product.price}
									currency='SEK'
								/>
							</ProductCard>
						)
					})}

					{/* <div>
						<ProductCard>
							<Figure image='/products/BUBO154.png' />
							<TextBlock model='WORK SHOP X TUR BUBO 154.4' length='154.4 CM' detail='EXPERIMENTAL BIG VOLUME' profile='FLAT BUOYANCY PROFILE' />
						</ProductCard>
					</div>
					<div>
						<ProductCard>
							<Figure image='/products/BUBO150.png' />
							<TextBlock model='WORK SHOP X TUR BUBO 154.4' length='154.4 CM' detail='EXPERIMENTAL BIG VOLUME' profile='FLAT BUOYANCY PROFILE' />
						</ProductCard>
					</div>
					<div>
						<ProductCard>
							<Figure image='/products/LABB.png' />
							<TextBlock model='WORK SHOP X TUR BUBO 154.4' length='154.4 CM' detail='EXPERIMENTAL BIG VOLUME' profile='FLAT BUOYANCY PROFILE' />
						</ProductCard>
					</div>
					<div>
						<ProductCard>
							<Figure image='/products/FALC.png' />
							<TextBlock model='WORK SHOP X TUR BUBO 154.4' length='154.4 CM' detail='EXPERIMENTAL BIG VOLUME' profile='FLAT BUOYANCY PROFILE' />
						</ProductCard>
					</div> */}
				</ProductGrid>
			</section>
		</main>
	)
}
