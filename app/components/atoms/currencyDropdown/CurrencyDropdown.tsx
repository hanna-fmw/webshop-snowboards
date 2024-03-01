'use client'
import React, { useState } from 'react'
import { RiArrowDownSLine } from 'react-icons/ri'
import { RiArrowUpSLine } from 'react-icons/ri'
import styles from './currencyDropdown.module.css'
import { useSelect } from 'downshift'

const items = ['SEK', 'EUR']

function CurrencyDropdown() {
	// const [value, setValue] = useState('SEK')
	// const [isOpen, setIsOpen] = useState(false)

	// const handleMouseEnter = () => {
	// 	setIsOpen(true)
	// }

	// const handleMouseLeave = () => {
	// 	setIsOpen(false)
	// }

	// const handleItemClick = (newValue: string) => {
	// 	setValue(newValue)
	// 	setIsOpen(false)
	// }

	// const { isOpen, selectedItem, getToggleButtonProps, getLabelProps, getMenuProps, highlightedIndex, getItemProps } = useSelect({ items: items })
	const { isOpen, selectedItem, getToggleButtonProps, getMenuProps, highlightedIndex, getItemProps } = useSelect({ items: items })

	return (
		// <div className={styles.dropdownContainer} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
		// 	<button className={`${styles.button} currDropdown`}>
		// 		<div style={{ marginRight: '5px' }}>{value}</div>
		// 		<div>
		// 			<RiArrowDownSLine size={18} style={{ color: '#212121', transform: 'translateY(10%)' }} />
		// 		</div>
		// 	</button>
		// 	{isOpen && (
		// 		<div className={styles.dropdown}>
		// 			<div className={styles.menuItems}>
		// 				{value === 'SEK' && (
		// 					<div className={`${styles.menuItem} ${styles.activeItem}`} onClick={() => handleItemClick('EUR')}>
		// 						EUR
		// 					</div>
		// 				)}
		// 				{value === 'EUR' && (
		// 					<div className={`${styles.menuItem} ${styles.activeItem}`} onClick={() => handleItemClick('SEK')}>
		// 						SEK
		// 					</div>
		// 				)}
		// 			</div>
		// 		</div>
		// 	)}
		// </div>
		<div className={styles.dropdownContainer}>
			<button className={`${styles.button} currDropdown`} {...getToggleButtonProps()}>
				{selectedItem ?? 'SEK'}
				{isOpen ? (
					<RiArrowUpSLine size={18} style={{ color: '#212121', marginLeft: '4rem', transform: 'translateY(10%)' }} />
				) : (
					<RiArrowDownSLine size={18} style={{ color: '#212121', marginLeft: '4rem', transform: 'translateY(10%)' }} />
				)}
			</button>
			<div className={styles.dropdown}>
				<ul
					{...getMenuProps()}
					// className={styles.menuItems}
					style={{
						listStyle: 'none',
						width: '100%',
						padding: '0',
						margin: '0',
					}}>
					{isOpen &&
						items.map((item, index) => (
							<li
								className={styles.menuItem}
								style={{
									backgroundColor: highlightedIndex === index ? '#232323' : null,
									color: highlightedIndex === index ? '#fff' : null,
								}}
								key={`${item}${index}`}
								{...getItemProps({
									item,
									index,
								})}>
								{item}
							</li>
						))}
				</ul>
			</div>
		</div>
	)
}

export default CurrencyDropdown
