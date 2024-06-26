import type { StorybookConfig } from '@storybook/nextjs';

import * as path from 'path';

const config: StorybookConfig = {
	stories: ['../app/**/*.mdx', '../app/**/*.stories.@(js|jsx|mjs|ts|tsx)'],

	addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-onboarding', '@storybook/addon-interactions'],
	framework: {
		name: '@storybook/nextjs',

		options: {
			nextConfigPath: path.resolve(__dirname, '../next.config.js'),
		},
	},
	docs: {
		autodocs: 'tag',
	},
};
export default config;
