import Link from 'next/link'
import Navbar from '@/app/components/molecules/navbar/Navbar'
import Footer from '@/app/components/organisms/footer/Footer'
import styles from '@/app/components/organisms/footer/footer.module.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Navbar />
			{children}
			<Footer />
		</>
	)
}
