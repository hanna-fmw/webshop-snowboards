'use client'
import Footer from './components/organisms/footer/Footer'
import HeroSection from './components/molecules/heroSection/HeroSection'
import ProductContainer from './components/molecules/productContainer/ProductContainer'
import styles from './page.module.css'
import Button from './components/atoms/button/Button'

export default function Home() {
	return (
		<main className={styles.main}>
			<HeroSection />
			<ProductContainer />
			<Footer />
			<div style={{ marginBottom: '20px' }}>
				<Button variant='large-dark-inverted' onClick={() => {}} icon={true} label='SORT BY:' />
			</div>
		</main>
	)
}
