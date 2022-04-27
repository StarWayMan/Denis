import { test, expect } from '@playwright/test';

const checkoutButton = `xpath=//button[@class="lc-button lc-button_theme_base lc-button_size_m lc-button_type_button lc-header__cart-button"]`;
const goToOrderButton = `xpath=//button[@class="turbo-button turbo-button_theme_blue turbo-button_width_max turbo-button_size_m turbo-cart__confirm"]`;
const nameInput = `[placeholder="Иван Петров"]`;
const phoneInput = `[placeholder="+7 (___) ___ -__-__"]`;
const mailInput = `[placeholder="email@example.com"]`;
const createOrderButton = `text="Подтвердить заказ"`;
const successfulOrderMessage = 'text="Успешное оформление заказа"';
const createOrderModal = 'text="Оформление заказа"';
const emptyFieldValidation = 'text="Обязательное для заполнения поле"';


test.describe("Сьют 1", () => {
    test.beforeEach(async ({ page, baseURL }) => {
        await page.goto(baseURL);
        await page.click(`button >> text=Купить`, {strict: false});
        await page.click(checkoutButton);
        await page.click(goToOrderButton);
    });

    test('Отображение модального окна Оформление заказа', async ({ page}) => {
        expect(await page.waitForSelector(createOrderModal)).toBeTruthy();
    });
    
    test('Заполняем обязательные поля => Заказ оформлен => Появилось сообщение об успехе', async ({ page}) => {
        await page.fill(nameInput, "Денис Тест");
        await page.fill(phoneInput, "+71117430001");
        await page.fill(mailInput, "test@test.ru");
        await page.click(createOrderButton);
        expect(await page.waitForSelector(successfulOrderMessage)).toBeTruthy(); // ждет ожидемое состояние в течении 30 секунд
       //expect(await page.locator(successfulOrderMessage).isVisible()).toBeTruthy(); - проверяет состояние в данный момент времени
    });

    test('Заполняем обязательные поля => Заказ оформлен => Закрытие модалки Оформление заказа', async ({ page}) => {
        await page.fill(nameInput, "Денис Тест");
        await page.fill(phoneInput, "+71117430001");
        await page.fill(mailInput, "test@test.ru");
        await page.click(createOrderButton);
        expect(await page.waitForSelector(createOrderModal, {state: 'hidden'})).toBe(null);
    });

    test('Оставляем пустыми текстовые поля => Отображаются уведомления валидации', async ({ page}) => {
        await page.click(createOrderButton);
        const validationCount = await page.locator(emptyFieldValidation).count();
        expect(validationCount).toBe(3);
    });

    test.only('Заполняем поля Номер телефона невалид данными => Появилось ошибка валидации', async ({ page}) => {
        await page.fill(phoneInput, "0123456789");
        await page.click(createOrderButton);
        expect(await page.waitForSelector('text="Номер телефона указан неверно"')).toBeTruthy();
    });

});