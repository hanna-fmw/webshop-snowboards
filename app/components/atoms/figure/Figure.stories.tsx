import type { Meta, StoryObj } from '@storybook/react'
import Image from 'next/image'
import Figure from './Figure'
import pluv from '../../../../public/products/PLUV.png'

const meta = {
	title: '/Atoms/Figure',
	component: Figure,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof Figure>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
	render: () => (
		<Figure>
			<Image src='https://via.placeholder.com/700x900' alt='placeholder' width={350} height={450} />
		</Figure>
	),
}

export const SampleImage: Story = {
	render: () => (
		<Figure>
			<Image src={pluv} width={350} height={450} alt='picture' />
		</Figure>
	),
}
