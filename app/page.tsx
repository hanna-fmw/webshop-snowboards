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
				<div className={styles.productCardSectionHeader}>
					<div>TUR SNOWBOARD PRODUCTS:</div>
					<Link href='/shop'>&gt; SHOW ALL</Link>
				</div>

				<ProductGrid>
					{/* {products.map((product, i) => {
						return (
							<ProductCard key={i}>
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
						)
					})} */}

					<div>
						<ProductCard>
							<Figure image='/products/bubo154/BUBO154.png' />

							<TextBlock
								model={products[0].model}
								designer={products[0].designer}
								length={products[0].length}
								detail={products[0].detail}
								profile={products[0].profile}
								price={products[0].price}
							/>
						</ProductCard>
					</div>
					<div>
						<ProductCard>
							<Figure image='/products/bubo150/BUBO150.png' />
							<TextBlock
								model={products[1].model}
								designer={products[1].designer}
								length={products[1].length}
								detail={products[1].detail}
								profile={products[1].profile}
								price={products[1].price}
							/>
						</ProductCard>
					</div>
					<div>
						<ProductCard>
							<Figure image='/products/labb/LABB.png' />
							<TextBlock
								model={products[2].model}
								designer={products[2].designer}
								length={products[2].length}
								detail={products[2].detail}
								profile={products[2].profile}
								price={products[2].price}
							/>
						</ProductCard>
					</div>
					<div>
						<ProductCard>
							<Figure image='/products/falc/FALC.png' />
							<TextBlock
								model={products[3].model}
								designer={products[3].designer}
								length={products[3].length}
								detail={products[3].detail}
								profile={products[3].profile}
								price={products[3].price}
							/>
						</ProductCard>
					</div>
				</ProductGrid>
			</section>
		</main>
	)
}
