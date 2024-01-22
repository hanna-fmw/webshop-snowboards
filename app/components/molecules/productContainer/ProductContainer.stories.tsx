import type { Meta, StoryObj } from '@storybook/react'

import ProductContainer from './ProductContainer'
import TextBlock from '../../atoms/textBlock/TextBlock'
import Image from 'next/image'
import pluv from "../../../../public/products/PLUV.png"

const meta = {
	title: '/Molecules/ProductContainer',
	component: ProductContainer,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof ProductContainer>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {},
	render: (args) => (
		<div style={{ width: '350px', height: '450px', border: '2px black solid' }}>
			<ProductContainer />
		</div>
	),
}

export const SampleContent: Story = {
	args: {},
	render: (args) => (
		<ProductContainer>
			<Image src={pluv} width={350} height={450} alt='placeholder' />
			<TextBlock itemName='PLUV' itemDetail='DIRECTIONAL FREESTYLE' itemLength='145 CM/149 cm/155 CM/159 CM/164 CM' />
		</ProductContainer>
	),
}
