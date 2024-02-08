import localFont from 'next/font/local'
import Link from 'next/link'

import type { Metadata } from 'next'
import { Inter, Roboto_Mono, Sometype_Mono, Red_Hat_Mono, Fira_Code } from 'next/font/google'
import './globals.css'
import Navbar from './components/molecules/navbar/Navbar'
import Footer from './components/organisms/footer/Footer'
import styles from './components/organisms/footer/footer.module.css'
import { ModalProvider } from './context/ModalContext'

const gtAmericaMonoLight = localFont({
	// src: '../fonts/FaroVariableWeb.woff2',
	src: '../public/fonts/GT-America-Mono-Light.otf',

	variable: '--font-gtAmericaMonoLight',
})

const gtAmericaMonoLightItalic = localFont({
	// src: '../fonts/FaroVariableWeb.woff2',
	src: '../public/fonts/GT-America-Mono-Light-Italic.otf',

	variable: '--font-gtAmericaMonoLightItalic',
})

const inter = Inter({ subsets: ['latin'] })
const robotoMono = Roboto_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			{/* <Head>
				<link rel='stylesheet' href='https://use.typekit.net/wce3qpd.css' />
			</Head> */}
			{/* <body className={robotoMono.className}> */}
			<body className={`${gtAmericaMonoLight.variable} ${gtAmericaMonoLightItalic.variable}`} style={{ position: 'relative' }}>
				<ModalProvider>
					<Navbar />

					{children}

					<Footer>
						<ul className={styles.addressBlock}>
							<li>TUR SNOWBOARDS</li>
							<li>ENGELBERKSGATAN&nbsp;24</li> <li>791&nbsp;60&nbsp;FALUN</li> <li>SWEDEN</li>
						</ul>

						<ul className={styles.customerSupportBlock}>
							<li>SUPPORT:</li> <li>MON-FRI 09:00-17:00</li> <li>+46&nbsp;[0]70&nbsp;736&nbsp;12&nbsp;16</li> <li>INFO@TURSNOWBOARDS.com</li>
						</ul>

						<ul className={styles.socialMediaBlock}>
							<li>
								<Link href='https://instagram.com/tursnowboards' className={styles.socialMediaBlockLink}>
									INSTAGRAM
								</Link>
							</li>
							<li>
								<Link href='https://www.facebook.com/tursnowboards' className={styles.socialMediaBlockLink}>
									FACEBOOK
								</Link>
							</li>
						</ul>

						<ul className={styles.linkBlock}>
							<li>[a].HOME</li> <li>[b].SHOP</li> <li>[c].ABOUT</li> <li>[d].SUPPORT</li>
						</ul>

						<ul className={styles.customerInfoBlock}>
							<li>INFO:</li> <li>PRIVACY POLICY</li> <li>TERMS &amp; CONDITIONS</li> <li>DELIVERY &amp; RETURNS</li>
						</ul>

						<ul className={styles.deliveryInfo}>
							<li>TUR SNOWBOARDS</li>
							<li>SHIPPING WORLD WIDE</li>
						</ul>

						<ul className={styles.copyrightInfo}>
							<li>©TURSNOWBOARDS2023</li>
						</ul>
					</Footer>
				</ModalProvider>
			</body>
		</html>
	)
}
