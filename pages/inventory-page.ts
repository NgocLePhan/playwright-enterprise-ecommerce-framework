import { Locator, Page } from "@playwright/test";
import { BasePage } from "@pages/base-page";

export class InventoryPage extends BasePage {
    readonly title: Locator;
    readonly cartIcon: Locator;
    readonly inventoryItem: Locator;

    constructor(page: Page) {
        super(page);
        this.title = page.locator('.title');
        this.cartIcon = page.locator('.shopping_cart_link');
        this.inventoryItem = page.locator('.inventory_item');
    }

    async getProductPrice(productName: string): Promise<number> {
        const item = this.page.locator('.inventory_item', { hasText: productName });
        const priceText = await item.locator('.inventory_item_price').innerText();
        const price = parseFloat(priceText.replace('$', '').trim());
        return price;
    }

    async addToCart(productName: string): Promise<void> {
        const item = this.page.locator('.inventory_item', { hasText: productName });
        await item.locator('button:has-text("Add to cart")').click();
    }

    async goToCart(): Promise<void> {
        await this.cartIcon.click();
    }
}