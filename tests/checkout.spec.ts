import { test, expect, Locator } from '@playwright/test';
<<<<<<< HEAD
=======

>>>>>>> 63d9173 (Последнее сохранение Проверки корзины)
const checkoutButton = `xpath=//button[@class="lc-button lc-button_theme_base lc-button_size_m lc-button_type_button lc-header__cart-button"]`;
const checkoutModalImage =`xpath=//div[@class="lc-header__cart-popup lc-header__cart-popup_is-expanded"]`;
const checkoutBuyButton = `xpath=//button[@class="turbo-button turbo-button_theme_text-blue turbo-button_size_none turbo-cart-item__remove"]`;
const modalProductInfo = `xpath=//div[@class="turbo-cart-item__info"]`; 

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

    test('Добавление всех присудствующих товаров на странице', async ({ page }) => {
        const buttonsChechout=await page.$$('.lc-add-to-cart');
        await Promise.all(buttonsChechout.map((button) => button.click()));
        await page.click(checkoutButton);
        const imageCheckOutThreeProduct = page.locator(checkoutModalImage);
        expect(await imageCheckOutThreeProduct.screenshot()).toMatchSnapshot('checkOutThreeProduct.png');
    });
    
    test('Удаление товаров в корзине', async ({ page }) => {
        const buyButton = page.locator(`button >> text=Купить`);
        await buyButton.nth(0).click();
        await buyButton.nth(0).click();
        await buyButton.nth(0).click();
        await page.click(checkoutButton);
        const buyButtonClose = page.locator(checkoutBuyButton);
        await buyButtonClose.nth(0).click();
        await buyButtonClose.nth(0).click();
        await buyButtonClose.nth(0).click();
        expect(await page.waitForSelector(modalProductInfo, {state: 'hidden'})).toBeFalsy();
    });

    test.only('Добавление товаров внутри корзины', async ({ page }) => {
        await page.click(`button >> text=Купить`, {strict: false});
        await page.click(checkoutButton);
        const buttonCheckoutAdd = `xpath=//button[@class="turbo-button turbo-button_theme_none turbo-button_size_none turbo-amount-picker__btn turbo-amount-picker__btn_type_inc"]`;
        const addButton = page.locator(buttonCheckoutAdd);
        await addButton.nth(0).click();
        const numberOfProducts =`xpath=//input[@class="turbo-amount-input turbo-amount-picker__input"]`
        const productsNumberText = page.locator(numberOfProducts);
        expect(productsNumberText).toBe(value="2");
        //expect(await page.waitForSelector(numberOfProducts, {state: 'visible'})).toBeTruthy();
        await page.pause();
    });
});