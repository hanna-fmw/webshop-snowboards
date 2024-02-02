import type { Meta, StoryObj } from '@storybook/react'

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
		model: 'WORK SHOP X TUR BUBO 154.4',
		length: '154.4 CM',
		detail: 'EXPERIMENTAL BIG VOLUME',
		profile: 'FLAT BUOYANCY PROFILE',
	},
	render: (args) => <TextBlock model={args.model} detail={args.detail} length={args.length} profile={args.profile} />,
}
