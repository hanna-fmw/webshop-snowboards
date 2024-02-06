import type { Meta, StoryObj } from '@storybook/react'
import styles from './navbar.module.css'
import Image from 'next/image'
import { useModal } from '@/app/context/ModalContext'

import Navbar from './Navbar'

const meta = {
	title: '/molecules/Navbar',
	component: Navbar,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof Navbar>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
	render: (args) => <Navbar />,
}
