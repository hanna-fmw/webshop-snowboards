'use client'
import Footer from './components/organisms/footer/Footer'
import HeroSection from './components/molecules/heroSection/HeroSection'
import ProductContainer from './components/molecules/productContainer/ProductContainer'
import styles from './page.module.css'

export default function Home() {
	return (
		<main className={styles.main}>
			<HeroSection />
			<ProductContainer />
			<Footer />
		</main>
	)
}
