import { test, expect } from '@playwright/test';

const feedbackHeader = `text="Хотите, чтобы мы вам позвонили?"`;
const sendFeedbackButton = `xpath=//span[@style="color:#fff"]`;
const emptyPhoneHint = `xpath=//div[@class="lc-form__error-text"]`;
const phoneFeedbackTextBox = `xpath=//input[@autocomplete="tel"]`;
const nameFeedbackTextBox = `xpath=//input[@type="text"]`;
const feedbackModal = `xpath=//div[@class="lc-form-modal__container"]`;

test.describe('Обратная связь', () => {
    test.beforeEach(async ({ page, baseURL }) => {
        await page.goto(baseURL);
    });
    
    test('Проверка заголовка', async ({ page }) => {
        expect(await page.isVisible(feedbackHeader)).toBe(true);
    });

    test('Проверка обязательного заполнения текстовго поля Телефон', async ({ page }) => {
        await page.click(sendFeedbackButton);
        expect(await page.textContent(emptyPhoneHint)).toBe("Обязательное для заполнения поле");
    });

    test('Передача валидной контактной информации для Фитбека', async ({ page }) => { 
        await page.fill(phoneFeedbackTextBox, "+79787430664");
        await page.fill(nameFeedbackTextBox, "Денис Григоренко");
        await page.click(sendFeedbackButton);
        await page.waitForLoadState("networkidle"); //ожидания выполнения всех запросов в сети
        expect(await page.isVisible(feedbackModal)).toBe(true);
    });

    test('Передача не валидных данных для Фитбека', async ({ page }) => {
        await page.fill(phoneFeedbackTextBox, "+79787430664111");
        await page.click(sendFeedbackButton);
        expect(await page.textContent(emptyPhoneHint)).toBe("Номер телефона указан неверно");

    });
});
