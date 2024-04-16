import React from 'react';
import styles from './priceBlock.module.css';

type PriceBlockProps = {
	// formatCurrency: (number: number, currency: 'SEK' | 'EUR') => string;
	currency: 'SEK' | 'EUR';
	product: {
		model: string;
		designer: string;
		boardType: string;
		length: string;
		detail: string;
		profile: string;
		price: number;
	};
	conversionRateEur: number;
};

// const PriceBlock = ({ formatCurrency, currency, product, conversionRateEur }: PriceBlockProps) => {
const PriceBlock = ({ currency, product, conversionRateEur }: PriceBlockProps) => {
	return (
		<article className={styles.productPrice}>
			{/* By adding (conversionRateEur || 0), you're providing a default value of 0 in case conversionRateEur is undefined. This ensures that the multiplication operation always has a valid operand. */}
			{/* You can also explicitly cast product.price to a number to ensure TypeScript understands that it's safe to perform arithmetic operations on it. */}
			{/* <span>{formatCurrency(currency === 'SEK' ? product.price : product.price * conversionRateEur, currency)}</span> */}
			<span>{currency === 'SEK' ? product.price : product.price * conversionRateEur}</span>
		</article>
	);
};

export default PriceBlock;
