'use client'
import Figure from '@/app/components/atoms/figure/Figure'
import ProductCard from '@/app/components/molecules/productCard/ProductCard'
import React from 'react'
// import products from '../../data/products.json'
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
import Cart from '@/app/components/organisms/cart/Cart'

type ProductDetailsProps = {
	params: { productModel: string }
	
}

const parentVariants = {
	initial: { opacity: 1 },
	animate: {
		opacity: 1,

		transition: {
			staggerChildren: 0.2,
			duration: 0.4,
		},
	},
}

const childrenVariants = {
	initial: { opacity: 0 },
	animate: { opacity: 1 },
}

const ProductDetailPage = ({ params }: ProductDetailsProps) => {
	// const [showIsAddedToCart, setShowIsAddedToCart] = useState<boolean>(false)
	

	const { closeCart, increaseCartQuantity, setIsAddedToCart, isAddedToCart } = useCart()
	console.log(params)

	const model = params.productModel

	const [isFullSize, setIsFullSize] = useState<boolean>(false)
	const [thumbnailIndex, setThumbnailIndex] = useState(0)

	const router = useRouter()

	const handleClick = (i: number) => {
		setThumbnailIndex(i)
		setIsFullSize(true)
	}

	const goToCart = () => {
		router.push('/cart')
		closeCart()
		setIsAddedToCart(false)
	}

	const currentProduct = products.find((product) => model === product.model)

	// const showAddedToCartMessage = () => {
	// 	setShowIsAddedToCart(true)
	// }

	return (
		<main className={styles.main}>
			<section className={styles.section}>
				{isAddedToCart ? (
					<div className={styles.greenBox}>
						<div style={{ marginBottom: '1rem' }}>&ldquo;{currentProduct?.name}&rdquo; HAS BEEN ADDED TO YOUR CART.</div>
						<div className={styles.btnSmallScreen}>
							<Button onClick={goToCart} variant='large-dark-no-hover'>
								VIEW CART
							</Button>
						</div>
						<div className={styles.btnLargeScreen}>
							<Button onClick={goToCart} variant='default-dark'>
								VIEW&nbsp;CART
							</Button>
						</div>
					</div>
				) : null}

				<section className={styles.container}>
					<div className={styles.productImgs}>
						<div>
							{isFullSize ? (
								<ProductCard>
									<Figure image={`/products/${currentProduct?.thumbnails[thumbnailIndex]}`} />
								</ProductCard>
							) : (
								<ProductCard>
									<Image src={`/products/${currentProduct?.image}`} width={350} height={450} alt='Product Image' className={styles.productImg} />
								</ProductCard>
							)}
						</div>

						<motion.div className={styles.thumbnails} variants={parentVariants} initial='initial' animate='animate'>
							{currentProduct?.thumbnails.map((thumbnail, i) => {
								//classnames definition
								const thumbnailStyles = classnames(styles.thumbnailCard, {
									[styles.selectedThumbnail]: thumbnailIndex === i,
								})

								return (
									<motion.div
										key={i}
										// className={`${styles.thumbnailCard} ${thumbnailIndex === i ? styles.selectedThumbnail : ''}`}
										className={thumbnailStyles}
										onClick={() => handleClick(i)}
										variants={childrenVariants}>
										{/* <div className={`${styles.overlay} ${thumbnailIndex === i ? styles.selectedThumbnail : ''}`}></div> */}
										<div className={`${styles.overlay} ${thumbnailStyles}`}></div>

										<Image src={`/products/${thumbnail}`} width={50} height={50} alt='bild' className={styles.thumbnailImg} />
									</motion.div>
								)
							})}
						</motion.div>
					</div>

					{products.map((product, i) => {
						console.log('product är:', product)

						return (
							<div key={i}>
								{model === product.model ? (
									<>
										<div className={styles.infoContainer}>
											{/* <ProductCard> */}
											{/* <TextBlock
											name={product.name}
											designer={product.designer}
											boardType={product.boardType}
											length={product.length}
											detail={product.detail}
											profile={product.profile}
											lengthForModel={product.lengthForModel}
											price={product.price}
											currency='SEK'
										/> */}
											<TextBlock {...product} />
											{/* </ProductCard> */}

											<div className={styles.btnContainer}>
												{product.lengthOptions ? (
													<Button variant='large-light' onClick={() => {}}>
														{product.lengthOptions?.map((option, i) => {
															let lastOptionIndex = product.lengthOptions.length - 1
															return <span key={i}>{i !== lastOptionIndex ? <span>{option}/</span> : <span>{option}</span>}</span>
														})}
													</Button>
												) : null}
												{/* Here we pass in the entire product object (into the context) */}
												{/* <Button variant='large-dark' onClick={() => addItemToCart(product)}> */}
												{/* <Button variant='large-dark' onClick={() => increaseCartQuantity(product)}> */}
												<Button
													variant='large-dark'
													onClick={() => {
														increaseCartQuantity(product)
														setIsAddedToCart(true)
													}}>
													ADD TO CART
												</Button>
											</div>

											<div className={styles.productInfoBlock}>
												<h2 style={{ color: '#00b140', marginBottom: '1rem' }}>SHIPPING WORLD WIDE! NEED SUPPORT?</h2>
												<div>{product.descriptionHeading}</div>
												<div>{product.descriptionText}</div>
												<h2>{product.districtHeading}</h2>
												<div>{product.district}</div>

												{product.propertiesHeading ? (
													<div>
														<h2>{product.propertiesHeading}</h2>
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

												<h2>{product.narrativeHeading}</h2>
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
											</div>

											{/* {product.technicalSpecificationHeading ? (
										<div className={styles.techInfoContainer}>
											<h2>{product.technicalSpecificationHeading}</h2>
											<div className={styles.chartsContainer}>
												<Image
													src={`/products/${product.technicalSpecification}`}
													width={350}
													height={150}
													alt='Technical Specifications'
													className={styles.chart}
												/>
												<Image src={`/products/${product.chart}`} width={350} height={150} alt='Technical Specifications' className={styles.chart} />
											</div>
										</div>
									) : null} */}
										</div>
										{/* <div>
									<h2>{product.relatedProductsHeading}</h2>
								</div> */}
									</>
								) : null}
							</div>
						)
					})}
				</section>

				{products.map((product, i) => {
					// const decodedURL = decodeURIComponent(model)

					return (
						<>
							{model === product.model ? (
								<div key={i}>
									{product.technicalSpecificationHeading ? (
										<div className={styles.techInfoContainer}>
											<h2 style={{ alignSelf: 'flex-start' }}>{product.technicalSpecificationHeading}</h2>
											<div style={{ alignSelf: 'flex-start' }} className={styles.chartsContainer}>
												<Image
													src={`/products/${product.technicalSpecification}`}
													width={350}
													height={150}
													alt='Technical Specifications'
													className={styles.chart}
												/>
												<Image src={`/products/${product.chart}`} width={350} height={150} alt='Technical Specifications' className={styles.chart} />
											</div>
										</div>
									) : null}

									<div>
										<h2>{product.relatedProductsHeading}</h2>
									</div>
								</div>
							) : null}
						</>
					)
				})}
			</section>
		</main>
	)
}

export default ProductDetailPage
