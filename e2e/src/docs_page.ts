import { Page } from '@playwright/test';
import { BasePage } from './base_page';

export class DocsPage extends BasePage {
    constructor(protected readonly page: Page) {
        super(page);
        this.Url = 'https://playwright.dev/docs/intro';
    }
    public async getLeftMenuItemByText(itemText: string) {
        return this.page.locator('a.menu__link').getByText(itemText, { exact: true }).nth(0);
    }
    public async getRightMenuItemByText(itemText: string) {
        return this.page.locator('a.table-of-contents__link').getByText(itemText, { exact: true });
    }
}
