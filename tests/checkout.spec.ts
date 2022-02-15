import { test, expect, Locator } from '@playwright/test';

const checkoutButton = `xpath=//button[@class="lc-button lc-button_theme_base lc-button_size_m lc-button_type_button lc-header__cart-button"]`;
const checkoutModalImage =`xpath=//div[@class="lc-header__cart-popup lc-header__cart-popup_is-expanded"]`;

test.describe("Проверка Корзины", () => {
    test.beforeEach(async ({ page, baseURL }) => {
        await page.goto(baseURL);
        
    });

    test('Пустая корзина', async ({ page }) => {
        await page.click(checkoutButton); 
        expect(await page.waitForSelector(`text="Корзина пуста"`, {state: 'visible'})).toBeTruthy();
    });

    test('Добавление одного товара в коризну', async ({ page }) => {
        await page.click(`button >> text=Купить`, {strict: false});
        await page.click(checkoutButton);
        const imageCheckOutOneProduct = page.locator(checkoutModalImage);
        expect(await imageCheckOutOneProduct.screenshot()).toMatchSnapshot('checkOutOneProduct.png');
    });

    test('Добавление двух товаров в корзину', async ({ page }) => {
        await page.click(`button >> text=Купить`, {strict: false});
        await page.click(`button >> text=В корзине: 1`, {strict: false});
        await page.click(checkoutButton);
        const imageCheckOutTwoProduct = page.locator(checkoutModalImage);
        expect(await imageCheckOutTwoProduct.screenshot()).toMatchSnapshot('checkOutTwoProduct.png');
    });

    test.only('Добавление всех присудствующих товаров на странице', async ({ page }) => {
        const buttonsChechout=await page.$$('.lc-add-to-cart');
        await Promise.all(buttonsChechout.map((button) => button.click()));
        await page.click(checkoutButton);
        const imageCheckOutThreeProduct = page.locator(checkoutModalImage);
        expect(await imageCheckOutThreeProduct.screenshot()).toMatchSnapshot('checkOutThreeProduct.png');
    });
    
});