import { test, expect, Locator } from '@playwright/test';

const checkoutButton = `xpath=//button[@class="lc-button lc-button_theme_base lc-button_size_m lc-button_type_button lc-header__cart-button"]`;
const checkoutModalImage =`xpath=//div[@class="lc-header__cart-popup lc-header__cart-popup_is-expanded"]`;
const checkoutBuyButton = `xpath=//button[@class="turbo-button turbo-button_theme_text-blue turbo-button_size_none turbo-cart-item__remove"]`;
const modalProductInfo = `xpath=//div[@class="turbo-cart-item__info"]`; 
const checkoutModalEmptyMessageSelector = `xpath=//span[@class="turbo-cart__empty-text"]`;
const numberOfProducts =`xpath=//input[@class="turbo-amount-input turbo-amount-picker__input"]`;
const buttonCheckoutDelite = `xpath=//button[@class="turbo-button turbo-button_theme_none turbo-button_size_none turbo-amount-picker__btn turbo-amount-picker__btn_type_dec"]`;
const buttonCheckoutAdd = `xpath=//button[@class="turbo-button turbo-button_theme_none turbo-button_size_none turbo-amount-picker__btn turbo-amount-picker__btn_type_inc"]`;
const checkoutProductsPriceSelector =`xpath=//span[@class="turbo-cost turbo-cost_type_new turbo-cart-item__cost"]`;
const buttonPlaceOrderSelector =`xpath=//button[@class="turbo-button turbo-button_theme_blue turbo-button_width_max turbo-button_size_m turbo-cart__confirm"]`;

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

    test('Добавление товаров внутри корзины', async ({ page }) => {
        await page.click(`button >> text=Купить`, {strict: false});
        await page.click(checkoutButton);
        const addButton = page.locator(buttonCheckoutAdd);
        await addButton.nth(0).click();
        const productsNumberText = page.locator(numberOfProducts);
        //const productCount = await page.getAttribute(numberOfProducts, 'value'); - получение аттрибута по селектору
        const productCount = await productsNumberText.getAttribute('value');
        expect(productCount).toBe('2');
    });

    test('Удаление всех товаров внути корзины', async ({ page }) => {
        const buyButton = page.locator(`button >> text=Купить`);
        await buyButton.nth(1).click();
        await page.click(checkoutButton);
        const addDelite = page.locator(buttonCheckoutDelite);
        await addDelite.nth(0).click();
        const checkoutModalEmptyMessage = page.locator(checkoutModalEmptyMessageSelector);
        expect (await checkoutModalEmptyMessage.textContent()).toBe('Корзина пуста ');
    });

    test('Удаление товара внути корзины остается 1 товар', async ({ page }) => {
        const buyButton = page.locator(`button >> text=Купить`);
        await buyButton.nth(2).dblclick();
        await page.click(checkoutButton);
        const addDelite = page.locator(buttonCheckoutDelite);
        await addDelite.nth(0).click();
        const productsNumberText = page.locator(numberOfProducts);
        const productCount = await productsNumberText.getAttribute('value');
        expect(productCount).toBe('1');
        await page.pause();
    });   

    test('Проверка отображаемой стоймости первого товара', async ({ page }) => {
        const buyButton = page.locator(`button >> text=Купить`);
        await buyButton.nth(0).dblclick();
        await page.click(checkoutButton);
        const checkoutProductsPrice = page.locator(checkoutProductsPriceSelector);
        await expect (checkoutProductsPrice).toHaveText(`3198\u00A0₽`);
    }); 
    
    test('Проверка отображаемой стоймости первого товара, кнопка Оформить заказ', async ({ page }) => {
        const buyButton = page.locator(`button >> text=Купить`);
        await buyButton.nth(0).dblclick();
        await page.click(checkoutButton);
        const buttonPlaceOrder = page.locator(buttonPlaceOrderSelector);
        await expect (buttonPlaceOrder).toHaveText(`Оформить заказ: 3198\u00A0₽`);
    }); 

    test('Проверка отображаемой стоймости двух товаров, кнопка Оформить заказ', async ({ page }) => {
        const buyButton = page.locator(`button >> text=Купить`);
        await buyButton.nth(0).click();
        await buyButton.nth(0).click();
        await page.click(checkoutButton);
        const buttonPlaceOrder = page.locator(buttonPlaceOrderSelector);
        await expect (buttonPlaceOrder).toContainText(`6098\u00A0₽`);
    }); 

});
