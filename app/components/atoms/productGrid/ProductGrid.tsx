import React from 'react'

type ProductGridProps = {
	children?: React.ReactNode
}

const ProductGrid = ({ children }: ProductGridProps) => {
	return (
		<div style={{ display: 'flex', justifyContent: 'space-between' }}>
			{children}
			{/* <div>ProductCard</div>
			<div>ProductCard</div>
            <div>ProductCard</div>
            <div>ProductCard</div> */}
		</div>
	)
}

export default ProductGrid
