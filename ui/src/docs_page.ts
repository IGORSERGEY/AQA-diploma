import { Page } from '@playwright/test';
import { BasePage } from './base_page';

export class DocsPage extends BasePage {
    constructor(protected readonly page: Page) {
        super(page);
        this.url = 'https://playwright.dev/docs/intro';
    }
    public async getLeftMenuItemByText(itemText: string) {
        return this.page.locator('a.menu__link').getByText(itemText, { exact: true }).nth(0);
    }
    public async isRightMenuItemVisible(itemText: string) {
        return await this.page
            .locator(`//a[contains(@class, 'table-of-contents__link') and text()="${itemText}"]`)
            .isVisible();
    }
}
