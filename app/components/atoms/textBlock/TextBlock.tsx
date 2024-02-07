import React from 'react'
// import PriceBlock from '../priceBlock/PriceBlock'
import styles from './textBlock.module.css'
import formatPrice from '@/app/utilities/formatPrice'

type TextBlockProps = {
	children?: React.ReactNode
	model?: string
	detail?: string
	length?: string
	profile?: string
	price?: any
	currency?: 'SEK' | 'EUR'
	formattedPrice?: string
	designer?: string
	boardType?: string
	lengthForModel?: string[]
}

const TextBlock = ({
	model,
	length,
	lengthForModel,
	detail,
	designer,
	boardType,
	profile,
	price = 10000,
	currency = 'SEK',
	children,
}: TextBlockProps) => {
	// const formattedPrice = formatPrice(price)
	return (
		<div className={styles.textBlock}>
			<div>
				<p>{model}</p>
				<p>{designer}</p>
				<p>{boardType}</p>
				<p>{detail}</p>
				<p>{length}</p>
				<p>{lengthForModel}</p>
				<p>{profile}</p>
			</div>

			<div className={styles.price}>
				<span>{price}</span> <span>{currency}</span>
			</div>
		</div>
	)
}

export default TextBlock
