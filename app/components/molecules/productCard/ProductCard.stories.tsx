import type { Meta, StoryObj } from '@storybook/react';

import ProductCard from './ProductCard';
import TextBlock from '../../atoms/textBlock/TextBlock';
import Image from 'next/image';
import bubo from '../../../../public/products/bubo/BUBO.png';

const meta = {
	title: '/Molecules/ProductCard',
	component: ProductCard,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof ProductCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
	render: (args) => (
		<div style={{ width: '350px', height: '450px', border: '2px black solid' }}>
			<ProductCard />
		</div>
	),
};

export const SampleContent: Story = {
	args: {},
	render: (args) => (
		<ProductCard>
			<Image src={bubo} width={350} height={450} alt='placeholder' />
			<div style={{ display: 'flex' }}>
				<TextBlock name='TUR BUBO' detail='EXPERIMENTAL BIG VOLUME' length='150.4/154.4 CM' profile='FLAT BUOYANCY PROFILE' />
				<div style={{ color: '#00b140' }}>SEK&nbsp;6999,00</div>
			</div>
		</ProductCard>
	),
};
