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
		itemName: 'PLUV',
		itemDetail: 'DIRECTIONAL FREESTYLE',
		itemLength: '145 CM/149 cm/155 CM/159 CM/164 CM',
	},
	render: (args) => <TextBlock itemName={args.itemName} itemDetail={args.itemDetail} itemLength={args.itemLength} />,
}
