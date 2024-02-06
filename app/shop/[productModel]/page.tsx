'use client'
import Figure from '@/app/components/atoms/figure/Figure'
import ProductCard from '@/app/components/molecules/productCard/ProductCard'
import React from 'react'
import products from '../../data/products.json'
import styles from './productDetailpage.module.css'
import Image from 'next/image'
import { useState } from 'react'
import TextBlock from '@/app/components/atoms/textBlock/TextBlock'
import Button from '@/app/components/atoms/button/Button'

// type Fullsize = {
// 	isFullSize?: boolean
// 	setIsFullSize?: () => void
// }

type ProductDetailsProps = {
	params: { productModel: string }
}

const ProductDetailPage = ({ params }: ProductDetailsProps) => {
	const model = params.productModel

	const [isFullSize, setIsFullSize] = useState<any>(false)
	const [selectedThumbnailIndex, setSelectedThumbnailIndex] = useState(-1)

	const handleClick = (i: number) => {
		setSelectedThumbnailIndex(i)
		setIsFullSize((prev: any) => !prev)
		console.log('är eller inte', isFullSize)
	}

	//Istället för products[0] vill vi få in products.map ((product) =>
	const currentProduct = products.find((product) => decodeURIComponent(model) === product.model)
	console.log('detta är current', currentProduct)
	return (
		<section className={styles.container}>
			{/* <ProductCard>
				<Figure image={`/products/${products[0].image}`} />
			</ProductCard> */}

			{/* {isFullSize ? (
				<ProductCard>
					<Figure image={`/products/${products[0].thumbnails[selectedThumbnailIndex]}`} />
				</ProductCard>
			) : (
				<ProductCard>
					<Figure image={`/products/${products[0].image}`} />
				</ProductCard>
			)} */}
			{isFullSize ? (
				<ProductCard>
					<Figure image={`/products/${currentProduct?.thumbnails[selectedThumbnailIndex]}`} />
				</ProductCard>
			) : (
				<ProductCard>
					<Figure image={`/products/${currentProduct?.image}`} />
				</ProductCard>
			)}
			<div className={styles.thumbnails}>
				{currentProduct?.thumbnails.map((thumbnail, i) => {
					console.log('detta är thumbnail', thumbnail)
					return (
						<div key={i} className={styles.thumbnailCard} onClick={() => handleClick(i)}>
							<div className={styles.overlay}></div>
							<Image src={`/products/${thumbnail}`} width={50} height={50} alt='bild' />
						</div>
					)
				})}
			</div>

			<div>
				{products.map((product, i) => {
					const decodedURL = decodeURIComponent(model)

					return (
						<div key={i}>
							{decodedURL === product.model ? (
								<section className={styles.infoContainer}>
									<ProductCard>
										<TextBlock
											model={product.model}
											designer={product.designer}
											length={product.length}
											detail={product.detail}
											profile={product.profile}
											price={product.price}
											currency='SEK'
										/>
									</ProductCard>
									<div>
										<Button variant={'large-light'} onClick={() => {}}>
											{product.length}
										</Button>
										<Button variant={'large-dark'} onClick={() => {}}>
											ADD TO CART
										</Button>
									</div>

									<div className={styles.productInfoBlock}>
										<h2 style={{ color: '#00b140', marginBottom: '1rem' }}>SHIPPING WORLD WIDE! NEED SUPPORT?</h2>
										<div>{product.descriptionHeading}</div>
										<div>{product.descriptionText}</div>
										<h2>DISTRICT:</h2>
										<div>{product.district}</div>
										<h2>PROPERTIES:</h2>
										<ul className={styles.ul}>
											<li className={styles.li}>{product.properties.length}</li>

											{product.properties.features.map((property, i) => (
												<li className={styles.li} key={i}>
													{property}
												</li>
											))}
										</ul>
										<h2>NARRATIVE:</h2>
										<div>{product.narrative}</div>
										<div className={styles.additionalInfo}>
											{product.additionalInfo.map((infoLine, i) => (
												<ul key={i} className={styles.ul}>
													<li className={styles.li}>{infoLine}</li>
												</ul>
											))}
										</div>
										<h2>TECHNICAL SPECIFICATION:</h2>

										<Image
											src={`/products/${product.technicalSpecification}`}
											width={350}
											height={150}
											alt='Technical Specifications'
											className={styles.chart}
										/>
										<Image src={`/products/${product.chart}`} width={350} height={150} alt='Technical Specifications' className={styles.chart} />
										<h2>RELATED PRODUCTS:</h2>
									</div>
								</section>
							) : null}
						</div>
					)
				})}
			</div>
		</section>
	)
}

export default ProductDetailPage
