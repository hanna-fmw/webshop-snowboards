const CURRENCY_FORMATTER = (currency: 'SEK' | 'EUR') =>
	new Intl.NumberFormat(undefined, {
		currency: currency,
		style: 'currency',
	});

const formatCurrency = (number: number, currency: 'SEK' | 'EUR') => {
	const formatter = CURRENCY_FORMATTER(currency);
	return formatter.format(number);
};

export default formatCurrency;
