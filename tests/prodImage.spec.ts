import { test, expect } from '@playwright/test';

const modalImage = `xpath=//div[@class="lc-good-modal__wrapper"]`;
const openImage = `xpath=//div[@class="lc-good__photo"]`;

test.describe("Открытие изображения", () => {
    test.beforeEach(async ({ page, baseURL }) => {
        await page.goto(baseURL);
        await page.locator(openImage).first().click();
    });

    test('Открываем модалку с изображением первого товара', async ({ page }) => {
        expect(await page.isVisible(modalImage)).toBe(true);
    });

    test('Проверка изображения первого товара', async ({ page }) => {
        const imageOne = page.locator(modalImage)
        expect(await imageOne.screenshot()).toMatchSnapshot('firstProduct.png')
    });

});