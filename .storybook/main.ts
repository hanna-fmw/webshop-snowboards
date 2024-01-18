import type { StorybookConfig } from '@storybook/nextjs'

import * as path from 'path'

const config: StorybookConfig = {
	// stories: ['../stories/**/*.mdx', '../**/*.stories.@(js|jsx|mjs|ts|tsx)'],
	stories: ['../app/**/*.mdx', '../app/**/*.stories.@(js|jsx|mjs|ts|tsx)'],

	addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-onboarding', '@storybook/addon-interactions'],
	framework: {
		name: '@storybook/nextjs',

		options: {
			// image: {
			// 	loading: 'eager',
			// },
			nextConfigPath: path.resolve(__dirname, '../next.config.js'),
		},
	},
	docs: {
		autodocs: 'tag',
	},
}
export default config
