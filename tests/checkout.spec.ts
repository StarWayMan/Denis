import { test, expect, Locator } from '@playwright/test';

const checkoutButton = `xpath=//button[@class="lc-button lc-button_theme_base lc-button_size_m lc-button_type_button lc-header__cart-button"]`

test.describe("Проверка Корзины", () => {
    test.beforeEach(async ({ page, baseURL }) => {
        await page.goto(baseURL);
        
    });

    test.only('Пустая корзина', async ({ page }) => {
        await page.click(checkoutButton); 
        expect(await page.waitForSelector(`text="Корзина пуста"`, {state: 'visible'})).toBeTruthy();
    });

});