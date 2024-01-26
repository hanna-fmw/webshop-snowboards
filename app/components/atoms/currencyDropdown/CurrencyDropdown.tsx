'use client'
import React, { useState } from 'react'
import { RiArrowDownSLine } from 'react-icons/ri'
import styles from './currencyDropdown.module.css'

function CurrencyDropdown() {
	const [value, setValue] = useState('SEK')
	const [isOpen, setIsOpen] = useState(false)

	const handleMouseEnter = () => {
		setIsOpen(true)
	}

	const handleMouseLeave = () => {
		setIsOpen(false)
	}

	const handleItemClick = (newValue: string) => {
		setValue(newValue)
		setIsOpen(false)
	}

	return (
		<div className={styles.dropdownContainer} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
			<button className={styles.button}>
				<div style={{ marginRight: '5px' }}>{value}</div>
				<div>
					<RiArrowDownSLine size={18} style={{ color: '#212121', transform: 'translateY(10%)' }} />
				</div>
			</button>
			{isOpen && (
				<div className={styles.dropdown}>
					<div className={styles.menuItems}>
						{value === 'SEK' && (
							<div className={`${styles.menuItem} ${styles.activeItem}`} onClick={() => handleItemClick('EUR')}>
								EUR
							</div>
						)}
						{value === 'EUR' && (
							<div className={`${styles.menuItem} ${styles.activeItem}`} onClick={() => handleItemClick('SEK')}>
								SEK
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	)
}

export default CurrencyDropdown
