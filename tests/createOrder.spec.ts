import { test, expect } from '@playwright/test';

const checkoutButton = `xpath=//button[@class="lc-button lc-button_theme_base lc-button_size_m lc-button_type_button lc-header__cart-button"]`;
const goToOrderButton = `xpath=//button[@class="turbo-button turbo-button_theme_blue turbo-button_width_max turbo-button_size_m turbo-cart__confirm"]`;
const nameInput = `[name="fio"]`;
const phoneInput = `[placeholder="+7 (___) ___ -__-__"]`;
const mailInput = `[name="email"]`;
const createOrderButton = `text="Подтвердить заказ"`;
const successfulOrderMessage = `text="Успешное оформление заказа"`;
const createOrderModal = `text="Оформление заказа"`;
const emptyFieldValidation = `text="Обязательное для заполнения поле"`;
const clearButton = `css=[class="lc-input__clear lc-input__clear_size_m"]`;
const closeButton = `xpath=//button[@class="turbo-modal__close turbo-modal__close_type_lc"]`;
const deliveryTypeSelect = `[name="_deliveryType"]`;
const deliveryAddrInput = `[name="_deliveryAddr"]`;
const deliveryCommentInput = `[name="_deliveryComment"]`;

test.describe("Модальное окно Оформление заказа", () => {
    test.beforeEach(async ({ page, baseURL }) => {
        await page.goto(baseURL);
        await page.click(`button >> text=Купить`, {strict: false});
        await page.click(checkoutButton);
        await page.click(goToOrderButton);
    });

    test('Отображение модального окна Оформление заказа', async ({ page}) => {
        expect(await page.waitForSelector(createOrderModal)).toBeTruthy();
    });

    test('Закрытие модального окна Оформление заказа', async ({ page}) => {
        await page.click(closeButton);
        expect(await page.waitForSelector(createOrderModal, {state: 'hidden'})).toBeFalsy();
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

    test('Заполняем поле Номер телефона невалид данными => Появилось ошибка валидации', async ({ page}) => {
        await page.fill(phoneInput, "0123456789");
        await page.click(createOrderButton);
        expect(await page.waitForSelector('text="Номер телефона указан неверно"')).toBeTruthy();
    });

    test('Заполняем поле Электронная почта невалид данными => Появилось ошибка валидации', async ({ page}) => {
        await page.fill(mailInput, "a@a.a");
        await page.click(createOrderButton);
        expect(await page.waitForSelector('text="Адрес электронной почты должен быть в формате author@example.com"')).toBeTruthy();
    });

    test('Заполняем поле Электронная почта => Стераем введенные данные => Подтверждаем заказ => Появилось ошибка валидации', async ({ page}) => {
        await page.fill(mailInput, "test@test.ru");
        await page.click(`${mailInput} >> .. >> ${clearButton}`);
        await page.click(createOrderButton);
        expect(await page.waitForSelector(`${mailInput} >> .. >> .. >> .. >> ${emptyFieldValidation}`)).toBeTruthy();
    });

    test.only('Заполняем обязательные поля => Выбираем вариант получения Доставка курьером в пределах МКАД => Заполняем появившиеся поля => Появилось сообщение об успехе', async ({ page}) => {
        await page.fill(nameInput, "Денис Тест");
        await page.fill(phoneInput, "+71117430001");
        await page.fill(mailInput, "test@test.ru");
        await page.click(deliveryTypeSelect);
        await page.hover(`text="Доставка курьером в пределах МКАД"`, {force:true});
        await page.mouse.down();
        await page.fill(deliveryAddrInput, "г. Санкт-Петербург ул. Тест кв.1 к.1 ");
        await page.fill(deliveryCommentInput, "Тестовый комментарий");
        await page.click(createOrderButton);
        expect(await page.waitForSelector(successfulOrderMessage)).toBeTruthy();
    });

});