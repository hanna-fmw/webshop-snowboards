import React from 'react';
import styles from './priceBlock.module.css';

type PriceBlockProps = {
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

const PriceBlock = ({ currency, product, conversionRateEur }: PriceBlockProps) => {
	return (
		<article className={styles.productPrice}>
			<span>{currency === 'SEK' ? `${product.price} SEK` : `${product.price * conversionRateEur} EUR`}</span>
		</article>
	);
};

export default PriceBlock;
