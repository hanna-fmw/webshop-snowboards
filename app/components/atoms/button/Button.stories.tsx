import styles from './button.module.css'
import type { Meta, StoryObj } from '@storybook/react'

import Button from './Button'

const meta = {
	title: '/Atoms/Button',
	component: Button,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		label: 'SHOP NOW',
		variant: 'default',
	},
}

export const DefaultDark: Story = {
	args: {
		label: '155',
		variant: 'default-dark',
	},
}

export const LargeDark: Story = {
	args: {
		label: 'ADD TO CART',
		variant: 'large-dark',
	},
}

export const LargeGreen: Story = {
	args: {
		label: 'ADD TO CART',
		variant: 'large-green',
	},
}

export const LargeLight: Story = {
	args: {
		label: 'ADD TO CART',
		variant: 'large-light',
	},
}

export const WithIcon: Story = {
	args: {
		label: 'SORT BY:',
		variant: 'default',
		icon: true,
	},
}

let text = '1'
export const Counter: Story = {
	args: {
		variant: 'default',
	},
	render: (args) => (
		<Button onClick={() => {}}>
			<div>-</div>
			<div>{text}</div>
			<div>+</div>
		</Button>
	),
}
