import React from 'react'
import PriceBlock from '../priceBlock/PriceBlock'

type TextBlockProps = {
	children?: React.ReactNode
	itemName?: string
	itemDetail?: string
	itemLength?: string
}

const TextBlock = ({ itemName, itemLength, itemDetail, children }: TextBlockProps) => {
	return (
		<div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
			<div>
				<p>{itemName}</p>
				<p>{itemDetail}</p>
				<p>{itemLength}</p>
				{children}
				{/* <p>PLUV</p>
				<p>DIRECTIONAL FREESTYLE</p>
				<p>145 CM/149 cm/155 CM/159 CM/164 CM</p> */}
			</div>
			<PriceBlock price={6000} currency='EUR' />
		</div>
	)
}

export default TextBlock
