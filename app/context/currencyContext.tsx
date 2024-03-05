'use client'
import { createContext, useContext, useState } from 'react'
import { useLocalStorage } from '@/app/hooks/useLocalStorage'

type CurrencyContextProps = {
	priceInEuro: number | undefined
	getCurrency: () => Promise<void>
}

type CurrencyProviderProps = {
	children: React.ReactNode
}

const CurrencyContext = createContext({} as CurrencyContextProps)

export const CurrencyProvider = ({ children }: CurrencyProviderProps) => {
	const [priceInEuro, setPriceInEuro] = useState<number | undefined>(undefined)

	const getCurrency = async () => {
		const res = await fetch('https://v6.exchangerate-api.com/v6/2a4546bd78627d32686a922f/pair/SEK/EUR/200')
		const data = await res.json()
		console.log(data?.conversion_result)
		setPriceInEuro(data?.conversion_result)
	}

	return <CurrencyContext.Provider value={{ getCurrency, priceInEuro }}>{children}</CurrencyContext.Provider>
}

export const useCurrencyConversion = () => {
	return useContext(CurrencyContext)
}
