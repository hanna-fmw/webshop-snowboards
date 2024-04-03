import type { Meta, StoryObj } from '@storybook/react';
import Image from 'next/image';
import ProductImg from './ProductImg';

import bubo from '../../../../public/products/bubo/BUBO.png';

const meta = {
	title: '/Atoms/ProductImg',
	component: ProductImg,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof ProductImg>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<ProductImg>
			<Image src='https://via.placeholder.com/350x450' alt='placeholder' width={350} height={450} />
		</ProductImg>
	),
};

export const SampleImage: Story = {
	render: () => (
		<ProductImg>
			<Image src={bubo} width={350} height={450} alt='picture' />
		</ProductImg>
	),
};
