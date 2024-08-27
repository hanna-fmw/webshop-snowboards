'use client'
import { createContext, useContext, useState } from 'react'

type CurrencyContextProps = {
	priceInEuro: number | undefined
	getCurrency: () => Promise<void>
	conversionRateEur: number
	setCurrency: (currency: 'SEK' | 'EUR') => void
	currency: 'SEK' | 'EUR'
}

type CurrencyProviderProps = {
	children: React.ReactNode
}

const CurrencyContext = createContext({} as CurrencyContextProps)
const apiKey = process.env.NEXT_PUBLIC_API_KEY

export const CurrencyProvider = ({ children }: CurrencyProviderProps) => {
	const [priceInEuro, setPriceInEuro] = useState<number | undefined>(undefined)
	const [conversionRateEur, setConversionRateEur] = useState<number>(0)
	const [currency, setCurrency] = useState<'SEK' | 'EUR'>('SEK')

	const getCurrency = async () => {
		const res = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/SEK/EUR`)
		const data = await res.json()
		setConversionRateEur((data?.conversion_rate).toFixed(2))
	}

	return (
		<CurrencyContext.Provider
			value={{ getCurrency, priceInEuro, conversionRateEur, setCurrency, currency }}>
			{children}
		</CurrencyContext.Provider>
	)
}

export const useCurrencyConversion = () => {
	return useContext(CurrencyContext)
}
