'use client'
import React, { useState } from 'react'
import { RiArrowDownSLine } from 'react-icons/ri'
import { RiArrowUpSLine } from 'react-icons/ri'
import styles from './currencyDropdown.module.css'
import { useSelect } from 'downshift'
import { useCurrencyConversion } from '@/app/context/currencyContext'

const items = ['SEK', 'EUR']

function CurrencyDropdown() {
	const { isOpen, selectedItem, getToggleButtonProps, getMenuProps, highlightedIndex, getItemProps } = useSelect({
		items: items,
		// onSelectedItemChange: ({ selectedItem }) => handleClick(selectedItem),
		onSelectedItemChange: () => getCurrency(),
	})

	const { getCurrency, priceInEuro } = useCurrencyConversion()

	return (
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
					style={{
						listStyle: 'none',
						width: '100%',
						padding: '0',
						margin: '0',
					}}>
					{isOpen &&
						items.map((item, index) => {
							return (
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
									<span>{item}</span>
								</li>
							)
						})}
				</ul>
			</div>

			<div>{selectedItem === 'EUR' ? <div>{priceInEuro}</div> : 'Do nothing'}</div>
		</div>
	)
}

export default CurrencyDropdown
