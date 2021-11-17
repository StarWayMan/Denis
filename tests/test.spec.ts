import { test } from '@playwright/test';

test('Testing shit', async ({ page, context, baseURL }) => {
    await page.goto(baseURL);
    await page.pause();
});