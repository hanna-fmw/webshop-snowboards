'use client'
import Footer from './components/organisms/footer/Footer'
import HeroSection from './components/molecules/heroSection/HeroSection'
import ProductCard from './components/molecules/productCard/ProductCard'
import styles from './page.module.css'
import footerStyles from '../app/components/organisms/footer/footer.module.css'
import ProductGrid from './components/atoms/productGrid/ProductGrid'
import Figure from './components/atoms/figure/Figure'
import TextBlock from './components/atoms/textBlock/TextBlock'

export default function Home() {
	return (
		<main className={styles.main}>
			<HeroSection />
			<section className={styles.productCardSection}>
				<div className={styles.productCardSectionHeading}>
					<div>TUR SNOWBOARD PRODUCTS:</div>
					<div>&gt; SHOW ALL</div>
				</div>

				<ProductGrid>
					<div>
						<ProductCard>
							<Figure image='/products/BUBO154.png' />
							<TextBlock
								itemName='WORK SHOP X TUR BUBO 154.4'
								itemLength='154.4 CM'
								itemDetailLine1='EXPERIMENTAL BIG VOLUME'
								itemDetailLine2='FLAT BUOYANCY PROFILE'
							/>
						</ProductCard>
					</div>
					<div>
						<ProductCard>
							<Figure image='/products/BUBO150.png' />
							<TextBlock
								itemName='WORK SHOP X TUR BUBO 154.4'
								itemLength='154.4 CM'
								itemDetailLine1='EXPERIMENTAL BIG VOLUME'
								itemDetailLine2='FLAT BUOYANCY PROFILE'
							/>
						</ProductCard>
					</div>
					<div>
						<ProductCard>
							<Figure image='/products/TUR_LABB.png' />
							<TextBlock
								itemName='WORK SHOP X TUR BUBO 154.4'
								itemLength='154.4 CM'
								itemDetailLine1='EXPERIMENTAL BIG VOLUME'
								itemDetailLine2='FLAT BUOYANCY PROFILE'
							/>
						</ProductCard>
					</div>
					<div>
						<ProductCard>
							<Figure image='/products/TUR_FALC.png' />
							<TextBlock
								itemName='WORK SHOP X TUR BUBO 154.4'
								itemLength='154.4 CM'
								itemDetailLine1='EXPERIMENTAL BIG VOLUME'
								itemDetailLine2='FLAT BUOYANCY PROFILE'
							/>
						</ProductCard>
					</div>
				</ProductGrid>
			</section>

			
		</main>
	)
}
