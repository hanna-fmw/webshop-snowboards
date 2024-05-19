import Image from 'next/image';
import React from 'react';
import styles from './productImg.module.css';

type ProductImgProps = {
	children?: React.ReactNode;
	image?: string;
	onClick?: () => void;
};

const ProductImg = ({ image, children, onClick }: ProductImgProps) => {
	return <>{image && <Image src={image} width={350} height={450} alt='Placeholder' className={styles.productImg} onClick={onClick} />}</>;
};

export default ProductImg;
