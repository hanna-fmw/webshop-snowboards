'use client'
import React from 'react'
import products from '@/app/data/products.json'
import styles from './productDetailpage.module.css'
import Image from 'next/image'
import { useState } from 'react'
import TextBlock from '@/app/components/atoms/textBlock/TextBlock'
import Button from '@/app/components/atoms/button/Button'
import { useRouter } from 'next/navigation'
import classnames from 'classnames'
import { motion } from 'framer-motion'
import { useCart } from '@/app/context/cartContext'
import { useCurrencyConversion } from '@/app/context/currencyContext'
import { CartContextProps } from '@/app/context/cartContext'

type ProductDetailsProps = {
	params: { productModel: string }
}

const parentVariants = {
	initial: { opacity: 1 },
	animate: {
		transition: {
			staggerChildren: 0.1,
		},
	},
}

const childrenVariants = {
	initial: { opacity: 0 },
	animate: {
		opacity: 1,
		transition: {
			duration: 0.4,
		},
	},
}

const ProductDetailPage = ({ params }: ProductDetailsProps) => {
	const cartContext = useCart() as CartContextProps

	const { closeCart, increaseCartQuantity, setIsAddedToCart, isAddedToCart, selectLength, selectedLength, checkCartEmpty, addedToCart, isCartOpen } =
		cartContext

	const model = params.productModel

	const [isFullSize, setIsFullSize] = useState<boolean>(false)
	const [thumbnailIndex, setThumbnailIndex] = useState(0)

	const router = useRouter()

	const { currency, conversionRateEur } = useCurrencyConversion()

	const handleClick = (i: number) => {
		setThumbnailIndex(i)
		setIsFullSize(true)
	}

	const goToCart = () => {
		router.push('/cart')
		isCartOpen && closeCart()
		setIsAddedToCart(false)
	}

	const currentProduct = products.find((product) => model === product.model)

	if (!currentProduct) {
		return <div>Product not found</div>
	}

	return (
		<>
			{isAddedToCart ? (
				<aside className={styles.greenBox}>
					<div style={{ marginBottom: '1rem' }}>&ldquo;{currentProduct?.name}&rdquo; HAS BEEN ADDED TO YOUR CART.</div>
					<div className={styles.btnSmallScreen}>
						<Button onClick={goToCart} variant='large-dark-no-hover'>
							VIEW&nbsp;CART
						</Button>
					</div>
					<div className={styles.btnLargeScreen}>
						<Button onClick={goToCart} variant='default-dark'>
							VIEW&nbsp;CART
						</Button>
					</div>
				</aside>
			) : null}

			<section className={styles.container}>
				<section className={styles.productImgs}>
					{isFullSize ? (
						<Image
							src={`/products/${currentProduct?.thumbnails[thumbnailIndex]}`}
							width={350}
							height={450}
							alt='Product Image'
							className={styles.productImg}
						/>
					) : (
						<Image src={`/products/${currentProduct?.image}`} width={350} height={450} alt='Product Image' className={styles.productImg} />
					)}

					<motion.div className={styles.thumbnails} variants={parentVariants} initial='initial' animate='animate'>
						{currentProduct?.thumbnails.map((thumbnail, i) => {
							const thumbnailStyles = classnames(styles.thumbnailCard, {
								[styles.selectedThumbnail]: thumbnailIndex === i,
							})

							return (
								<motion.div key={i} className={thumbnailStyles} onClick={() => handleClick(i)} variants={childrenVariants}>
									<div className={`${styles.overlay} ${thumbnailStyles}`}></div>

									<Image src={`/products/${thumbnail}`} width={50} height={50} alt='Thumbnail' className={styles.thumbnailImg} />
								</motion.div>
							)
						})}
					</motion.div>
				</section>

				{products.map((product, i) => {
					return (
						<>
							{model === product.model ? (
								<section className={styles.infoContainer} key={i}>
									<article className={styles.textBlock}>
										<TextBlock
											name={product.name}
											designer={product.designer}
											boardType={product.boardType}
											length={product.length}
											detail={product.detail}
											profile={product.profile}
											lengthForModel={product.lengthForModel}
										/>
										<div className={styles.price}>
											<span>
												{currency === 'SEK' ? Number(product.price) + '\u00A0SEK' : Number(product.price) * conversionRateEur + '\u00A0EUR'}
											</span>
										</div>
									</article>

									<article className={styles.btnContainer}>
										{product.lengthOptions ? (
											<div className={styles.lengthBtns}>
												{product.lengthOptions?.map((option, i) => {
													const lengthStyles = classnames(styles.lengthBtn, {
														[styles.lengthSelected]: option === selectedLength,
													})
													return (
														<button key={i} className={lengthStyles} onClick={() => selectLength(option)}>
															{option}
														</button>
													)
												})}
											</div>
										) : null}

										<Button
											variant='large-dark'
											onClick={() => {
												if (selectedLength || !product.lengthOptions) {
													increaseCartQuantity({
														...product,
														price: product.price,
													})
													addedToCart()
													checkCartEmpty()
												} else {
													alert('Please pick a length option')
												}
											}}>
											ADD TO CART
										</Button>
									</article>

									<article className={styles.productInfoBlock}>
										<h2 className={styles.h2} style={{ color: '#00b140', marginBottom: '1rem' }}>
											SHIPPING WORLD WIDE! NEED SUPPORT?
										</h2>
										<h2 className={styles.h2}>{product.descriptionHeading}</h2>
										<div>{product.descriptionText}</div>
										<h2 className={styles.h2}>{product.districtHeading}</h2>
										<div>{product.district}</div>

										{product.propertiesHeading ? (
											<div>
												<h2 className={styles.h2}>{product.propertiesHeading}</h2>
												<ul className={styles.ul}>
													<li className={styles.li}>{product.properties.length}</li>
													{product.properties?.features.map((property, i) => (
														<li className={styles.li} key={i}>
															{property}
														</li>
													))}
												</ul>
											</div>
										) : null}

										{product.sizeTable ? (
											<ul>
												{product.sizeTable.map((size, i) => {
													return <li key={i}>{size}</li>
												})}
											</ul>
										) : null}

										<h2 className={styles.h2}>{product.narrativeHeading}</h2>
										<div>{product.narrative}</div>
										{product.preCutSkins ? (
											<Button variant={'default'} onClick={() => router.push('/shop/skins')}>
												ADD PRE-CUT SKINS
											</Button>
										) : null}
										<div className={styles.additionalInfo}>
											{product.additionalInfo.map((infoLine, i) => (
												<ul key={i} className={styles.ul}>
													<li className={styles.li}>{infoLine}</li>
												</ul>
											))}
										</div>
									</article>
								</section>
							) : null}
						</>
					)
				})}
			</section>

			{products.map((product, i) => {
				return (
					<>
						{model === product.model ? (
							<section key={i}>
								{product.technicalSpecificationHeading ? (
									<article className={styles.techContainer}>
										<h2 className={styles.h2} style={{ alignSelf: 'flex-start' }}>
											{product.technicalSpecificationHeading}
										</h2>
										<div style={{ alignSelf: 'flex-start' }} className={styles.chartContainer}>
											<Image
												src={`/products/${product.technicalSpecification}`}
												width={350}
												height={150}
												alt='Technical Specifications'
												className={`${styles.chart} ${styles.chart1} `}
											/>
											<Image src={`/products/${product.chart}`} width={350} height={150} alt='Technical Specifications' className={styles.chart} />
										</div>
									</article>
								) : null}
							</section>
						) : null}
					</>
				)
			})}
		</>
	)
}

export default ProductDetailPage
