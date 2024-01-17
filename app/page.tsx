import Footer from './components/Footer'
import HeroSection from './components/HeroSection'
import ProductContainer from './components/ProductContainer'
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
