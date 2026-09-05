import {test, expect} from '@fixtures/page-fixtures';
import {AppDatabase} from '@utils/db-client';

test.describe('CHECKOUT FLOW', () => {

    let db: AppDatabase;

    test.beforeAll(async() => {
        db = new AppDatabase();
        await db.init();
    })

    test('E2E-TC01: Complete purchase flow with DB verification @smoke', async({
        loginPage, inventoryPage, cartPage, checkoutPage}) => {
            const productName = 'Sauce Labs Backpack';
            let dbProduct: any;

        await test.step(`Step01: DB Verification`, () => {
            dbProduct = db.getProductByName(productName);
            expect(dbProduct).toBeDefined();
        })

        await test.step(`Step02: Login`, async() => {
            await loginPage.navigate();
            await loginPage.login(process.env.STANDARD_USER!, process.env.USER_PASSWORD!)
        })

        await test.step(`Step03: UI compare DB`, async () => {
            const priceProduct = await inventoryPage.getProductPrice('Sauce Labs Backpack');
            expect(priceProduct).toBe(dbProduct!.price);

            await inventoryPage.addToCart('Sauce Labs Backpack');
            await inventoryPage.goToCart();
        })

        await test.step('Step04: Checkout FLow', async() => {
            await cartPage.proceedToCheckout();
            await checkoutPage.fillInformation('John', 'Doe', '70000');
            await checkoutPage.finishOrder();
        })

        await test.step('Step05: UI Assertion', async() => {
            await expect(checkoutPage.orderSuccessMessage).toBeVisible();
            await expect(checkoutPage.orderSuccessMessage).toHaveText('Thank you for your order!');
        })
    })

    test.afterAll(() => {
        db.close();
    })
})