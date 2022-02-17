import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
	use: {
		baseURL: 'https://mokasi.turbo.site/',
		headless: false,
		viewport: { width: 1280, height: 720 },
		ignoreHTTPSErrors: true,
		video: 'on-first-retry',
		screenshot: 'only-on-failure',
		trace: 'on-first-retry',
	},
	projects: [
		{
			name: 'Chromium',
			use: { browserName: 'chromium' },
		},
	],
	expect: {
		toMatchSnapshot: { threshold: 0.9 },
	},
	testDir: './tests',
	reporter: [['line'], ['allure-playwright']],
	retries: 0,
};

export default config;
