import React from 'react'
import PriceBlock from '../priceBlock/PriceBlock'
import styles from './textBlock.module.css'

type TextBlockProps = {
	children?: React.ReactNode
	itemName?: string
	itemDetailLine1?: string
	itemLength?: string
	itemDetailLine2?: string
}

const TextBlock = ({ itemName, itemLength, itemDetailLine1, itemDetailLine2, children }: TextBlockProps) => {
	return (
		<div className={styles.textBlock}>
			<div>
				<p>{itemName}</p>
				<p>{itemDetailLine1}</p>
				<p>{itemLength}</p>
				<p>{itemDetailLine2}</p>
				{children}
				{/* <TextBlock
					itemName='WORK SHOP X TUR BUBO 154.4'
					itemLength='154.4 CM'
					itemDetailLine1='EXPERIMENTAL BIG VOLUME'
					itemDetailLine2='FLAT BUOYANCY PROFILE'
				/> */}
			</div>
			<PriceBlock price='6000.00' currency='SEK' />
		</div>
	)
}

export default TextBlock
