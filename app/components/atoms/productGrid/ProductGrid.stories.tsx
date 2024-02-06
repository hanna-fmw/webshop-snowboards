import type { Meta, StoryObj } from '@storybook/react'
import Image from 'next/image'
import bubo from '../../../../public/products/bubo/BUBO.png'
import styles from './productGrid.module.css'

import ProductGrid from './ProductGrid'

const meta = {
	title: '/Atoms/ProductGrid',
	component: ProductGrid,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof ProductGrid>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
	render: () => (
		<main style={{ backgroundColor: 'black' }}>
			<ProductGrid>
				<div style={{ border: '1px solid white', width: 'fit-content', height: 'auto', padding: '3rem', margin: '1rem' }}>Item</div>
				<div style={{ border: '1px solid white', width: 'fit-content', height: 'auto', padding: '3rem', margin: '1rem' }}>Item</div>
				<div style={{ border: '1px solid white', width: 'fit-content', height: 'auto', padding: '3rem', margin: '1rem' }}>Item</div>
				<div style={{ border: '1px solid white', width: 'fit-content', height: 'auto', padding: '3rem', margin: '1rem' }}>Item</div>
			</ProductGrid>
		</main>
	),
}

export const SampleContent: Story = {
	render: () => (
		<ProductGrid>
			<div>
				<Image src={bubo} width={350} height={450} alt='placeholder' style={{ width: '150px', height: 'auto', margin: '1rem' }} />
			</div>
			<div>
				<Image src={bubo} width={350} height={450} alt='placeholder' style={{ width: '150px', height: 'auto', margin: '1rem' }} />
			</div>
			<div>
				<Image src={bubo} width={350} height={450} alt='placeholder' style={{ width: '150px', height: 'auto', margin: '1rem' }} />
			</div>
			<div>
				<Image src={bubo} width={350} height={450} alt='placeholder' style={{ width: '150px', height: 'auto', margin: '1rem' }} />
			</div>
		</ProductGrid>
	),
}
