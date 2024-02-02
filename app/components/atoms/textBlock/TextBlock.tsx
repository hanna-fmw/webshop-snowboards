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
}

const TextBlock = ({ model, length, detail, designer, profile, price = 10000, currency = 'SEK', children }: TextBlockProps) => {
	// const formattedPrice = formatPrice(price)
	return (
		<div className={styles.textBlock}>
			<div>
				<p>{model}</p>
				<p>{designer}</p>
				<p>{detail}</p>
				<p>{length}</p>
				<p>{profile}</p>
				{children}
				{/* <TextBlock
					model='WORK SHOP X TUR BUBO 154.4'
					length='154.4 CM'
					detail='EXPERIMENTAL BIG VOLUME'
					profile='FLAT BUOYANCY PROFILE'
				/> */}
			</div>

			{/* <PriceBlock price='6000.00' currency='SEK' /> */}
			<p className={styles.price}>
				<span>{price}</span> <span>{currency}</span>
			</p>
		</div>
	)
}

export default TextBlock
