import { test, expect } from '@playwright/test';

const privacyPolicyLink = `xpath=//span[@class="lc-agreement-full__modal-handler"]`;
const privacyPolicyModal = `xpath=//div[@class="turbo-modal__inner grid"]`;
const privacyPolicyModalClose = `xpath=//button[@class="turbo-modal__close turbo-modal__close_type_lc"]`;
const privacyPolicyModalTitle = `xpath=//div[@class='lc-agreement-modal__title']`;
const privacyPolicyModalAccept = `xpath=//div[@class="lc-button__under"]`;
const privacyPolicyModalParanja = `xpath=//div[@class="turbo-modal__paranja"]`;

test.describe("Политика конфиденциальности", () => {
    test.beforeEach( async ({ page, baseURL }) => {
       await  page.goto(baseURL);
    });

    test('Открытие модалки Согласия на обработку ПД', async ({ page }) => {
        await page.click(privacyPolicyLink); //Функция клик используется для ссылки?
        expect(await page.isVisible(privacyPolicyModal)).toBe(true);
    });

    test('Закрытие модалки ПД Крестик', async ({ page }) => {
       await page.click(privacyPolicyLink);
       await page.click(privacyPolicyModalClose);    
       const modal = await page.waitForSelector(privacyPolicyModal, {state: 'hidden'});
       expect(modal).toBe(null);
    });

    test('Наличие заголовка в модалке', async({ page }) => {
        await page.click(privacyPolicyLink);
        const titleText = await page.locator(privacyPolicyModalTitle).textContent();
        expect(titleText).toBe('Соглашение');
    });

    test('Закрытие модалки ПД Понятно', async({ page }) => {
        await page.click(privacyPolicyLink);
        await page.click(privacyPolicyModalAccept);
        const modal = await page.waitForSelector(privacyPolicyModal, {state: 'hidden'});
        expect(modal).toBe(null);
    });

    test('Закрытие модалки ПД по клику за границей', async({ page }) => {
        await page.click(privacyPolicyLink);
        await page.click(privacyPolicyModalParanja, { position: { x: 0, y: 0 }, force: true });
        expect(await page.waitForSelector(privacyPolicyModal, {state: 'hidden'})).toBe(null);
    });
});


