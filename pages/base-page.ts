import { Page, Locator } from '@playwright/test';

export abstract class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateTo(path: string = ''): Promise<void> {
        await this.page.goto(path);
    }

    async waitForPageLoaded(): Promise<void> {
        await this.page.waitForLoadState('domcontentloaded');
    }

    async getElementText(locator: Locator): Promise<string> {
        return (await locator.innerText()).trim();
    }
}