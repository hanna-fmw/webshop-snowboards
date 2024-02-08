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
import { useRouter } from 'next/navigation'

type ProductDetailsProps = {
	params: { productModel: string }
}

const ProductDetailPage = ({ params }: ProductDetailsProps) => {
	const model = params.productModel

	const [isFullSize, setIsFullSize] = useState<any>(false)
	const [selectedThumbnailIndex, setSelectedThumbnailIndex] = useState(-1)

	const router = useRouter()

	const handleClick = (i: number) => {
		setSelectedThumbnailIndex(i)
		setIsFullSize(true)
	}

	// const currentProduct = products.find((product) => decodeURIComponent(model) === product.model)
	const currentProduct = products.find((product) => model === product.model)

	return (
		<main className={styles.main}>
			<section className={styles.container}>
				<div className={styles.productImgs}>
					<div>
						{isFullSize ? (
							<ProductCard>
								<Figure image={`/products/${currentProduct?.thumbnails[selectedThumbnailIndex]}`} />
							</ProductCard>
						) : (
							<ProductCard>
								{/* <Figure image={`/products/${currentProduct?.image}`} /> */}
								<Image src={`/products/${currentProduct?.image}`} width={350} height={450} alt='Product Image' className={styles.productImg} />
							</ProductCard>
						)}
					</div>
					<div className={styles.thumbnails}>
						{currentProduct?.thumbnails.map((thumbnail, i) => {
							return (
								<div key={i} className={styles.thumbnailCard} onClick={() => handleClick(i)}>
									<div className={styles.overlay}></div>
									<Image src={`/products/${thumbnail}`} width={50} height={50} alt='bild' className={styles.thumbnailImg} />
								</div>
							)
						})}
					</div>
				</div>

				{products.map((product, i) => {
					// const decodedURL = decodeURIComponent(model)

					return (
						<div key={i}>
							{model === product.model ? (
								<>
									<div className={styles.infoContainer}>
										{/* <ProductCard> */}
										<TextBlock
											name={product.name}
											designer={product.designer}
											boardType={product.boardType}
											length={product.length}
											detail={product.detail}
											profile={product.profile}
											lengthForModel={product.lengthForModel}
											price={product.price}
											currency='SEK'
										/>
										{/* </ProductCard> */}

										<div className={styles.btnContainer}>
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
		</main>
	)
}

export default ProductDetailPage
