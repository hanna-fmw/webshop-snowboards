import type { Meta, StoryObj } from '@storybook/react'

import ProductCard from './ProductCard'
import TextBlock from '../../atoms/textBlock/TextBlock'
import Image from 'next/image'
import pluv from '../../../../public/products/PLUV.png'

const meta = {
	title: '/Molecules/ProductCard',
	component: ProductCard,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof ProductCard>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {},
	render: (args) => (
		<div style={{ width: '350px', height: '450px', border: '2px black solid' }}>
			<ProductCard />
		</div>
	),
}

export const SampleContent: Story = {
	args: {},
	render: (args) => (
		<ProductCard>
			<Image src={pluv} width={350} height={450} alt='placeholder' />
			<TextBlock model='PLUV' detail='DIRECTIONAL FREESTYLE' length='155 CM' />
		</ProductCard>
	),
}
