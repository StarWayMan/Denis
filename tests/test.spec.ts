import { test, expect } from '@playwright/test';

const openContactButton = `xpath=//span[@class="lc-phone__button-text"]`;
const contactModal = `xpath=//*[@class="turbo-modal__content turbo-modal__content_small"]`;
const telephoneNumber = `xpath=//a[@class="Link link lc-link"]`;

test.describe("Сьют 1", () => {
    test.beforeEach(async ({ page, baseURL }) => {
        await page.goto(baseURL);
        await page.click(openContactButton);
    });

    test('Нажимаем кнопку Показать телефон -> Открылась модальное окно с контактной информацией', async ({ page, context, baseURL }) => {
        expect(await page.isVisible(contactModal)).toBe(true);
    });
    
    test('Открываем модалку -> Отобразился корректный телефон', async ({ page, context, baseURL }) => {
        expect(await page.textContent(telephoneNumber)).toBe("+7 123 456-78-90");
    });

    test.only('Открываем модалку -> В ссылке введен корректный номер', async ({ page, context, baseURL }) => {
        expect(await page.getAttribute(telephoneNumber, "href")).toBe("tel:+71234567890");
    });
});