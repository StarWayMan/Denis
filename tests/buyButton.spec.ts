import { test, expect, Locator } from '@playwright/test';

test.describe("Нажатие на кнопку Купить", () => {
    test.beforeEach(async ({ page, baseURL }) => {
        await page.goto(baseURL);
        await page.click(`button >> text=Купить`, {strict: false});
        
    });

    test('Добавление в корзину первого тавара 1шт', async({ page }) => {
        expect(await page.waitForSelector(`button >> text="В корзине: 1"`, {state: 'visible'})).toBeTruthy();
    });

    test('Добавление в корзину первого тавара 2шт', async({ page }) => {
        await page.click(`button >> text=В корзине: 1`, {strict: false});
        expect(await page.waitForSelector(`button >> text="В корзине: 2"`, {state: 'visible'})).toBeTruthy();
    });

});