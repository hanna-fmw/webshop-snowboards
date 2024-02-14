import localFont from 'next/font/local'
import Link from 'next/link'

import type { Metadata } from 'next'
import { Inter, Roboto_Mono, Sometype_Mono, Red_Hat_Mono, Fira_Code } from 'next/font/google'
import './globals.css'
import Navbar from './components/molecules/navbar/Navbar'
import Footer from './components/organisms/footer/Footer'
import styles from './components/organisms/footer/footer.module.css'
import { ModalProvider } from './context/modalContext'
import { CartProvider } from './context/cartContext'

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
	title: 'TUR Snowboards',
	description: 'TUR Snowboards from Sweden.',
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
					<CartProvider>
						<Navbar />
						{children}
						<Footer />
					</CartProvider>
				</ModalProvider>
			</body>
		</html>
	)
}
