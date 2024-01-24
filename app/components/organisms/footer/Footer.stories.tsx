import type { Meta, StoryObj } from '@storybook/react'
import styles from './footer.module.css'

import Footer from './Footer'

const meta = {
	title: '/organisms/Footer',
	component: Footer,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof Footer>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
	render: (args) => (
		<Footer>
			<ul className={styles.addressBlock}>
				<li>TUR SNOWBOARDS</li>
				<li>ENGELBERKSGATAN&nbsp;24</li> <li>791&nbsp;60&nbsp;FALUN</li> <li>SWEDEN</li>
			</ul>
			<ul className={styles.customerSupportBlock}>
				<li>SUPPORT:</li> <li>MON-FRI 09:00-17:00</li> <li>+46&nbsp;[0]70&nbsp;736&nbsp;12&nbsp;16</li> <li>INFO@TURSNOWBOARDS.com</li>
			</ul>
			<ul className={styles.socialMediaBlock}>
				<li>INSTAGRAM</li>
				<li>FACEBOOK</li>
			</ul>
			<ul className={styles.linkBlock}>
				<li>[a].HOME</li> <li>[b].SHOP</li> <li>[c].ABOUT</li> <li>[d].SUPPORT</li>
			</ul>
			<ul className={styles.customerInfoBlock}>
				<li>INFO:</li> <li>PRIVACY POLICY</li> <li>TERMS &amp; CONDITIONS</li> <li>DELIVERY &amp; RETURNS</li>
			</ul>
			<ul className={styles.deliveryInfo}>
				<li>TUR SNOWBOARDS</li>
				<li>SHIPPING WORLD WIDE</li>
			</ul>
			<ul className={styles.copyrightInfo}>
				<li>©TURSNOWBOARDS2023</li>
			</ul>
		</Footer>
	),
}
