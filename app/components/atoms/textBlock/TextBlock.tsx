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
	price?: number
	// currency?: 'SEK' | 'EUR'
	formattedPrice?: number
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
				<div>{name}</div>
				<div>{designer}</div>
				<div>{boardType}</div>
				<div>{detail}</div>
				<div>{length}</div>
				<div>{lengthForModel}</div>
				<div>{profile}</div>
			</div>

			<div className={styles.price}>
				<span>{formatCurrency(price)}</span>
				{/* <span>{currency}</span> */}
			</div>
		</div>
	)
}

export default TextBlock
