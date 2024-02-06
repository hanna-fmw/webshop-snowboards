import type { Meta, StoryObj } from '@storybook/react'
import Image from 'next/image'
import bubo from "../../../../public/products/bubo/BUBO.png"
import styles from './modal.module.css'

import Modal from './Modal'

const meta = {
	title: '/Atoms/Modal',
	component: Modal,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof Modal>

export default meta

type Story = StoryObj<typeof meta>

export const DefaultDark: Story = {
	args: {
		link: '[a].LÄNK',
	},
}
