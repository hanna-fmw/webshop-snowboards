'use client';
import React from 'react';
import styles from './about.module.css';
import Image, { unstable_getImgProps as getImgProps } from 'next/image';

const About = () => {
	return (
		<>
			<section className={styles.heroContainer}>
				<Image src='/hero/hero_about.png' width={1440} height={937} className={styles.heroImage} alt='About page hero image' />

				<p className={styles.heroOverlay}>
					TUR SNOWBOARDS FROM SWEDEN. SHAPED WITH A PURPOSE. IMAGINED FROM A LIFETIME OF PROFESSIONALEXPERIENCE. DESIGNED TO COVER EVERY CORNER OF THE
					MOUNTAIN. CONSTRUCTED WITH HIGH PERFORMANCE MATERIALS AND EXCEPTIONAL DETAILING. APPROVED BY THE HARSH CONDITIONS OF SCANDINAVIA. REFINED
					FOR THE MOUNTAINS OF THE WORLD. MADE TO BE RIDDEN BY YOU.
				</p>
			</section>

			<section className={styles.containerGrid}>
				<h2 className={styles.header}>[A.T.S] ABOUT TUR SNOWBOARDS</h2>

				<div className={styles.brandDetails}>
					<article className={styles.article}>
						<div className={styles.articleLabel}>[01].</div> <h2 className={styles.articleHeading}>TUR SNOWBOARDS</h2>
						<p className={styles.articleDescription}>
							TUR Snowboards from Sweden. Born out of dark winters and profound passion – with a wealth of experiential riding wisdom. Designed to
							cover every corner of the mountain. Constructed with high performance materials and exceptional detailing. Shaped with a purpose.
							Approved by the harsh conditions of Scandinavia. Refined for you and the mountains of the world. Welcome to the bright side.
						</p>
					</article>
					<article className={styles.article}>
						<div className={styles.articleLabel}>[02].</div> <h2 className={styles.articleHeading}>APPROVED BY SCANDINAVIA</h2>
						<p className={styles.articleDescription}>
							Scandinavia is no ordinary place – it’s a perfect juxtaposition of light and darkness. Our unique landscape, with its ever-changing snow
							conditions and proximity to the Arctic Circle, serves as an ideal testing ground for our snowboards. We design, shape, and rigorously
							test all our boards in diverse snow conditions around our Swedish backyard, collaborating with splitboard guides, pro-riders and
							enthusiasts to ensure top performance. If they works here, they will work anywhere.
						</p>
					</article>
					<article className={styles.article}>
						<div className={styles.articleLabel}>[03].</div> <h2 className={styles.articleHeading}>SHAPED WITH A PURPOSE</h2>
						<p className={styles.articleDescription}>
							The shape of a board is its signature, significantly influencing your experience on the mountain. At TUR, we meticulously craft our
							board shapes, camber, and rocker profiles to achieve the perfect blend of float, stability, speed, and playfulness. Our shapes, like the
							Buteo and Labb, excel in deep snow and on corduroy, offering a great all-around experience. The Bubo, Korp och Falc was designed to
							maximise both performance and style in and outside the piste, meanwhile, the Pluv and Tica are modern, high-performance boards designed
							for playful riding across the mountain. Together they are what we would want in our boardbag for a lifelong journey on the snow.
						</p>
					</article>
					<article className={styles.article}>
						<div className={styles.articleLabel}>[04].</div> <h2 className={styles.articleHeading}>ENGINEERED WITHOUT COMPROMISE</h2>
						<p className={styles.articleDescription}>
							Each board starts with a vision and we construct the board around that vision. To create a truly premium board, we don’t compromise on
							any level, working with the best people, factories and materials we trust. Utilizing lightweight wooden cores for agility, fast sintered
							bases, and premium steel edges, our commitment to excellence knows no bounds. What sets us apart is our expertise in combining these
							materials in distinct, premium compositions for each board. We apply our years of knowledge around board building to a variety of
							specific premium material compositions for each board. And only after tons of adjustments, rethinking and refinement, are the boards
							ready to be branded TUR.
						</p>
					</article>
					<article className={styles.article}>
						<div className={styles.articleLabel}>[05].</div> <h2 className={styles.articleHeading}>CREATED FROM NECESSITY</h2>
						<p className={styles.articleDescription}>
							TUR’s genesis was born of necessity, originating from a few passionate Swedish snowboarders seeking to create a thoughtfully curated
							collection of premium boards. We set out to put together a well-thought out, minimal quiver of premium quality boards that would be
							specific enough to fit our different riding styles, yet broad enough to allow us the freedom to explore the varying terrains of the
							entire mountain. Focused on the essence of snowboarding, these designs are mature enough for everyday use and built to stand the test of
							time. After a lifetime of riding, developing, and selling boards, we recognized the absence of a brand that met our needs. In 2017, we
							took the initiative to create our own solution. The result was TUR and our mission hasn’t changed since.
						</p>
					</article>
					<article className={styles.article}>
						<div className={styles.articleLabel}>[06].</div> <h2 className={styles.articleHeading}>AN ARTISTIC CHARACTERISTIC</h2>
						<p className={styles.articleDescription}>
							Each shape features a unique artwork by the Swedish artist Ragnar Persson where the name of the model is illustrated. The names of the
							shapes come from specific birds that, through their unique features and habitats, fit the surroundings each snowboard is made for. The
							artwork is taken from the birds’ characteristics, both through its visual approach but also through its specific features. Ragnar’s
							works have been shown in galleries all around the world and he is represented in Gallery Steinsland Berliner in Stockholm.
						</p>
					</article>
				</div>
			</section>
		</>
	);
};

export default About;
