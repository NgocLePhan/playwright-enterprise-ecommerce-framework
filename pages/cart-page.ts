import { Page, Locator } from '@playwright/test';
import { BasePage } from '@pages/base-page';

export class CartPage extends BasePage {
    readonly checkoutButton: Locator;
    readonly cartItems: Locator;

    constructor(page: Page) {
        super(page);
        this.checkoutButton = page.locator('[data-test="checkout"]');
        this.cartItems = page.locator('.cart_item');
    }

    async proceedToCheckout(): Promise<void> {
        await this.checkoutButton.click();
    }

    async getItemCount(): Promise<number> {
        return await this.cartItems.count();
    }
}