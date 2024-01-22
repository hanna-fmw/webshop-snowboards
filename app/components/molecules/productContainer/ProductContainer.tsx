import React from 'react'
import styles from './productContainer.module.css'

type ProductContainerProps = {
	children?: React.ReactNode
}

const ProductContainer = ({ children }: ProductContainerProps) => {
	return <div className={styles.productContainer}>{children}</div>
}

export default ProductContainer

{
	/* <main>
  <div class="a-container" style="background-color: hotpink; height: 300px">
    A Container
  </div>
</main> */
}
