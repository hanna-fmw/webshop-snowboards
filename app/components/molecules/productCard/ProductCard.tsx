import React from 'react'
import styles from './productCard.module.css'

type ProductCardProps = {
	children?: React.ReactNode
}

const ProductCard = ({ children }: ProductCardProps) => {
	return <div className={styles.productCard}>{children}</div>
}

export default ProductCard
