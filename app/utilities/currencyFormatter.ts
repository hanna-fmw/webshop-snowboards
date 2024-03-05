// const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
// 	currency: 'SEK',
// 	style: 'currency',
// })

// const formatCurrency = (number: number) => {
// 	return CURRENCY_FORMATTER.format(number)
// }

// export default formatCurrency

//We pass in currency as parameters and use our currency state (which we import
//from currencyContext.tsx) in our components to conditionally format the prices
//based on the current currency, i.e. SEK or EUR.
const CURRENCY_FORMATTER = (currency: 'SEK' | 'EUR') =>
	new Intl.NumberFormat(undefined, {
		currency: currency,
		style: 'currency',
	})

const formatCurrency = (number: number, currency: 'SEK' | 'EUR') => {
	const formatter = CURRENCY_FORMATTER(currency)
	return formatter.format(number)
}

export default formatCurrency
