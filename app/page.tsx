'use client'
import Footer from './components/organisms/footer/Footer'
import HeroSection from './components/molecules/heroSection/HeroSection'
import ProductContainer from './components/molecules/productContainer/ProductContainer'
import styles from './page.module.css'
import footerStyles from '../app/components/organisms/footer/footer.module.css'

export default function Home() {
	return (
		<main className={styles.main}>
			<HeroSection />
			<ProductContainer />

			<Footer>
				<ul className={footerStyles.addressBlock}>
					<li>TUR SNOWBOARDS</li>
					<li>ENGELBERKSGATAN&nbsp;24</li> <li>791&nbsp;60&nbsp;FALUN</li> <li>SWEDEN</li>
				</ul>

				<ul className={footerStyles.customerSupportBlock}>
					<li>SUPPORT:</li> <li>MON-FRI 09:00-17:00</li> <li>+46&nbsp;[0]70&nbsp;736&nbsp;12&nbsp;16</li> <li>INFO@TURSNOWBOARDS.com</li>
				</ul>

				<ul className={footerStyles.socialMediaBlock}>
					<li>INSTAGRAM</li>
					<li>FACEBOOK</li>
				</ul>

				<ul className={footerStyles.linkBlock}>
					<li>[a].HOME</li> <li>[b].SHOP</li> <li>[c].ABOUT</li> <li>[d].SUPPORT</li>
				</ul>

				<ul className={footerStyles.customerInfoBlock}>
					<li>INFO:</li> <li>PRIVACY POLICY</li> <li>TERMS &amp; CONDITIONS</li> <li>DELIVERY &amp; RETURNS</li>
				</ul>

				<ul className={footerStyles.deliveryInfo}>
					<li>TUR SNOWBOARDS</li>
					<li>SHIPPING WORLD WIDE</li>
				</ul>

				<ul className={footerStyles.copyrightInfo}>
					<li>©TURSNOWBOARDS2023</li>
				</ul>
			</Footer>
		</main>
	)
}
