import type { Meta, StoryObj } from '@storybook/react'
import styles from './navLink.module.css'

import NavLink from './NavLink'
import Link from 'next/link'

const meta = {
	title: '/Atoms/NavLink',
	component: NavLink,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof NavLink>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		url: '/test',
	},
	render: (args) => (
		<Link href={args.url} className={styles.navLink}>
			[a]. HOME
		</Link>
	),
}

export const Active: Story = {
	args: {
		url: '/test',
	},
	render: (args) => (
		<Link href={args.url} className={`${styles.navLink} ${styles.navLinkHover}`}>
			[a]. ABOUT
		</Link>
	),
}
