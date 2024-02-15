import React from 'react'
import styles from './button.module.css'
import Image from 'next/image'
import downArrow from '../../../../public/icons/down_arrow.png'

export type ButtonProps = {
	children?: React.ReactNode
	variant?: 'default' | 'default-dark' | 'large-dark' | 'large-dark-no-hover' | 'large-green' | 'large-light' | 'btn-hero'
	label?: string
	icon?: boolean
	onClick: () => void
}

const Button = ({ variant = 'default', label, icon, onClick, children }: ButtonProps) => {
	return (
		<button className={`${styles[variant]} ${styles.btn}`} style={{ gap: 10 }} onClick={onClick}>
			{children}
			{label}
			{icon && <Image src={downArrow} alt='Arrow icon' className={styles.arrowIcon} width={30} height={30} />}
		</button>
	)
}

export default Button
