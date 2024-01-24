import React from 'react'
import styles from './footer.module.css'

type FooterProps = {
	children?: React.ReactNode
	addressBlock?: string
	socialMediaBlock?: string
	linkBlock?: string
	customerInfoBlock?: string
	customerSupportBlock?: string
	copyrightInfo?: string
	deliveryInfo?: string
}

const Footer = ({ addressBlock, socialMediaBlock, linkBlock, customerInfoBlock, customerSupportBlock, copyrightInfo, deliveryInfo, children }: FooterProps) => {
	return (
		<footer className={styles.footer}>
			{children}
			{/* <div className={styles.addressBlock}>{addressBlock}</div>
			<div className={styles.socialMediaBlock}>{socialMediaBlock}</div>
			<div className={styles.linkBlock}>{linkBlock}</div>
			<div className={styles.customerInfoBlock}>{customerInfoBlock}</div>
			<div className={styles.customerSupportBlock}>{customerSupportBlock}</div>
			<div className={styles.copyrightInfo}>{copyrightInfo}</div>
			<div className={styles.deliveryInfo}>{deliveryInfo}</div> */}
		</footer>
	)
}

export default Footer
