import Image from 'next/image'
import React from 'react'
import styles from "./figure.module.css"

type FigureProps = {
	children?: React.ReactNode
	image?: string
}

const Figure = ({ image, children }: FigureProps) => {
	return (
		<div>
			{children}

			{image && <Image src={image} width={350} height={450} alt='placeholder' className={styles.productImg}/>}

			{/* <Image src='/products/PLUV.png' width={350} height={450} alt='placeholder' /> */}
		</div>
	)
}

export default Figure
