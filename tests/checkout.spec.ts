import { test, expect, Locator } from '@playwright/test';

test.describe("Проверка Корзины", () => {
    test.beforeEach(async ({ page, baseURL }) => {
        await page.goto(baseURL);
       // await page.locator(checkoutButton).first().click();
        
    });

    test.only('Добавление в корзину первого тавара 1шт', async({ page }) => {
        await page.click(`button >> text=Купить`, {strict: false});
        expect(await page.waitForSelector(`button >> text="В корзине: 1"`, {state: 'visible'})).toBeTruthy();
    });

});