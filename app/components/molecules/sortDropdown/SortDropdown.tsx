'use client'
import React from 'react'
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri'
import styles from './sortDropdown.module.css'
import { useSortDropdownContext } from '@/app/context/downShiftContext'

type SortDropdownProps = {
	items: string[]
}

const SortDropdown: React.FC<SortDropdownProps> = ({ items }) => {
	// @ts-ignore
	const { isOpen, selectedItem, getToggleButtonProps, getMenuProps, highlightedIndex, getItemProps } = useSortDropdownContext()

	return (
		<div className={styles.dropdownContainer}>
			<button className={`${styles.button} currDropdown`} {...getToggleButtonProps()}>
				{selectedItem ?? 'Default sorting'}
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
						items.map((item, index) => (
							<li
								className={styles.menuItem}
								style={{
									backgroundColor: highlightedIndex === index ? '#232323' : '',
									color: highlightedIndex === index ? '#fff' : '',
								}}
								key={`${item}${index}`}
								{...getItemProps({
									item,
									index,
								})}>
								<span>{item}</span>
							</li>
						))}
				</ul>
			</div>
		</div>
	)
}

export default SortDropdown
