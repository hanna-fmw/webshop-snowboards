import type { Meta, StoryObj } from '@storybook/react'
import PriceBlock from '../../atoms/priceBlock/PriceBlock'

import TextBlock from './TextBlock'

const meta = {
	title: '/Atoms/TextBlock',
	component: TextBlock,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof TextBlock>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		itemName: 'WORK SHOP X TUR BUBO 154.4',
		itemLength: '154.4 CM',
		itemDetailLine1: 'EXPERIMENTAL BIG VOLUME',
		itemDetailLine2: 'FLAT BUOYANCY PROFILE',
	},
	render: (args) => (
		<TextBlock itemName={args.itemName} itemDetailLine1={args.itemDetailLine1} itemLength={args.itemLength} itemDetailLine2={args.itemDetailLine2} />
	),
}
