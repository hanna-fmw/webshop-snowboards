import React from 'react'
import styles from './productGrid.module.css'

type ProductGridProps = {
	children?: React.ReactNode
}

const ProductGrid = ({ children }: ProductGridProps) => {
	return (
		<div className={styles.productGrid}>
			{children}
			{/* <div>ProductCard</div>
			<div>ProductCard</div>
            <div>ProductCard</div>
            <div>ProductCard</div> */}
		</div>
	)
}

export default ProductGrid
