import React from 'react'
import styles from './priceBlock.module.css'
import formatPrice from '@/app/utilities/formatPrice'

type PriceBlockProps = {
	price?: any
	currency?: 'SEK' | 'EUR'
	formattedPrice?: string
}

const PriceBlock = ({ price = 10000, currency = 'SEK' }: PriceBlockProps) => {
	// const formattedPrice = formatPrice(price)
	return (
		<p className={styles.price}>
			<span>{price}</span> <span>{currency}</span>
		</p>
	)
}

export default PriceBlock
