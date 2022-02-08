import { test, expect } from '@playwright/test';

const openContactButton = `xpath=//span[@class="lc-phone__button-text"]`;
const contactModal = `xpath=//*[@class="turbo-modal__content turbo-modal__content_small"]`;
const telephoneNumber = `xpath=//a[@class="Link link lc-link"]`;
const closeButton = `xpath=//div[@class="turbo-modal__icon"]`;

test.describe("Сьют 1", () => {
    test.beforeEach(async ({ page, baseURL }) => {
        await page.goto(baseURL);
        await page.click(openContactButton);
    });

    test('Нажимаем кнопку Показать телефон -> Открылась модальное окно с контактной информацией', async ({ page}) => {
        expect(await page.isVisible(contactModal)).toBe(true);
    });
    
    test('Открываем модалку -> Отобразился корректный телефон', async ({ page }) => {
        expect(await page.textContent(telephoneNumber)).toBe("+7 123 456-78-90");
    });

    test('Открываем модалку -> В ссылке введен корректный номер', async ({ page }) => {
        expect(await page.getAttribute(telephoneNumber, "href")).toBe("tel:+71234567890");
    });

    test('Открываем модалку -> Проверка работы кнопки', async ({ page }) => {
        await page.click(closeButton)
        expect(await page.waitForSelector(contactModal, { state: 'hidden' })).toBe(null);
        await page.pause();
    });
});