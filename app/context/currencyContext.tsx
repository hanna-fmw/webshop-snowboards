'use client';
import { createContext, useContext, useState } from 'react';
import { useLocalStorage } from '@/app/hooks/useLocalStorage';

type CurrencyContextProps = {
	priceInEuro: number | undefined;
	getCurrency: () => Promise<void>;
	conversionRateEur: number;
	setCurrency: (currency: 'SEK' | 'EUR') => void;
	currency: 'SEK' | 'EUR';
};

type CurrencyProviderProps = {
	children: React.ReactNode;
};

const CurrencyContext = createContext({} as CurrencyContextProps);

export const CurrencyProvider = ({ children }: CurrencyProviderProps) => {
	const [priceInEuro, setPriceInEuro] = useState<number | undefined>(undefined);
	const [conversionRateEur, setConversionRateEur] = useState<number | undefined>(undefined);
	const [currency, setCurrency] = useState<'SEK' | 'EUR'>('SEK');

	const getCurrency = async () => {
		const res = await fetch('https://v6.exchangerate-api.com/v6/2a4546bd78627d32686a922f/pair/SEK/EUR/200');
		const data = await res.json();
		console.log(data?.conversion_rate);
		setConversionRateEur(data?.conversion_rate);
	};

	return (
		// @ts-ignore
		<CurrencyContext.Provider value={{ getCurrency, priceInEuro, conversionRateEur, setCurrency, currency }}>{children}</CurrencyContext.Provider>
	);
};

export const useCurrencyConversion = () => {
	return useContext(CurrencyContext);
};
