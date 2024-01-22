import type { Meta, StoryObj } from '@storybook/react'

import PriceBlock from './PriceBlock'

const meta = {
	title: '/Atoms/PriceBlock',
	component: PriceBlock,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof PriceBlock>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		price: '4900',
	},
	render: (args) => <PriceBlock price={args.price} currency='EUR' />,
}
