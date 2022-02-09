import { test, expect, Locator } from '@playwright/test';

const buyButton =`xpath=//div[@class="lc-good__button-wrapper"]//span[@class="lc-button__text"]`;
let buyButtonLocator: Locator;

test.describe("Проверка Корзины", () => {
    test.beforeEach(async ({ page, baseURL }) => {
        await page.goto(baseURL);
        buyButtonLocator = page.locator(buyButton).first();
       // await page.locator(checkoutButton).first().click();
        
    });

    test.only('Добавление в корзину первого тавара 1шт', async ({ page }) => {
        await buyButtonLocator.click();
        expect(buyButtonLocator.textContent()).toBe('В корзине: 1');
    })
    
});