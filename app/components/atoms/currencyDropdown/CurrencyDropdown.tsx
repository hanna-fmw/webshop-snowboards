'use client'
import React from 'react'
import { useState } from 'react'
import styles from './currencyDropdown.module.css'

const CurrencyDropdown = () => {
	return (
		<>
			<ul style={{ listStyle: 'none', padding: '0' }}>
				<li>SEK</li>
				<li>EUR</li>
			</ul>
		</>
	)
}

export default CurrencyDropdown
