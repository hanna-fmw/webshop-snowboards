import type { Meta, StoryObj } from '@storybook/react'


// import Text from './text'
import Text from './text'

const meta = {
	title: '/Text',
	component: Text,
	parameters: {
		//Centrerar på canvas i Storybook.
		layout: 'centered',
	},
	// Docs genereras automatiskt i Storybook.
	tags: ['autodocs'],

	//Detta visas som t.ex. color picker och textfält som du kan ändra på Controls-fliken i Storybook.
	//Behövs inte alltid eftersom Storybook ofta infers vad som är vad.
	argTypes: {
		buttonBackground: { control: 'color' },
		label: { control: 'text' },
		borderRadius: { control: 'number' },
	},
} satisfies Meta<typeof Text>

export default meta
type Story = StoryObj<typeof meta>

export const Base: Story = {
	args: {
		buttonBackground: 'gray',
		label: 'Knapp',
	},
}

//Om du vill lägga till options för en viss story, t.ex. för Base så kan du använda
//argTypes (du kan använda här eller i meta-avsnittet överst om du vill tillämpa på alla stories)
Base.argTypes = {
	buttonBackground: {
		control: 'inline-radio',
		options: ['gray', 'orange', 'black'],
	},
}

export const Warning: Story = {
	args: {
		buttonBackground: 'red',
		label: 'Warning',
		borderRadius: '50%',
	},
}

export const Success: Story = {
	args: {
		buttonBackground: '#00FF00',
		label: 'Success',
	},
}
