import React from 'react'
// import PriceBlock from '../priceBlock/PriceBlock'
import styles from './textBlock.module.css'
import formatCurrency from '@/app/utilities/currencyFormatter'

type TextBlockProps = {
	children?: React.ReactNode
	name?: string
	model?: string
	detail?: string
	length?: string
	profile?: string
	price?: any
	// currency?: 'SEK' | 'EUR'
	formattedPrice?: string
	designer?: string
	boardType?: string
	lengthForModel?: string[]
}

const TextBlock = ({
	name,
	model,
	length,
	lengthForModel,
	detail,
	designer,
	boardType,
	profile,
	price = 10000,
	// currency = 'SEK',
	children,
}: TextBlockProps) => {
	return (
		<div className={styles.textBlock}>
			<div>
				<p>{name}</p>
				<p>{designer}</p>
				<p>{boardType}</p>
				<p>{detail}</p>
				<p>{length}</p>
				<p>{lengthForModel}</p>
				<p>{profile}</p>
			</div>

			<div className={styles.price}>
				<span>{formatCurrency(price)}</span>
				{/* <span>{currency}</span> */}
			</div>
		</div>
	)
}

export default TextBlock
